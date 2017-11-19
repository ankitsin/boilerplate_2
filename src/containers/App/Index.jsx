import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Index';
import MainSection from '../../components/MainSection/Index';
import * as todoActionCreator from '../../actions/todoActionCreator';
import style from './style.less';

const { array, func, object } = React.PropTypes;
class App extends Component {
  componentDidMount() {
    this.props.addTodo();
  }
  render() {
    const { todos, actions } = this.props;
    return (
      <div className={style.normal}>
        <Header addTodo={todoActionCreator.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}
App.propTypes = {
  todos: array,
  actions: object,
  addTodo: func,
};
App.defaultProps = {
  todos: {},
  actions: {},
  addTodo: () => {},
};
function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: action => dispatch(todoActionCreator.addTodo(action)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
