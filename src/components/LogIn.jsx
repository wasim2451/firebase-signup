import React from 'react'
import { useFirebase } from '../context/FirebaseContext'

function LogIn({ user }) {
    return (
        <>
            <h3>Hello {user}</h3>
            <p></p>
        </>
    )
}

export default LogIn
