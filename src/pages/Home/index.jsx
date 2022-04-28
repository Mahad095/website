import React from 'react'
import './index.css'
import ComputerBoy from '../../assets/svg/ComputerBoy'
import LookAtBoardBoy from '../../assets/svg/LookAtBoardBoy'
import Slider from '../../components/Slider'
import chicks from "../../assets/img/chicks.jpg"
import tiger from "../../assets/img/tiger.jpg"
import sheep from "../../assets/img/sheep.jpg"
import parrots from "../../assets/img/parrots.jpg"
import Footer from '../../components/Footer/Footer'
import { NavLink } from 'react-router-dom'
export default function Home() {
  return (
      <React.Fragment>
        <section id="hero">
          <div className="container-lg py-4 my-2">
            <div className="row justify-content-center text-center align-items-center text-md-start">
              <div className="col-sm-10 col-md-6 py-5">
                <h1 className="display-4">
                  Student by day,<br/> coder by night
                </h1>
                <p className='my-4 text-secondary'>
                  A student from Pakistan with a passion for coding. Hop along with me on my journey to become a master of web development.
                  {/* Hello, Mahad here. Im a student from Pakistan. Join me as i go through my Coding journey. */}
                </p>
                <NavLink className="btn btn-primary" to="/Projects">Take a peek!</NavLink>
              </div>
              <div className="col-9 col-md-6">
                <ComputerBoy/>
              </div>
            </div>
          </div>
        </section>
        <Slider height="300px">
          <img src={chicks} alt="a group of chickens"/>
          <img src={tiger} alt="a tiger"/>
          <img src={parrots} alt="two parrots"/>
          <img src={sheep} alt="a sheep"/>
        </Slider>
        <section id="about">
          <div className="container-lg py-4 my-2">
            <div className="row justify-content-around align-items-center">
              <div className="col-sm-10 col-md-5 p-3 text-center text-md-start">
                <h1>Who Am I?</h1>
                <p className='text-secondary my-4'>Hello! My name is <strong>Mahad Hameed</strong>. I am a student of computer science, based in Pakistan. I started my coding journey in 2020. All my life, I was uncertain about what I wanted to do with my life. But now I can say with absolute certainty that I have finally found my passion.</p>
                <h1>What I do?</h1>
                <p className="text-secondary my-4">I am a full time student. But, in my free time, I strive to make fun, beautiful, and useful applications. Feel free to interact with them.</p>
                <NavLink className="btn btn-primary" to="/Projects">Take a peek!</NavLink>
              </div>
                <div className="col-sm-5 col-md-4 col-lg-3">
                  <LookAtBoardBoy/>
                </div>
            </div>      
          </div>
        </section>

      </React.Fragment>
  )
}
