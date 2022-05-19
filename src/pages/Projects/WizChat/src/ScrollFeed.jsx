import React, { Component } from 'react'

export class ScrollFeed extends Component {
    constructor(props)
    {
        super(props);
        this.container = React.createRef(null);
        this.focus = true;
        this.prevScrollValue = 0;
    }
    scroll = (topValue) =>
    {
        this.container.current.scroll({ top : topValue, behaviour : "smooth" });
    }
    scrollToBottom = () =>
    {
        this.scroll(this.container.current.scrollHeight - this.container.current.offsetHeight);
    }
    scrollToTop = () =>
    {
        this.scroll(0);
    }
    scrollHeight = () =>
    {
        return this.container.current.scrollHeight;
    }
    scrollTop = () =>
    {
        return this.container.current.scrollTop;
    }
    isAtBottom = () =>
    {
        return this.container.current.scrollTop  === (this.container.current.scrollHeight - this.container.current.offsetHeight);
    }
    isAtTop = () =>
    {
        return this.container.current.scrollTop === 0;
    }
    didScrollUp = () =>
    {
        if(this.prevScrollValue < this.container.current.scrollTop)
        {
            this.prevScrollValue = this.container.current.scrollTop;
            this.focus = false;
        }
    }
    componentDidMount()
    {
        this.container.current.addEventListener("scroll", this.didScrollUp);
    }
    componentDidUpdate()
    {
        if(this.isAtBottom()) this.focus = true;
        if(this.focus)
        {
            this.scrollToBottom();
        } 
    }  
    componentWillUnmount()
    {
        this.container.current.removeEventListener("scroll", this.didScrollUp);
    }
    render() {
        return (
            <div ref = {this.container}className={this.props.className}>
                {this.props.children}
            </div>  
        )
    }
}

export default ScrollFeed


// export default function ScrollFeed({children, className, onNearTop, near}) {
    
//     const scrollRef = useRef(null);
//     const container = useRef(null);
//     const focused = useRef(null);
//     const height = useRef(0);
//     const isAtBottom = () => container.current.scrollTop  == (container.current.scrollHeight - container.current.offsetHeight); 
//     const isNearTop = (nearValue) => container.current.scrollTop <= nearValue * container.current.scrollHeight;
//     useEffect(
//         ()=>{
//             scrollRef.current?.scrollIntoView({behaviour : 'smooth'});
//             height.current = container.current.scrollHeight;
//         }, [scrollRef.current]);
//     useEffect(
//         ()=>{
//             if(focused.current) scrollRef.current?.scrollIntoView({behaviour : 'smooth'});
//             // else
//             // {
//             //     if(container.current && height.current !== container.current.scrollHeight)
//             //     {
//             //         console.log("This");
//             //         container.current.scroll({top:container.current.scrollHeight - height.current, behaviour:"smooth"});
//             //         height.current = container.current.scrollHeight;
//             //     }
//             // }
//         });
//     const handleScroll = async () =>
//         {
//             if(!isAtBottom()) focused.current = false;
//             else focused.current = true;
//             if(container.current !== null)
//             {
//                 if (isNearTop(near)) 
//                 {
                    
//                     await onNearTop();
//                     container.current.scroll({top:container.current.scrollHeight - height.current, behaviour:"smooth"});
//                     console.log("Second")
//                 }
//             }
//         }

//     return (
//         <React.Fragment>
//             <div ref = {container}className={className} onScroll = {handleScroll}>
//                 {children}
//                 <div ref={scrollRef}></div>
//             </div>
//         </React.Fragment>      
//     );
// }


// ScrollFeed.defaultProps = 
// {
//     className : "",
// }

// Scroll to bottom in beginning
// Keep scroll at bottom unless user scrolls up. If user scrolls back down then keep scroll to bottom.
// Get callBack when user goes up compltelyfocused.current = false