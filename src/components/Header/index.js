import React, { Component } from 'react'
import { Link } from 'react-router'
import img59 from '../../assets/59.png'
import img592 from '../../assets/592.png'
const {func}  = React.PropTypes
class Header extends Component {
  constructor(){
    super();
    this.handleSave = this.handleSave.bind(this)
  }
  handleSave(text) {
    if (text.length) {
      this.props.addTodo(text)
    }
  }
  render() {
    const style = {
      marginRight: "30px"
    }
    return (
      <header>
        <h1>
          <img src={img59} height="50"/>
          TODOS
          <img src={img592}/>
        </h1>
        <Link to="/" style={style}>home</Link>
        <Link to="/routetest" style={style}>routetest</Link>
      </header>
    )
  }
}
Header.propTypes = {
  addTodo: func
}
export default Header
