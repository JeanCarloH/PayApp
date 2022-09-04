import React from 'react'
import UserPaymentAppBar from './UserPaymentAppBar'
import { useState } from "react";

import { Link, useOutletContext } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserPaymentTable from './UserPaymentTable';


const UserPayment = () => {
  const { addPayment,dbpayments}:any = useOutletContext();
 

  return (
    <>


    <UserPaymentAppBar/>

    <UserPaymentTable />
    </>
  )
}

export default UserPayment