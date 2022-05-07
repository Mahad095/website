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
//     //     const q = query(messages, orderBy("createdAt", "asc"));c
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
import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase-config';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';

const messages = collection(db, "messages");

const UserCredential = ()=> 
{
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    
    const clearForm = () => 
    {
        setemail("");
        setpass("");
    }

    const SignIn = () =>
    {
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCred)=>
            {
                console.log(userCred);
            })
            .catch(err => 
            {
                console.log(err);
                switch(err.code)
                {
                    case "auth/user-not-found":
                        alert("There are no users with this email.");
                        clearForm();
                        break;
                    case "auth/wrong-password":
                        alert("You have entered the wrong password.");
                        setpass("");
                        break;
                }
            });
    }

    const SignUp = () => 
    {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCred)=> 
            {
                console.log(userCred);
            })   
            .catch((err) => 
            {
                console.log(err);
                switch(err.code)
                {
                    case "auth/invalid-email":
                        alert("This email address is invalid.");
                        setemail("");
                        break;
                    case "auth/weak-password":
                        alert("The Password Should have at least 6 characters.");
                        setpass("");
                        break;               
                    case "auth/email-already-in-use":
                        alert("This email is already in use.");
                        setemail("");
                        break;    
                }
            });
    }
    return (
    <React.Fragment>
        <div className="container-lg">
            <div className="row">
                <div className="col-md-6">
                    <input 
                        type="text" 
                        value = {email} 
                        onChange = {(e)=>setemail(e.target.value)} 
                        className="form-control" 
                        placeholder="Example123@email.com" 
                        aria-label="email" 
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
            <button type="button" className="mx-1 btn btn-primary" onClick={SignUp}>Signup</button>
        </div>
    </React.Fragment>
    )
}

export default function Chat() {
    const [user, setuser] = useState(null);
    const [msgList, setmsgList] = useState([]);
    const SignOut = ()=> 
    {
        signOut(auth)
            .then(()=>console.log("User Signed out"))
            .catch((err)=>console.log(err.message));
    }
    useEffect( ()=>
        {
            const unsubscribeAuth = onAuthStateChanged(auth, (user) => 
            {
                setuser(user);
                console.log(user);
            });    

            const q = query(messages, orderBy("createdAt", "asc"));
            const unsubscribeCollection = onSnapshot(q, (snapshot) => 
            {
                let data = []
                snapshot.docs.forEach((doc)=>
                {
                        data.push({...doc.data(), id:doc.id});
                })
                setmsgList(data);
            });
            return () => {unsubscribeAuth(); unsubscribeCollection();}
        }
        ,[]);
    return (
        <React.Fragment>
            {user === null && <UserCredential/>}
            {user && 
                <div className="container-lg">
                    {
                        msgList.map((msg, i)=><p key={i}>{msg.message}</p>)
                    }
                    <button type="button" className="me-1 btn btn-primary" onClick={SignOut}>SignOut</button>
                </div>
                
            }
            
        </React.Fragment>
    )
}
