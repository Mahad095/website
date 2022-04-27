import React, { useState } from 'react'
import './index.css'
export default function Slider(props) {

    const [translate, settranslate] = useState(0)
    const slide = (dir)=>{
        if(translate === 0 && dir > 0) return;
        if(translate === ((React.Children.count(props.children)- 1) * -100) && dir < 0) return;
        settranslate(translate+(dir*100));
    }
    return (
    <React.Fragment>
        <div className= {"slider-container " + props.className} style={{height:`${props.height}`}}>
            <button className='btn btn-primary navigators left' onClick={()=>slide(1)}>&lt;</button>

            {
                React.Children.map(props.children, child=>
                (
                    <div className="slider-item" style ={{transform:`translateX(${translate}%)`}}>
                        {child}
                    </div>
                ))
            }
            <button className='btn btn-primary navigators right'onClick={()=>slide(-1)}>&gt;</button>
        </div>
    </React.Fragment>
  )
}
