import React from 'react'
import UserReadyAppBar from './UserReadyAppBar'
import UserReadyTable from './UserReadyTable'
import { useOutletContext } from 'react-router-dom'
const UserReady = () => {
  const { addPayment,dbpayments}:any = useOutletContext();
 
  return (
    <>
    <UserReadyAppBar/>
    <UserReadyTable />
    </>
  )
}

export default UserReady