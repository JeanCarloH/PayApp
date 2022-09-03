import React from 'react'
import UserReadyAppBar from './UserReadyAppBar'
import UserReadyTable from './UserReadyTable'
const UserReady = () => {
  const tipo="";
   const tipoMes="";
  return (
    <>
    <UserReadyAppBar/>
    <UserReadyTable tipo={tipo} tipoMes={tipoMes}/>
    </>
  )
}

export default UserReady