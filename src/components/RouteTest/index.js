import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class RouteTest extends Component {
  render() {
    return (
      <div>
        <h1>router test
           {this.props.match.params.id}
         </h1>
        <Link to="/" style={{marginRight:"30px"}}>home</Link>
        <Link to="/routetest">routetest</Link>
      </div>
    )
  }
}

export default RouteTest
