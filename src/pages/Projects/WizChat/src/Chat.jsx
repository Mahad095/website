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
import '../../../../index.css'
import Connection from '../../../../assets/svg/Connection'
const messages = collection(db, "messages");

const UserCredential = ()=> 
{
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [shouldSignUp, setshouldSignUp] = useState(false);
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
           <div className="row justify-content-center">
               <div className="col-sm-6 col-lg-4">
                   <div className="card">
                       <div className="card-header">
                           <Connection/>
                       </div>
                        <div className='card-body'>
                            <h4 className='text-center'>{shouldSignUp?"SIGN UP": "SIGN IN"}</h4>
                            {shouldSignUp && <input 
                                type="text" 
                                value = {name} 
                                onChange = {(e)=>setname(e.target.value)} 
                                className="form-control mt-3" 
                                placeholder="Username" 
                                aria-label="username" 
                            /> }
                            <input 
                                type="text" 
                                value = {email} 
                                onChange = {(e)=>setemail(e.target.value)} 
                                className="form-control mt-3" 
                                placeholder="Email@wizard.com" 
                                aria-label="email" 
                            />
                            <input 
                                type="password" 
                                value = {pass} 
                                onChange = {(e)=>setpass(e.target.value)} 
                                className="form-control mt-3" 
                                placeholder="Password" 
                                aria-label="password" 
                            />
                            {
                                shouldSignUp
                                ?
                                <>
                                    <button type="button" className="btn btn-primary mt-3" onClick={SignUp}>SignUp</button>
                                    <p className="text-secondary mt-2">
                                        Registered? 
                                        <button 
                                            className='buttonAsAnchor text-secondary' 
                                            onClick={()=>setshouldSignUp(false)}
                                        >
                                            &nbsp;Sign in here.
                                        </button>
                                    </p>
                                </>
                                :
                                <>
                                    <button type="button" className="btn btn-primary mt-3" onClick={SignIn}>SignIn</button>
                                    <p className="text-secondary mt-2">
                                        Not registered? 
                                        <button 
                                            className='buttonAsAnchor text-secondary' 
                                            onClick={()=>setshouldSignUp(true)}
                                        >
                                            &nbsp;Click here to sign up.
                                        </button>
                                    </p>
                                </>
                            }
                        </div>
                   </div>
                </div>
           </div>
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
            {
                user === null
                ?
                <UserCredential/>
                :
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6 shadow chatBox px-0">       
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
                            </div>
                    </div>
                </div>
            }            
        </React.Fragment>
    )
}
