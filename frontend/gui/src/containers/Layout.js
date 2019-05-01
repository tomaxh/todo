import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
const { Content, Footer, Header } = Layout;


const customStyle = {

    background: '#fff',
    padding: 24,
    minHeight: 280,
}

const CustomLayout = (props) => {
    return (
        <Layout className="layout">
            <Header style={{ textAlign: 'center', color: '#fff', fontSize: '50px' }} > Todo App
          </Header>
            <Content style={{
                padding: '0 10px',

            }}>
                < Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to='/todo/'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to='/about/'>About</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div style={customStyle}>
                    {props.children}



                </div>
            </Content >
            <Footer style={{ textAlign: 'center' }}>
            </Footer>
        </Layout >

    )

}

export default CustomLayout