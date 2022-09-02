
import { createContext, useContext, useEffect, useState,FC } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { TodosContextState } from "../components/types";
import { usuario } from "../components/types";
import { SetStateAction } from "react";
import {props} from "../components/types";
import { auth } from "../firebase";
import { UserCredential } from "firebase/auth";



export const authContext=createContext({}) //crear provedor y devolver objetos

export const useAuth=()=>{ //hook personalizado para usar el contexto y devolver el objeto con el fin de ahorrar pasos
    const context=useContext(authContext)
    return context
}
    
export function AuthProvider({children}:props){
    const[user,setUser]=useState<{}|null>(null);
    
    const login =(email:string,password:string) => signInWithEmailAndPassword(auth,email,password)
    const logout = () => signOut(auth);
      
    useEffect(()=>{
        onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
 
        })
    },[])


    return(
        <authContext.Provider value={{login,user,logout}}>
        {children}
        </authContext.Provider>

    )
}