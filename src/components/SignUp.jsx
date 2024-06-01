import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { Navigate } from 'react-router-dom';
function SignUp({user}){

  

    const [email,setEmail] = useState("");
    const [missingEmail, setMissingEmail] = useState(false)
    const [weakPassword, setWeakPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [emailExists, setEmailExists] = useState(false)


  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/Reminder');
    }
  }, []);
  const handleSignUp = (event)=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        console.log(user);
        navigate('/Reminder');
        window.location.reload();

    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if(errorCode==='auth/email-already-in-use'){
          setEmailExists(true);
        } else{
          setEmailExists(false);
        }
        if(errorCode==='auth/invalid-email'){
          setInvalidEmail(true);
        }else{
          setInvalidEmail(false);
        }
        if(errorCode==='auth/weak-password'){
          setWeakPassword(true);
        }else{
          setWeakPassword(false);
        }if(errorCode==='auth/missing-email'){
          setMissingEmail(true);
        } else{
          setMissingEmail(false);
        }
        
    })
    event.preventDefault();
  }

  const handleEmailChange = (event)=> setEmail(event.target.value);
  const handlePasswordChange = (event)=>setPassword(event.target.value);

  

  

    return <div >
    <h1 className="center signHeading">Sign Up</h1>
    <form >
    <div className="form-floating  mx-auto emailEntry">
          <input onChange={handleEmailChange} value={email}type="email" className="form-control --bs-secondary-color" id="floatingInput" placeholder="name@example.com" size="5"/>
          <label htmlFor="floatingInput">Email address</label>
        </div>
     { emailExists?<div className='emailPassExists' style={{color: "var(--bs-danger-text-emphasis)"}}> 
      ⚠️ Email already exists.
    </div>:""}
    { invalidEmail?<div className='emailPassExists' style={{color: "var(--bs-danger-text-emphasis)"}}> 
      ⚠️ Invalid Email
    </div>:""}
    { missingEmail?<div className='emailPassExists' style={{color: "var(--bs-danger-text-emphasis)"}}> 
      ⚠️ Please Enter an email
    </div>:""}
    <div className="form-floating  mx-auto passwordEntry">
          <input onChange={handlePasswordChange} value={password} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        { weakPassword?<div className='emailPassExists' style={{color: "var(--bs-danger-text-emphasis)"}}> 
      ⚠️ Password should be at least 6 characters.
    </div>:""}
        <div className="d-flex justify-content-between mx-auto signBtn">
        <button onClick={handleSignUp} className="btn btn-secondary w-100 py-2 mx-1" type="submit">Sign up</button>
        <button className="btn btn-secondary w-100 py-2 mx-1" type="submit" onClick={()=>{
          navigate('/')
        }}>Log in</button>
    </div>
    </form>
    </div>
    
}


export default SignUp;