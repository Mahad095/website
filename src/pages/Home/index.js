import React from 'react'
import './index.css'
import ComputerBoy from '../../assets/svg/ComputerBoy'
export default function Home() {
  return (
      <React.Fragment>
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-10 mx-auto">

                <h1 className="col-md-6 mt-5 pt-5 order-2 order-lg-1">
                  Student by day,<br/> coder by night
                </h1>
                <p className='my-3'>
                  Hello, Mahad here. Im a student from Pakistan. Join me as i go through my Coding journey.
                </p>
                <button className="btn btn-outline-dark" style={{borderRadius:"01.25rem"}}>Hop on</button>
              </div>
              <ComputerBoy width = {500} height = {500}/>
            </div>
          </div>
        </section>
      </React.Fragment>
  )
}
