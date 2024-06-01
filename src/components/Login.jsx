import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

import {signInWithEmailAndPassword } from 'firebase/auth';
function Login( {user}){

  const [loginError, setLoginError] = useState(true);
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate('/Reminder');
    }
  }, []);

  const handleSignIn = (event)=>{
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        console.log(user);
        console.log(user.uid)
        navigate('/Reminder')
        
        window.location.reload();
    })
    .catch((error)=>{
        const errorCode = error.code;
        setLoginError(false);
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    })
    setLoginError(true)
    event.preventDefault();
  }

  const handleEmailChange = (event)=> setEmail(event.target.value);
  const handlePasswordChange = (event)=>setPassword(event.target.value);

  

  
  


    return <div >
    <h1 className="center signHeading">Sign in</h1>
    <form >
    <div className="form-floating  mx-auto emailEntry">
          <input type="email" onChange={handleEmailChange} className="form-control --bs-secondary-color" id="floatingInput" placeholder="name@example.com" size="5"/>
          <label htmlFor="floatingInput">Email address</label>
        </div>
    
    <div className="form-floating  mx-auto passwordEntry">
          <input type="password" onChange={handlePasswordChange} className="form-control" id="floatingPassword" placeholder="Password"/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {loginError? '':<div class="alert alert-danger w-25 mx-auto" style={{textAlign:"center"}} role="alert">
Invalid Email or Password
</div>}
        <div className="d-flex justify-content-between mx-auto signBtn">
        <button className="btn btn-secondary w-100 py-2 mx-1" onClick={handleSignIn} type="submit">Sign in</button>
        <button className="btn btn-secondary w-100 py-2 mx-1" type="submit" onClick={()=>{
          navigate('/SignUp')
        }}>Sign up</button>
    </div>
    </form>
    </div>
    
}


export default Login;