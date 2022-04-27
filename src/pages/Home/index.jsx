import React from 'react'
import './index.css'
import ComputerBoy from '../../assets/svg/ComputerBoy'
import Slider from '../../components/Slider'
import chicks from "../../assets/img/chicks.jpg"
import tiger from "../../assets/img/tiger.jpg"
import sheep from "../../assets/img/sheep.jpg"
import parrots from "../../assets/img/parrots.jpg"
import Footer from '../../components/Footer/Footer'
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
                <ComputerBoy className="d-none d-md-block"/>
              </div>
            </div>
          </div>
        </section>
        <Slider height="200px" className="shadow-lg bg-white rounded">
          <img src={chicks} alt="a group of chickens"/>
          <img src={tiger} alt="a tiger"/>
          <img src={parrots} alt="two parrots"/>
          <img src={sheep} alt="a sheep"/>
        </Slider>
      </React.Fragment>
  )
}
