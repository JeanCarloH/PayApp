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
import { db2 } from '../firebase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc,documentId,orderBy} from "firebase/firestore";
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



export default function Note() {
    const { dbnote,dispatch,getDataNote}:any = useOutletContext();
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState("");
    const deleteDataNote = async() => {

      await deleteDoc(doc(db2, 'Notes', id));
      setOpen(false);
    
        dispatch({type:'ELIMINAR_NOTA',payload:id});
      getDataNote();

    }
      const handleClickOpen = (id:any) => {
        setId(id);
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
   
  
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
      <Typography variant="body2">
        Hora: {product.fecha}
      </Typography>
    </CardContent>
    <CardActions>
    <Link to={`/Admin/EditUsernote/${product.id}`}>
      <EditIcon 
      sx={{m:1}}/>
      </Link>
      <DeleteIcon sx ={{m:1}}
      onClick={() => handleClickOpen(product.id)}
      />
     </CardActions>
    </Card>
       ))}
    </Box>
    
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Deseas eliminar este recordatorio?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={deleteDataNote}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}