import React from 'react';
import { Link } from 'react-router-dom';
const { object } = React.PropTypes;
const RouteTest = props => (
  <div>
    <h1>router test
      {props.match.params.id}
    </h1>
    <Link to='/' style={{ marginRight: '30px' }}>home</Link>
    <Link to='/routetest'>routetest</Link>
  </div>
);
RouteTest.propTypes = {
  match: object,
};
RouteTest.defaultProps = {
  match: {},
};
export default RouteTest;
