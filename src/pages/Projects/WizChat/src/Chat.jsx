import React from 'react';
import { useState, useEffect } from 'react';
import {messages} from './firebase-config';
import { addDoc, getDocs, Timestamp } from 'firebase/firestore';

export default function Chat() {
    const [message, setmessage] = useState("");
    useEffect(()=>
    {
        // getDocs(messages)
        //     .then((snapshot) => 
        //     {
        //         snapshot.docs.forEach((doc)=>
        //         {
        //             data.push({...doc.data(), id:doc.id});
        //         })
        //         console.log(data);
        //     }).catch(err=>console.log(err.message));
    }, []
    )

    const signUp = ()=>
    {
            addDoc(messages, 
                {
                    message: message,
                    date:Timestamp.now(),
                }
                ).then(()=>{setmessage("")})
                
            // const user = signInWithPopup(auth, new GoogleAuthProvider())
            // .then(val=>console.log(val));
    }

    const signIn = ()=>
    {
        
    }
    const signOut = ()=>
    {
        
    }
    return (
        <React.Fragment>
            <input type="text" value={message} onChange={(event)=>setmessage(event.target.value)}/>
            <button className='btn btn-primary' onClick={signUp}>Submit</button>
        </React.Fragment>
    )
}