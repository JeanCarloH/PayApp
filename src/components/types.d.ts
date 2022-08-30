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
    alias:string;
    direccion:string;
    monto:number;   
    tipo:string;    
    abono:number;
    propietario:string;
}
export interface Action{
    CREAR_PRODUCTO: string;
    
}