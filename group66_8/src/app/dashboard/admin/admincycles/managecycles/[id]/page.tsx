'use client'
import { useForm } from 'react-hook-form'
import { ncycle } from '@/types/globaltype'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect} from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function Page() {
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<ncycle>()
  const { data: session, status } = useSession()
  const { id } = useParams()
  const router = useRouter()
  const { toast} = useToast()


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin-admin')
    }
  }, [status, router])

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      const res = await fetch(
        `https://a2sv-application-platform-backend-team8.onrender.com/cycles/${id}`,
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (!res.ok) {
        toast({
          title: 'Error',
          description: 'Failed to fetch cycle data',
          variant: 'destructive'
        })
        return
      }

      const data = await res.json()
      const formatted = {
        ...data,
        start_date: data.start_date ? data.start_date.split('T')[0] : '',
        end_date: data.end_date ? data.end_date.split('T')[0] : '',
      }

      reset(formatted)
    }

    fetchData()
  }, [id, reset, toast])

  const onSubmit = async (formData: ncycle) => {
    const res = await fetch(
      `https://a2sv-application-platform-backend-team8.onrender.com/admin/cycles/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(formData)
      }
    )

    if (!res.ok) {
      const err = await res.json()
      toast({
        title: 'Error',
        description: err.message || 'Failed to update cycle',
        variant: 'destructive'
      })
      return
    }

    toast({
      title: 'Success',
      description: 'Cycle updated successfully!'
    })
    
    router.push('/dashboard/admin/admincycles')
  }

  
  const handleDelete = async() => {
    const confirmDelete = window.confirm(`Are you sure you want to close the cycle: ${getValues('name')}?`);
    if (!confirmDelete) return;

    const link = `https://a2sv-application-platform-backend-team8.onrender.com/admin/cycles/${id}`;

    const res = await fetch(link, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!res.ok) {
      toast({
        title: 'Failed to close cycle',
        description: `Could not close cycle: ${id}`,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Cycle closed successfully',
      description: `Cycle "${getValues('name')}" has been closed.`,
      variant: 'default',
    });
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-start px-4 py-8 sm:px-6 lg:px-8">
       
      <div className="max-w-xl w-full mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <Button
              type="button"
              onClick={handleDelete}
              variant="destructive"
              className="w-auto py-3 px-6 text-lg rounded-lg cursor-pointer"
            >
              Delete Cycle
            </Button>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">
          Manage Cycle
        </h2>
        <div>
          
        </div>
        <p className="text-center text-gray-600 mb-6">
          Update the cycle details below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Name</label>
            <Input
              type="text"
              placeholder="G6 November 2024"
              className="w-full"
              {...register("name", { required: "Cycle name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <Input
              type="date"
              className="w-full"
              {...register("start_date", { required: "Start date is required" })}
            />
            {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <Input
              type="date"
              className="w-full"
              {...register("end_date", {
                required: "End date is required",
                validate: (value) =>
                  value > getValues('start_date') || 'End date must be after start date'
              })}
            />
            {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>}
          </div>

          <div className='flex justify-end gap-4'>
            <Button
              type="submit"
              className="w-auto py-3 text-lg rounded-lg bg-[#4F46E5] cursor-pointer hover:bg-blue-950"
            >
              Save Changes
            </Button>

            <Button
              type="button"
              onClick={() => router.push('/dashboard/admin/admincycles')}
              className='w-auto py-3 px-10 text-lg rounded-lg text-black cursor-pointer bg-white border border-black hover:bg-gray-100'
            >
              Cancel
            </Button>

           
          </div>
        </form>
      </div>
    </div>
  )
}
