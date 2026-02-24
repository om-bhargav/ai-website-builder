import React from 'react'
import {create} from "zustand";


interface AuthStructure{
    id: string | null;
    role: null | "USER" | "ADMIN";
    loginUser: (user: any) => void;
    resetUser: ()=>void;
}

export const AuthStore = create<AuthStructure>((set)=>({
    id: null,
    role: null,
    loginUser: (user)=>{set({id: user.id,role: user.role})},
    resetUser: ()=>{set({id: null,role: null})}
}));