import React, { Component } from 'react'

export class ScrollFeed extends Component {
    constructor(props)
    {
        super(props);
        this.container = React.createRef(null);
        this.focus = true;
        this.prevScrollValue = 0;
        this.previousHeight = 0;
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
        return Math.abs(this.container.current.scrollTop);
    }
    isAtBottom = (Near) =>
    {
        // console.log("value: ",(this.container.current.scrollHeight - this.container.current.offsetHeight) * Near)
        return this.scrollTop()  >= ((this.container.current.scrollHeight - this.container.current.offsetHeight) * Near);
    }
    isAtTop = () =>
    {
        return this.scrollTop() === 0;
    }
    handleScroll = () =>
    {
        console.log(this.scrollTop());
        // console.log(this.isAtBottom(this.props.near));

        // console.log(this.container.current.scrollHeight - this.container.current.offsetHeight);
        // if(this.prevScrollValue  < this.container.current.scrollTop)
        // {
        //     this.prevScrollValue = this.container.current.scrollTop;
        //     this.focus = false;
        // }
        if(this.isAtBottom(this.props.near)) this.props.onBottom(); 
    }
    componentDidMount()
    {
        this.container.current.addEventListener("scroll", this.handleScroll);
    }
    // componentDidUpdate()
    // {
    //     if(this.previousHeight !== this.container.current.scrollHeight)
    //     {
    //         this.scroll(this.container.current.scrollHeight - this.previousHeight);
    //         this.previousHeight = this.container.current.scrollHeight;
    //     }
    //     if(this.isAtBottom()) this.focus = true;
    //     if(this.focus)
    //     {
        
    //         this.scrollToBottom();
    //     } 
    // }  
    componentWillUnmount()
    {
        this.container.current.removeEventListener("scroll", this.handleScroll);
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