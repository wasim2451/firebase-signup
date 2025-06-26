import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card';
import { useFirebase } from './context/FirebaseContext';
import LogIn from './components/LogIn';
function App() {
    const [user, setUser] = useState(null);
    const { auth, onAuthStateChanged,signOut } = useFirebase();
    const handleLogOut = () => {
        signOut(auth).then(() => {
            alert("Signout Successfull !")
            setUser(null);
        }).catch((error) => {
            // An error happened.
            alert("Something Wrong !");
        });
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.email); 
                setUser(user.email)
            }
        });
    }, [user]);
    return (
        <>
        { user!=null ?<>
            <LogIn user={user}/>
            <button onClick={handleLogOut}>Logout</button> 
        </>:
        <>  
            <Card /> 
        </>
        }
        </>
    )
}

export default App
