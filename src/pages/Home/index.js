import React from 'react'
import './index.css'
import ComputerBoy from '../../assets/svg/ComputerBoy'
import Slider from '../../components/Slider'
export default function Home() {
  return (
      <React.Fragment>
        <section>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-6 my-auto py-5">
                <h1 className="col-md-10 order-2 order-lg-1">
                  Student by day,<br/> coder by night
                </h1>
                <p className='my-4'>
                  Hello, Mahad here. Im a student from Pakistan. Join me as i go through my Coding journey.
                </p>
                <button className="btn btn-outline-dark" style={{borderRadius:"01.25rem"}}>Hop on</button>
              </div>
              <div className="col-md-6 my-auto">
                <ComputerBoy  className="mw-100 my-auto"/>
              </div>
            </div>
          </div>
        </section>
        <Slider/>
      </React.Fragment>
  )
}
