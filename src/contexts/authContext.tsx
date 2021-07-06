import { createContext, ReactNode, useEffect, useState} from "react";
import { auth,firebase} from "../services/firebase";
/* //TIPAGENS DO TYPESCRYPT///// */
type User ={
  id: string,
  name: string,
  avatar: string,
}

type AuthContextType ={
  user: User | undefined;
  signInWithGoggle: () => Promise<void>;
}

type AuthContextProvider ={
  children: ReactNode;
}
/* USEEFFECT CONTROLE DO ESTADO DE AUTENTIFICAÇÃO DO APP */
export const AuthContext = createContext({} as AuthContextType );

export function AuthContextProvider(props: AuthContextProvider){
  const [user, setUser] = useState<User>();

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
      
        const { displayName, photoURL, uid } = user
        
        if (!displayName || !photoURL){
          throw new Error('Missing Information from Google Account.');
        }
  
        setUser({
          id: uid,
          name:displayName,
          avatar:photoURL
  
        })
        
      }
    }) 

    return () => {
      unsubscribe();
    }
  },[])
/* VERIFICAÇÃO DE AUTENTIFICAÇÃO DO APP  */

  async function signInWithGoggle(){ /* FUNCTION QUE FAZ A AUTENTICAÇÃO COM GOOGLE VIA POPUP */ 
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider);
    
    if (result.user){
      const { displayName, photoURL, uid } = result.user
      
      if (!displayName || !photoURL){
        throw new Error('Missing Information from Google Account.');
      }

      setUser({
        id: uid,
        name:displayName,
        avatar:photoURL

      })
    }
  }

  return (
    <AuthContext.Provider value = {{ user, signInWithGoggle }}>
      {props.children}
    </AuthContext.Provider>
  );
}