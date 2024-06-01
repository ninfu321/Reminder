import React, {useState, useEffect} from 'react';
import Login from './Login';
import { auth , db} from '../firebase/firebase.js';
import { getAuth, signOut } from "firebase/auth";
import { ProtectedRoute } from './protectedRoute.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ref, set ,get, onValue, update, remove} from "firebase/database";
import SignUp from './SignUp';
import Push from 'push.js';
import Header from './Header';
import Footer from './Footer';
import Reminder from './Reminder';


import '../firebase/firebase.js';
import Timer from './Timer.jsx';

function App(){

  const[index, setIndex] = useState(0)
  const [uuid, setUuid] = useState(null);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [Timers, setTimers] = useState([])

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        setUser(user);
        setIsFetching(false);
        setUuid(user.uid)
        return;
      }

      setUser(null)
      setIsFetching(false);
    });
    return ()=> unsubscribe();
  },[]);

  


  useEffect(() => {
    const dbRef = ref(db, 'users');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
  
        // Check if the data contains the current user's UUID
        if (data[uuid]) {
          const userTimers = data[uuid]; // This object contains the keys like '0', '1', etc.
          
          // Get the keys of the timers
          const timerKeys = Object.keys(userTimers);
          console.log(timerKeys); // This will log ['0', '1'] etc.
          // Iterate over the timer keys to access their values
          timerKeys.forEach((key) => {
            const timerValue = userTimers[key];
            setIndex(userTimers.length)
            setTimers((prevTimers) => [...prevTimers, timerValue]);
          })
          processData(userTimers);
        }
      }
    });
  }, [db, uuid, user,setTimers]); 

  useEffect(() => {
    const intervalId = setInterval(timeManager, 1000);
    return () => clearInterval(intervalId);
  }, [Timers]);
  
  const processData = ((timers)=>{
    setTimers(timers);
  })

  function addTime(newTime){
    setTimers([])
      const reference = ref(db,'users/'+ user.uid +'/' + index );
      set(reference,{
        hour: newTime.hour,
        minute: newTime.minute,
        isChecked: newTime.isChecked
      });
      console.log(Timers)
  }

  function handleToggle(id) {
    const dbRef = ref(db, 'users/' + user.uid + '/' + id);
    get(dbRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTimers(prevTimers =>
          prevTimers.map(timer =>
            timer.id === id ? { ...timer, isChecked: !data.isChecked } : timer
          )
        );

        update(ref(db,'users/'+ user.uid +'/' + id),{
          isChecked: !data.isChecked
        })
      }
    })
    setTimers([]);
  }
  

  
  function handleLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
      console.log("Sign out")
      setTimers([])
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  }
  
  function timeManager(){
    const d = new Date();
    console.log(d)
    console.log(Timers)
    let hours = d.getHours();
    let minutes = d.getMinutes();

    Timers.forEach((item,index) => {
        if(item.isChecked){
        if (item.hour === hours && item.minute === minutes) {
          console.log("YAY WORKING");
          Push.create("HELLO HELLO", {
            body: "You have a reminder",
            icon: '/icon.png',
            timeout: 4000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
        const dbRef = ref(db, 'users/' + user.uid + '/' + index);
        get(dbRef).then((snapshot) => {
          const data = snapshot.val();
          if (data ) {

            setTimers(prevTimers =>
              prevTimers.map(timer =>
                timer.id === index ? { ...timer, isChecked: !data.isChecked } : timer
              )
            );

            update(ref(db,'users/'+ user.uid +'/' + index),{
              isChecked: !data.isChecked
            })
            
          }
        });
        }}
      });
  }

  function deleteTimer(id){
    
    const dbRef = ref(db, 'users/' + user.uid + '/' + id);
    get(dbRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        remove(ref(db,'users/'+ user.uid +'/' + id))
      }
    })
    setTimers([]);
  }

  if(isFetching){
    return <h2 style={{textAlign:'center'}}>Loading...</h2>
  }
    return <div>
    <Header/>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login user={user}/>} />
      <Route path="/SignUp" element={<SignUp user={user}/>}/>
      <Route path="/Reminder" element={
      <ProtectedRoute user={user}>
      <Reminder onAdd={addTime} deleteTimer={deleteTimer} timers={Timers} onToggle={handleToggle} handleSignout={handleLogout}/>
      </ProtectedRoute>}>
      
      </Route>
    </Routes>
  </BrowserRouter>
  <Footer/>
  </div>
}
export default App;