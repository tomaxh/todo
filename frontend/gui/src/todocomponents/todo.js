import React from 'react'
import { List, Avatar, Button, Alert, Badge } from 'antd';
import axios from 'axios'
import TodoForm from '../todocomponents/form'

class Todo extends React.Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
        this.state = {
            todos: []
        }
    }
    componentWillMount() {
        axios.get('http://127.0.0.1:8000/todo/')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
    }


    handleDelete = (e, todo) => {
        axios.delete(`http://127.0.0.1:8000/todo/${todo.id}/`)
            .then(res => {
                if (res.status === 204) {
                    this.setState({
                        todos: [...this.state.todos.filter(t => t.id !== todo.id)]
                    })
                }
            })

    }

    handleComplete = (e, todo) => {
        let tmp = this.state.todos
        tmp.filter(t => t.id === todo.id)[0].is_finished = !tmp.filter(t => t.id === todo.id)[0].is_finished
        axios.put(`http://127.0.0.1:8000/todo/${todo.id}/`,
            tmp.filter(t => t.id === todo.id)[0])
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        todos: tmp
                    })
                }
            })

    }
    handleProgress = (e, todo) => {
        let tmp = this.state.todos
        tmp.filter(t => t.id === todo.id)[0].in_progress = !tmp.filter(t => t.id === todo.id)[0].in_progress
        tmp.filter(t => t.id === todo.id)[0].is_finished = false

        axios.put(`http://127.0.0.1:8000/todo/${todo.id}/`,
            tmp.filter(t => t.id === todo.id)[0])
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        todos: tmp
                    })
                }
            })
    }

    render() {
        const btnStyle = {
            marginLeft: '10px'
        }
        const avatarStyleDone = {
            backgroundColor: 'Green'
        }

        const avatarStyleProgress = {
            backgroundColor: 'orange'
        }
        const hiddenStyle = {
            overflow: 'Hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '80%',


        }
        return (
            <React.Fragment>
                <TodoForm todos={this.state.todos} />
                <List

                    itemLayout="horizontal"
                    dataSource={this.state.todos}
                    renderItem={item => (
                        <List.Item >
                            <List.Item.Meta
                                avatar={item.is_finished ? <Avatar style={avatarStyleDone} icon='calendar' /> : item.in_progress ? <Avatar icon='loading' style={avatarStyleProgress} /> : <Badge dot><Avatar icon="calendar" /></Badge>}
                                title={<p style={hiddenStyle} ><a style={{ textDecoration: 'none', color: 'black' }} href={`/todo/${item.id}`}>{item.title}</a></p>}
                                description={item.in_progress ? "State: In Progress" : "State: Todo"}
                            />
                            {new Date(item.due_date) > new Date() ? <Alert message={'Due: ' + item.due_date} /> : <Alert message={'Past Due: ' + item.due_date} type='error' />}
                            <Button type="Default" icon="check" style={btnStyle} onClick={(e) => this.handleComplete(e, item)}></Button>
                            <Button type="Default" icon="loading" style={btnStyle} onClick={(e) => this.handleProgress(e, item)}></Button>

                            <Button type="danger" icon="delete" style={btnStyle} onClick={(e) => this.handleDelete(e, item)}></Button>

                        </List.Item>
                    )}
                />
            </React.Fragment>

        )
    }
}


export default Todo