import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useOutletContext } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



export default function OutlinedCard() {
    const { dbnote,deleteDataNote,}:any = useOutletContext();
  return (
    <>
    <Box sx={{ minWidth: 275 }}>
    {dbnote.length > 0 && 
    dbnote.map((product:any)=>(
      <Card variant="elevation">
     <CardContent>
     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {product.titulo}
      </Typography>

      <Typography variant="body2">
        {product.recordatorio}
      </Typography>
    </CardContent>
    <CardActions>
    <Link to={`/Admin/EditUsernote/${product.id}`}>
      <EditIcon 
      sx={{m:1}}/>
      </Link>
      <DeleteIcon sx ={{m:1}}
      onClick={() => deleteDataNote(product.id)}
      />
     </CardActions>
    </Card>
       ))}
    </Box>
    </>
  );
}