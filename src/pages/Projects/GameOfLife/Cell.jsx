import React, { Component } from 'react'

export default class Cell extends Component {
  constructor(props)
  {
    super(props);
    this.state = { active : false};
  }

  setactive(data)
  {
    this.setState({ active: data });
  }
  getactive()
  {
    return this.state.active;
  }
  render() {
    return (
      <div className={this.state.active ? 'cell activeCell' : 'cell inactiveCell'} 
           onClick={()=> this.setState({ active: !this.state.active })}></div>
    )
  }
}
