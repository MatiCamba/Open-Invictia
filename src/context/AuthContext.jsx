import { createContext} from "react";
import { auth } from "../firebase/config";
import { useContext } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    return context
}


export const AuthProvider = ({children}) => {

    const register = async(email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const user = response.user
            const docRef = doc(collection(db, "usuarios"), user.uid);
            await setDoc(docRef, {
                nombre: '',
                email: user.email, 
                edad: '',
                genero: '',
                categoria: '',
                '24 1': '',
                '24 2': '',
                '24 3': '',
            });
        } catch (error) {
            console.log(error)
        }
    }
    const login = async(email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password)
    }
    const loginWithGoogle = async() => {
        const responseGoogle = new GoogleAuthProvider()
        try{
            const response = await signInWithPopup(auth, responseGoogle)
            const user = response.user
            const docRef = doc(collection(db, "usuarios"), user.uid);
            const docSnap = await getDoc(docRef);

            // Si el documento no existe, establece los datos
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    nombre: user.displayName,
                    email: user.email, 
                    edad: '',
                    genero: '',
                    categoria: '',
                    '24 1': '',
                    '24 2': '',
                    '24 3': '',
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    const logout = async() => {
        const response = await signOut(auth)
    }
  return (
        <authContext.Provider 
            value={{
                register,
                login,
                loginWithGoogle,
                logout,
            }}>
            {children}
        </authContext.Provider>
    )
}

