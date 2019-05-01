import React from 'react'
import axios from 'axios'
import { Card, Avatar, Button } from 'antd';

const { Meta } = Card;


class TodoDetailView extends React.Component {

    state = {
        todo: {}
    };
    componentDidMount() {
        const todoID = this.props.match.params.todoID;
        axios.get(`http://127.0.0.1:8000/todo/${todoID}/`)
            .then(res => {
                this.setState({
                    todo: res.data

                });
            });

    };
    handleDelete = (e) => {
        const todoID = this.props.match.params.todoID;

        axios.delete(`http://127.0.0.1:8000/todo/${todoID}/`)
            .then(res => {
                this.setState({
                    todo: ''
                })
            })
        this.props.history.push('/todo/')
        this.forceUpdate()
    }
    handleFinish = (e) => {
        e.preventDefault();

        const todoID = this.props.match.params.todoID;
        let tmp = this.state.todo
        tmp.in_progress = false
        tmp.is_finished = true
        this.setState({
            todo: tmp
        })

        axios.put(`http://127.0.0.1:8000/todo/${todoID}/`,
            this.state.todo
        )
    }
    handleProgress = (e) => {
        e.preventDefault();
        const todoID = this.props.match.params.todoID;
        let tmp = this.state.todo
        tmp.in_progress = !tmp.in_progress
        tmp.is_finished = false
        this.setState({
            todo: tmp
        })

        axios.put(`http://127.0.0.1:8000/todo/${todoID}/`,
            this.state.todo
        )
    }

    render() {
        console.log(this.state.todo)

        return (


            <Card
                style={{ width: '99%' }}
            >
                <Meta
                    avatar={<Avatar src="" />}
                    title={this.state.todo.title}
                    description={this.state.todo.is_finished ? "State: Done." : this.state.todo.in_progress ? "State: In progress." : "State: Todo."}

                />
                <p style={{ marginTop: '10px', marginLeft: '48px' }}>Due: {this.state.todo.due_date}</p>
                <form onSubmit={this.handleFinish} style={{ display: 'inline-block', marginLeft: '10px' }}>
                    <Button htmlType='submit'>Done</Button>
                </form>
                <form onSubmit={this.handleProgress} style={{ display: 'inline-block', marginLeft: '10px' }}>

                    <Button htmlType='submit' >In Progress</Button>
                </form>
                <form onSubmit={this.handleDelete} style={{ display: 'inline-block', marginLeft: '10px' }}>

                    <Button type='danger' htmlType='submit' >Delete</Button>
                </form>

            </Card>

        )
    }
}

export default TodoDetailView