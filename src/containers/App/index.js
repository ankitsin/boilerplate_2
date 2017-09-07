import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as todoActionCreator from '../../actions/todoActionCreator'
import style from './style.less'

class App extends Component {
  componentDidMount() {
    this.props.addTodo();
  }
  render() {
    const { todos, actions, children } = this.props
    return (
      <div className={style.normal}>
        <Header addTodo={todoActionCreator.addTodo} />
        <MainSection todos={todos} actions={actions} />
        {children}
      </div>
    )
  }
}
App.propTypes = {
  todos: PropTypes.array,
  actions: PropTypes.object,
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (action) => dispatch(todoActionCreator.addTodo(action))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
