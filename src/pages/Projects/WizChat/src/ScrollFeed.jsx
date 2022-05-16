import React, { useEffect, useRef } from 'react'

export default function ScrollFeed({children, className}) {
    
    const scrollRef = useRef(null);
    const container = useRef(null);
    
    const isAtBottom = () => container.current.scrollTop  == (container.current.scrollHeight - container.current.offsetHeight); 
    
    useEffect(
        ()=>{
            scrollRef.current?.scrollIntoView({behaviour : 'smooth'});
        }, [scrollRef.current]);
    useEffect(
        ()=>{
            console.log(container.current!==null);
            console.log(isAtBottom());
            if(container.current!==null && isAtBottom()) scrollRef.current?.scrollIntoView({behaviour : 'smooth'});
        });    
    return (
        <React.Fragment>
            <div ref = {container}className={className}>
                {children}
                <div ref={scrollRef}></div>
            </div>
        </React.Fragment>      
    );
}


// Scroll to bottom in beginning
// Keep scroll at bottom unless user scrolls up. If user scrolls back down then keep scroll to bottom.
// Get callBack when user goes up compltely