import React from 'react'
import { Route } from 'react-router-dom'
import TodoListView from './todocontainers/TodoListView'
import TodoDetailView from './todocontainers/TodoDetailView'
import About from './page/About'
const BaseRouter = () => (

    <div>
        <Route exact path='/' component={TodoListView} />
        <Route exact path='/todo' component={TodoListView} />
        <Route exact path='/todo/:todoID' component={TodoDetailView} />
        <Route exact path='/about' component={About} />



    </div>

)

export default BaseRouter