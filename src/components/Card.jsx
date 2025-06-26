import React, { useState } from 'react'
import { useFirebase } from '../context/FirebaseContext'

function Card() {
    const { signup,signin, pushtoDB, signGoogle , GoogleAuthProvider} = useFirebase();
    // console.log(pushtoDB);

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    const handleSignUp = () => {
        signup(email, pass).then((val) => {
            const user = val.user;
            console.log(user);
            alert(user.email + " Signed Up !");
            const data = {
                name: email
            }
            const sanitizedEmail = email.replace(".com", ' ');
            // Use the sanitized email as the key
            const key = sanitizedEmail;
            pushtoDB(key, data);
            alert("Data pushed to DB !");
        }).catch((e) => {
            alert(e.message);
        });
    }
    const handleSignIn=()=>{
        signin(email,pass)
        .then((res)=>{
            const user=res.user;
            alert("You are Signed In !");
        })
        .catch((e)=>{
            alert(e.message);
        });
    }
    const handleSignInGoogle = () => {
        signGoogle()
            .then((res) => {
                const credential = GoogleAuthProvider.credentialFromResult(res);
                console.log(credential);
                const token = credential.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = res.user;
                console.log(user);
                
            })
    }
    return (
        <>
            <div className="container-box">
                <div className="container">
                    <p>Email : </p>
                    <input type="email" placeholder='abc@example.com' value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p>Enter password : </p>
                    <input type="password" name="" id="" value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <p></p>
                    <button onClick={handleSignUp}>Sign Up</button>
                    <span>&nbsp;&nbsp;</span>
                    <button onClick={handleSignIn}>Sign In</button>
                    <p>OR</p>
                    <button className='google-btn' onClick={handleSignInGoogle}><span>Sign up with Google</span><img src="https://cdn-icons-png.flaticon.com/128/2702/2702602.png" alt="" /></button>
                </div>
            </div>
        </>
    )
}

export default Card
