// import React from 'react'
// import { useState } from 'react';
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from './firebase-config';
// import { useAuth } from 'firebase-react-hooks';

// export default function Chat() {
//     const [email, setemail] = useState("");
//     const [password, setpassword] = useState("");
//     const signUp = ()=>
//     {
//             const user = signInWithPopup(auth, new GoogleAuthProvider())
//             .then(val=>console.log(val));
//     }

//     const signIn = ()=>
//     {
        
//     }
//     const signOut = ()=>
//     {
        
//     }
//     return (
//         <React.Fragment>
//             <input type="text" onChange={(event)=>setemail(event.target.value)}/>
//             <input type="password" onChange={(event)=>setpassword(event.target.value)}/>
//             <button className='btn btn-primary' onClick={signUp}>Submit</button>
//         </React.Fragment>
//     )
// }
import React from 'react'
import {useState, useEffect, useReducer} from 'react'
import GUN from 'gun'

const db = GUN(
  {
    peers:
    [
      'http://192.168.1.16:3030/gun'
    ]
  }
  
);


const initialState = {
  messages: []
}

// Create a reducer that will update the messages array
function reducer(state, message) {
  return {
    messages: [...state.messages, message]
  }
}

export default function Chat() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setinput] = useState("")
  
  const AddToList = ()=>
  {
    const messages = db.get("messages");
    messages.set({data: input});
    setinput("");
  }



  useEffect(() => {
    const messages = db.get("messages");
    messages.map().once(todo =>
    {
      dispatch({data:todo.data})
    });
  }, [])

  return (
   <React.Fragment>
     <h1>My Todos</h1>
     <input type="text" name="" id="" onChange={(e)=>setinput(e.target.value)} value={input}/>
     <button onClick={AddToList}>Submit</button>
     <ul>
       {
         state.messages.map(todo =>
          (
            <li>{todo.data}</li>
          ))
       }
     </ul>
   </React.Fragment>
  )
}