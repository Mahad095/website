import React from 'react'
import Game from './Game'
export default function GameOfLife() {
  return (
    <React.Fragment>
      <div className="container-lg my-5">
        <div className="row justify-content-around">
          <div className="col-md-8 col-lg-7 p-4 rounded shadow-sm">
            <h1 className='display-6'><u>Conway's Game Of Life</u></h1>
            <p className="text-secondary my-4">Conway's Game of Life simulates the birth and death of cells on a rectangular grid. The state of a given cell in any generation depends on the state of the cell and its eight immediate neighbors in the preceding generation, according to some simple rules: </p>
            <ul className='text-secondary'>
              <li>
                If a living cell has two or three neighbors, it remains living.
              </li>
              <li>
                If an dead cell has exactly three neighbors, it becomes living.
              </li>
              <li>
                In all other cases, the cell either dies or remains dead.
              </li>
            </ul>
          </div>
          <div className="col-md-8 mt-5 d-flex justify-content-center">
            <Game/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
