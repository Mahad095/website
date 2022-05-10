import React from 'react';
import { useState, useEffect } from 'react';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    updateProfile 
} from 'firebase/auth';

import { auth, db } from './firebase-config';
import { 
    onSnapshot,
    query, 
    collection, 
    orderBy, 
    addDoc, 
    serverTimestamp, 
} from 'firebase/firestore';
import './Chat.css'

const messages = collection(db, "messages");

const UserCredential = ()=> 
{
    const [name, setname] = useState("");
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
                    default:
                        console.log(err);
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
                updateProfile(auth.currentUser, 
                    {
                        displayName : name
                    })
                        .then(()=>console.log(userCred))
                        .catch((err)=>console.log(err.message));
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
                    default:
                        console.log(err);
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
                        value = {name} 
                        onChange = {(e)=>setname(e.target.value)} 
                        className="form-control my-3" 
                        placeholder="Username" 
                        aria-label="username" 
                        aria-describedby="basic-addon1"
                    />
                </div>
            </div>
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
    const [msg, setmsg] = useState("");
    const [sending, setsending] = useState(false);
    const SignOut = ()=> 
    {
        signOut(auth)
            .then(()=>console.log("User Signed out"))
            .catch((err)=>console.log(err.message));
    }
    const AddMessage = ()=>
    {
        if(msg.length === 0) return;
        let toSend = msg;
        setmsg(""); 
        setsending(true);
        addDoc(messages, 
            {
                message: toSend,
                uid: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                createdAt: serverTimestamp(),
            }
            )
                .then(()=>{setsending(false);})
                .catch(err=>console.log(err.message));
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
                        
                        // const timeStampDate = doc.data().createdAt;
                        // const dateInMillis  = timeStampDate.seconds * 1000
                        // var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString();
                        
                        // console.log(date);
                })
                setmsgList(data);
            });
            return () => {unsubscribeAuth(); unsubscribeCollection();}
        }
        ,[]);
    return (
        <React.Fragment>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6 shadow chatBox px-0">
                            {user === null && <UserCredential/>}
                            {user &&    
                                <>            
                                    <div className="bg-primary rounded-top py-3 stickTop d-flex justify-content-between">
                                        <p className="h5 text-white my-auto ms-2"><strong>{auth.currentUser?.displayName}</strong></p>
                                        <button 
                                            className="btn btn-light me-2 text-secondary"
                                            onClick={SignOut}
                                        > <strong>Sign Out</strong>
                                        </button>
                                    </div>
                                    <div className="messagesContainer">
                                        { 
                                            msgList.map((msg, i)=>
                                            <div 
                                                key={i} 
                                                className =
                                                { (msg.uid === auth.currentUser?.uid?"msgBySelfUser me-2 text-white ":"ms-2 text-secondary") + "py-2 my-3 shadow rounded msg"}                                    
                                            >
                                                <p className="mx-3 my-auto"><strong>{msg.name}</strong></p>
                                                <p className="mx-3 my-auto">{msg.message}</p>                                        
                                            </div>
                                            )
                                        }
                                    </div>
                                    <div className="d-flex mt-1 pb-1 mx-2 stickBottom">
                                        <input 
                                            disabled= {sending}
                                            type="text" 
                                            value = {msg} 
                                            onChange = {(e)=>setmsg(e.target.value)} 
                                            onKeyDown = {(e)=> e.key === "Enter" && AddMessage()}
                                            className="form-control" 
                                            placeholder="Enter message." 
                                            aria-label="write area" 
                                            aria-describedby="basic-addon1"
                                        />
                                        <button 
                                            disabled= {sending}                                    
                                            type="button" 
                                            className="btn btn-primary" 
                                            onClick={AddMessage}
                                        >
                                            Go
                                            </button>
                                    </div>
                                </>
                                }
                            </div>
                    </div>
                </div>            
        </React.Fragment>
    )
}
