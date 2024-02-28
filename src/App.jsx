import { useEffect, useState } from 'react'
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { Home, Login, AccountPage, ChangePassword, CfOpenPage} from './pages'
import { AuthProvider } from './context/AuthContext'
import {  Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'

export const App = () => {

    const [user, setUser] = useState("")

    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser){
                console.log("no hay usuario");
                setUser("")
            } else {
                setUser(currentUser)
            }
        })
        return () => suscribed()
    }, [])
    
    const { displayName, email, photoURL } = user
    
    return (
        <>
            <AuthProvider>
                    {   user ? 
                        <>
                            <NavBar user={user}/>
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/account' element={<AccountPage name={displayName} email={email} photoURL={photoURL}/>}/>
                                <Route path='/change-password' element={<ChangePassword/>}/>
                                <Route path='/crossfit-open' element={<CfOpenPage/>}/>
                            </Routes>
                        </> 
                        : 
                            <Login/>
                    }
            </AuthProvider>
        </>
    )
}
