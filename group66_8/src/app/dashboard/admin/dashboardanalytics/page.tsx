import React from 'react'
import Analytics from '../_components/Analyics'
import { getServerSession } from 'next-auth'
function Analytic() {
  // const session = getServerSession()
  // console.log(session)
  return (
    <div>
      <Analytics />
    </div>
  )
}
export default Analytic
