import React from 'react'
import {create} from "zustand";

interface User{
    name: string;
    email: string;
    role: string;
    image: string;
}

interface AuthStructure{
    user: User | null;
    loginUser: (user: any) => void;
    resetUser: ()=>void;
}

export const AuthStore = create<AuthStructure>((set)=>({
    user: null,
    loginUser: (user)=>{set({user: user})},
    resetUser: ()=>{set({user: null})}
}));