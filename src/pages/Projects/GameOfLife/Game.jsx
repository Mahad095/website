import React, {useState} from 'react'
import Cell from './Cell';
import './Game.css'
import Animator from './Animator';
function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}


function Game(props) {
  const [n, setn] = useState(10);
  // const n = 15;
  let cells = createArray(n, n);  //Creates n x n array.
  let secondary = createArray(n, n);
  //We have to manually initialize(without map/foreach/fill) for some reason(probably because of createRef) otherwise was having problems
  for(let i = 0 ; i < n ; i++)
  {
    for(let j = 0 ; j < n ; j++)
    {
      cells[i][j] = React.createRef();
      secondary[i][j] = false;
    }
  }

  const countNeighbours = (i, j)=>
  {
    let count = 0;
    
    if(cells[i - 1][j - 1].current.getactive()) count++;
    if(cells[i - 1][j].current.getactive()) count++;
    if(cells[i - 1][j + 1].current.getactive()) count++;
    if(cells[i][j - 1].current.getactive()) count++;
    if(cells[i][j + 1].current.getactive()) count++;
    if(cells[i + 1][j - 1].current.getactive()) count++;
    if(cells[i + 1][j].current.getactive()) count++;
    if(cells[i + 1][j + 1].current.getactive()) count++;
    return count;
  }

  const nextGeneration = ()=>
  {

    for(let i = 1 ; i < n - 1 ; i++)
    {
      for(let j = 1 ; j < n - 1  ; j++)
      {
        let count = countNeighbours(i, j);
        if(cells[i][j].current.getactive())
        {
          if(count < 2) secondary[i][j] = false;
          else if(count > 3) secondary[i][j] = false;
          else secondary[i][j] = true;
        }
        else
        {
          if(count === 3) secondary[i][j] = true;
        }
      }
    }

    cells.forEach((row, i)=>row.forEach((cell, j)=>
    {
      if(cell.current.getactive() !== secondary[i][j])
        cell.current.setactive(secondary[i][j]);
    }));
  }

  const animator = new Animator(2, nextGeneration);
  
  return (
    <React.Fragment>
      <div className={props.className + " board"}>
        <div className="grid" style = {{gridTemplateColumns: `repeat(${n}, 1fr)`}}>
            {
              cells.map((item, i)=>
                item.map((subItem, j)=>
                  <Cell ref={subItem}/>
                  )
              )
            }
        </div>
        <div className="controller">
          <button onClick={()=>animator.start()}>Start</button>
          <button onClick={()=>animator.stop()}>Stop</button>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Game;


