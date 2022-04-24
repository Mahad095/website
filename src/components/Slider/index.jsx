import React, { useState } from 'react'
import './index.css'
export default function Slider() {
    const children = []
    let translate = 0;
    let delta = 100;
    for (let index = 0; index < 10; index++) {
        children.push(<p className="slider-item">Hello {index}</p>);
    }
    console.log(children.length)
    const slide = (dir)=>{
        if(translate == 0 && dir == 1) return;
        if(translate == ((children.length - 1) * -100) && dir == -1) return;
        translate += dir * delta;
        let items = document.getElementsByClassName("slider-item");
        for (let i = 0; i < items.length; i++) {
            items[i].style.transform=`translateX(${translate}%)`;            
        }
    }
    return (
    <React.Fragment>
        <div className="slider-container">
            <button className='btn btn-primary navigators left' onClick={()=>slide(1)}>A</button>
            {
                children
            }
            <button className='btn btn-primary navigators right'onClick={()=>slide(-1)}>B</button>
        </div>
    </React.Fragment>
  )
}
