// import React from 'react';
// import { useState, useEffect } from 'react';
//  import { db, auth } from './firebase-config';

//  import { addDoc, onSnapshot, serverTimestamp, query, orderBy, collection } from 'firebase/firestore';

// const messages = collection(db, 'messages');




// export default function Chat() {
//     const [message, setmessage] = useState("");
//     const [list, setlist] = useState([])
//     // useEffect(()=>
//     // {
//     //     const q = query(messages, orderBy("createdAt", "asc"));
//     //     const unsubscribe = onSnapshot(q, (snapshot) => 
//     //     {
//     //         let data = []
//     //         snapshot.docs.forEach((doc)=>
//     //         {
//     //                 data.push({...doc.data(), id:doc.id});
//     //         })
//     //         setlist(data);
//     //     });
//     //     return unsubscribe;
//     // }, []
//     // );
//     const submitMessage = ()=>
//     {
//             addDoc(messages, 
//                 {
//                     message: message,
//                     createdAt: serverTimestamp(),
//                 }
//                 )
//                     .then(()=>{setmessage("")})
//                     .catch(err=>console.log(err.message));
//     }
//     return (
//         <React.Fragment>
//             <input type="text" value={message} onChange={(event)=>setmessage(event.target.value)}/>
//             <button className='btn btn-primary' onClick={submitMessage}>Submit</button>
//             <ul>
//             {
//                 list.map(item => 
//                 <li>
//                     {item.message}
//                 </li>)
//             }
//             </ul>
//         </React.Fragment>
//     )
// }



import React from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
const UserCredential = ()=> 
{
    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const clearForm = () => 
    {
        setname("");
        setpass("");
    }
    const SignIn = () =>
    {
        signInWithEmailAndPassword(auth, name, pass)
            .then((userCred)=>
            {
                console.log(userCred);
            }
        )
            .catch(err => 
            {
                console.log(err);
                switch(err.code)
                {
                    case "auth/user-not-found":
                        alert("There are no users with this email.");
                        clearForm();
                }
            }
        );
    }

    return (
    <React.Fragment>
        <div className="container-lg">
            <div className="row">
                <div className="col-md-6">
                    <input 
                        type="text" 
                        value = {name} 
                        onChange = {(e)=>setname(e.target.value)} 
                        className="form-control" 
                        placeholder="Username" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <input type="password"
                        value = {pass}
                        onChange = {(e)=>setpass(e.target.value)}
                        className="form-control my-3" 
                        placeholder="Password" 
                        aria-label="password" 
                        aria-describedby="basic-addon1"
                    />
                </div>
            </div>          
            <button type="button" className="me-1 btn btn-primary" onClick={SignIn}>SignIn</button>
            <button type="button" className="mx-1 btn btn-primary">Signup</button>
        </div>
    </React.Fragment>
    )
}

export default function Chat() {
  return (
      <React.Fragment>
        <UserCredential/>
    </React.Fragment>
  )
}
