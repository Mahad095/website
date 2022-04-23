import React from 'react'
import './index.css'
export default function Slider() {
    const children = Array(10).fill(<p>Hello</p>);
    return (
    <React.Fragment>
        <div className="slider-container">
            {
            children
            }
        </div>
    </React.Fragment>
  )
}
