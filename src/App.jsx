import { useEffect, useState } from 'react'
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { Home, Login, AccountPage, ChangePassword, CfOpenPage} from './pages'
import { AuthProvider } from './context/AuthContext'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";
import {SimpleTable} from './components/SimpleTable.jsx';

export const App = () => {

    const [user, setUser] = useState(null)

    const [users, setUsers] = useState([]);

<<<<<<< HEAD
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const usersCollection = collection(db, 'usuarios');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => doc.data());
            setUsers(usersList);
          } catch (error) {
            console.error("Error fetching users: ", error);
          }
        };
      
        fetchUsers();
      }, []);
=======
useEffect(() => {
    const fetchUsers = async () => {
        const usersCollection = collection(db, 'usuarios');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersList);
    };

    fetchUsers();
}, []);
>>>>>>> 35c343208cb244dad417bcb65d0db2c09ad04c82

    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser){
                console.log("no hay usuario");
                setUser(null)
            } else {
                // Aquí puedes agregar las propiedades adicionales a tu objeto de usuario
                // Por ejemplo, desde un documento de Firestore
                setUser({
                    uid : currentUser.uid,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                })
            }
        })
        return () => suscribed()
    }, [])

    return (
        <AuthProvider>
            {user ? 
                <>
                    <NavBar user={user}/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/account' element={<AccountPage name={user.displayName} email={user.email} photoURL={user.photoURL}/>}/>
                        <Route path='/change-password' element={<ChangePassword/>}/>
                        <Route path='/crossfit-open' element={<CfOpenPage/>}/>
                        <Route path='/crossfit-Leaderboard' element={<SimpleTable photoURL={user.photoURL} users={users} />}/>
                    </Routes>
                </> 
                : 
                    <Login/>
            }
        </AuthProvider>
    )
}