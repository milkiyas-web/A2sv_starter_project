'use client';
import React from 'react';
<<<<<<< HEAD
import { Cycle } from '@/types/globaltype';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
=======
import { Button } from '@/components/ui/button';
import { Cycle } from '@/types/globaltype';
<<<<<<< HEAD
import { useSession } from 'next-auth/react';
import type { Session as NextAuthSession } from 'next-auth';
>>>>>>> 3a18876ebb120522238627638de432f1bc0c0314
=======
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/components/ui/use-toast'; 

>>>>>>> f080b14a6db7c566234d1258f024b8c25fe77543
interface Props {
  cycle: Cycle;
}

export function CycleCard({ cycle }: Props) {
<<<<<<< HEAD
<<<<<<< HEAD
  const router = useRouter()
  const session = useSession()
=======
  const session = useSession() as {
    data: NextAuthSession | null;
    status: 'authenticated' | 'loading' | 'unauthenticated';
  };
>>>>>>> 3a18876ebb120522238627638de432f1bc0c0314
=======
  // const router = useRouter();
  // const session = useSession();
  // const { toast } = useToast(); 

>>>>>>> f080b14a6db7c566234d1258f024b8c25fe77543
  const getRandomHexColor = () => {
    const r = Math.floor(Math.random() * 100);
    const g = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleClose = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    
    window.location.reload();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4 w-full max-w-md cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{cycle.name}</h3>
        <Button
          onClick={handleClose}
          aria-label={`Close cycle ${cycle.name}`}
          style={{ backgroundColor: getRandomHexColor() }}
        >
          Close
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="block text-sm font-medium text-gray-600">Country</span>
          <span className="block text-base font-semibold text-gray-800">Ethiopia</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-600">Status</span>
          <span
            className={`block text-base font-semibold ${cycle.is_active ? 'text-green-600' : 'text-gray-500'
              }`}
          >
            {cycle.is_active ? 'Active' : 'Closed'}
          </span>
        </div>
      </div>
    </div>
  );
}
