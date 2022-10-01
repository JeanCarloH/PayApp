export interface usuario {
   email: string;
   password: string;  
}  
export interface TodosContextState{
    login:(email:string,password:string)=>Promise<UserCredential>;
    user:{}|Null;
    logout:() => Promise<void>;
}
export interface props{
    children:React.ReactNode;
}
export interface UserRegistered{
    nombre:string;
    apellido:string;
    celular:number;
    direccion:string;
    monto:number;   
    tipo:string;    
    abono:number;
    propietario:string;
    fecha:string;
    totalabonos:number;
}
export type ActionType=
|{ type:'CONSULTAR_PRODUCTO', payload}
|{ type:'SIN_DATOS'}
|{ type:'CREAR_PRODUCTO' , payload}

export interface Props2{
    state:any
    dispatch:Dispatch<ActionType>;
}
export interface Props3{
    edit:any
}
export interface Props4{
    busqueda:any;
    filtro:any;
}
export interface NoteAdded{
 titulo:string;
 recordatorio:string;
 fecha:string;
 propietario:string;
}

export interface Props5{
    edit:any
}
export interface UserEstatistics{
    tipo:any;
    tipoMes:any;
}
export interface Props6{
tipo:any;
tipoMes:any;
}
export interface Props7{
    tipo:any;
    tipoMes:any;
    }
    export interface UserRegistered2{

        monto:number;     

    }
export interface xd{
    title:string;
    body:string;
}
