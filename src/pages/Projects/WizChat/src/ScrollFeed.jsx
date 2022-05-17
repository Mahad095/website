import React, { useEffect, useRef } from 'react'

export default function ScrollFeed({children, className, onNearTop, near}) {
    
    const scrollRef = useRef(null);
    const container = useRef(null);
    const focused = useRef(null);
    const isAtBottom = () => container.current.scrollTop  == (container.current.scrollHeight - container.current.offsetHeight); 
    const isNearTop = (nearValue) => container.current.scrollTop <= nearValue * container.current.scrollHeight;
    useEffect(
        ()=>{
            scrollRef.current?.scrollIntoView({behaviour : 'smooth'});
        }, [scrollRef.current]);
    useEffect(
        ()=>{
            if(focused.current) scrollRef.current?.scrollIntoView({behaviour : 'smooth'});
        });
    const handleScroll = () =>
        {
            if(!isAtBottom()) focused.current = false;
            else focused.current = true;
            if(container.current !== null)
            {
                if(isAtBottom()) scrollRef.current?.scrollIntoView({behaviour : 'smooth'});
                else if (isNearTop(near)) 
                {
                    onNearTop();
                    container.current.scroll({top:0.5 * container.current.scrollHeight});
                }
            }
        }

    return (
        <React.Fragment>
            <div ref = {container}className={className} onScroll = {handleScroll}>
                {children}
                <div ref={scrollRef}></div>
            </div>
        </React.Fragment>      
    );
}


// ScrollFeed.defaultProps = 
// {
//     className : "",
// }

// Scroll to bottom in beginning
// Keep scroll at bottom unless user scrolls up. If user scrolls back down then keep scroll to bottom.
// Get callBack when user goes up compltelyfocused.current = false