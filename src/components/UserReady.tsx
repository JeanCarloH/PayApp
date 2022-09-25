import React, { useEffect } from 'react'
import UserReadyAppBar from './UserReadyAppBar'
import UserReadyTable from './UserReadyTable'
import { useOutletContext } from 'react-router-dom'
const UserReady = () => {
  const { addPayment,dbpayments,dbusersready,getDataUserReady,getDataNote}:any = useOutletContext();
  useEffect(() => {
    getDataUserReady();
    getDataNote();
  }, []);
  return (
    <>
    <UserReadyAppBar/>
    
    <UserReadyTable />
   
    </>
  )
}

export default UserReady