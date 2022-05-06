import React from 'react';
import { useState, useEffect } from 'react';
import {messages} from './firebase-config';
import { addDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function Chat() {
    const [message, setmessage] = useState("");
    const [list, setlist] = useState([])
    useEffect(()=>
    {
        const q = query(messages, orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => 
        {
            let data = []
            snapshot.docs.forEach((doc)=>
            {
                    data.push({...doc.data(), id:doc.id});
            })
            setlist(data);
        });
        return unsubscribe;
    }, []
    );
    const submitMessage = ()=>
    {
            addDoc(messages, 
                {
                    message: message,
                    createdAt: serverTimestamp(),
                }
                )
                    .then(()=>{setmessage("")})
                    .catch(err=>console.log(err.message));
    }
    return (
        <React.Fragment>
            <input type="text" value={message} onChange={(event)=>setmessage(event.target.value)}/>
            <button className='btn btn-primary' onClick={submitMessage}>Submit</button>
            <ul>
            {
                list.map(item => 
                <li>
                    {item.message}
                </li>)
            }
            </ul>
        </React.Fragment>
    )
}