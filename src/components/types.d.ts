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