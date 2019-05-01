import { Form, Input, Button, DatePicker } from 'antd';
import React from 'react'
import axios from 'axios'


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos
        }
    }
    handleFormSubmit = (e) => {
        const title = e.target.elements.title.value;
        const due_date = e.target.elements[1].value;

        axios.post('http://127.0.0.1:8000/todo/', {
            title: title,
            due_date: due_date
        })
            .then(res => console.log(res))
    }
    render() {
        return (
            <div>
                <Form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <Form.Item style={{ display: 'inline-block', width: '40%', marginBottom: '0' }}>
                        <Input name='title' placeholder='Create a new Todo.' />
                    </Form.Item>

                    <Form.Item name='duedate' style={{ display: 'inline-block', marginLeft: '15px', marginRight: '15px', marginBottom: '0' }}>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item style={{ display: 'inline-block', width: '10%', marginTop: '0', marginBottom: '0' }}>
                        <Button type='primary' htmlType='submit'>Create</Button>
                    </Form.Item>

                </Form>
            </div >
        );
    }
}

export default TodoForm