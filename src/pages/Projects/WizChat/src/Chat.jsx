import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { 
    onAuthStateChanged, 
    signOut, 
} from 'firebase/auth';

import { auth, db } from './firebase-config';
import { 
    onSnapshot,
    query, 
    collection, 
    orderBy, 
    addDoc, 
    serverTimestamp,
    getDocs,
    startAfter,
    limit,
    where,
    Timestamp
} from 'firebase/firestore';
import './Chat.css'
import UserAuth from './UserAuth';
import ScrollFeed from './ScrollFeed';
const messages = collection(db, "messages");


export default function Chat() {
    const [user, setuser] = useState(null);
    const [msgList, setmsgList] = useState([]);
    const [msg, setmsg] = useState("");
    const firstDoc = useRef(null);
    const [dataFetched, setdataFetched] = useState(false);
    
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
        addDoc(messages, 
            {
                message: toSend,
                uid: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                createdAt: serverTimestamp(),
            }
            )
            .catch(err=>console.log(err.message));
    }
    const FetchOldData = () =>
    {
        setdataFetched(false);
        getDocs(query(messages, orderBy("createdAt", "desc"), limit(10), startAfter(firstDoc.current)))
            .then((snapshot) => 
            {
                if(snapshot.docs.length < 10) return;
                let data = [];
                firstDoc.current = snapshot.docs[snapshot.docs.length - 1];
                snapshot.docs.forEach((doc)=>
                {
                    data.push({...doc.data(), id:doc.id});
                });
                setdataFetched(true);
                setmsgList(data.reverse().concat(msgList));
                console.log("First");
            })
            .catch((err)=>console.log(err));
    }
    useEffect( ()=>
    {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => 
        {
            setuser(user);
        });    
        getDocs(query(messages, orderBy("createdAt", "desc"), limit(10)))
            .then((snapshot) => 
            {
                let data = [];
                firstDoc.current = snapshot.docs[snapshot.docs.length - 1];
                snapshot.docs.forEach((doc)=>
                {
                    data.push({...doc.data(), id:doc.id});
                });
                if(!dataFetched)
                {
                    setdataFetched(true);
                } 
                setmsgList(data.reverse());
            })
            .catch((err)=>console.log(err));
        const unsubscribeCollection = onSnapshot(query(messages, orderBy("createdAt", "desc"), where("createdAt", ">", Timestamp.now())), (snapshot) => 
        {
            let data = []
            snapshot.docChanges().forEach((change)=>
            {
                data.push({...change.doc.data(), id:change.doc.id});
                // const timeStampDate = doc.data().createdAt;
                // const dateInMillis  = timeStampDate.seconds * 1000
                // var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString();
                // console.log(date);
            })
            setmsgList(state=>state.concat(data.reverse()));
        });
        return () => {unsubscribeAuth(); unsubscribeCollection();}
    }
    ,[]);
    return (
        <React.Fragment>
            {
                user === null
                ?
                    <UserAuth/>
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
                                    
                                            <ScrollFeed className="messagesContainer" onNearTop={()=>FetchOldData()} near={0} >
                                            {/* // if the data has not been fetched then display a loading screen else display the data */}
                                            {!dataFetched && 
                                            
                                                <div className="spinner-border text-primary mx-auto my-auto " role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            }                                            
                                            {    msgList.map((msg, i)=>
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
                                            </ScrollFeed>
                                    <div className="d-flex mt-1 pb-1 mx-2 stickBottom">
                                        <input 
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
