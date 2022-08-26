
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../firebase";

export const authContext:any=createContext() //crear provedor y devolver objetos

export const useAuth=()=>{ //hook personalizado para usar el contexto y devolver el objeto con el fin de ahorrar pasos
    const context=useContext(authContext)
    return context
}

export function AuthProvider({children}){
    const[user,setUser]=useState(null);
    
    const login =(email:any,password:any) => signInWithEmailAndPassword(auth,email,password)
    const logout = () => signOut(auth);
      
    useEffect(()=>{
        onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            
            console.log(user,"hola")
        })
    },[])


    return(
        <authContext.Provider value={{login,user,logout}}>
        {children}
        </authContext.Provider>

    )
}