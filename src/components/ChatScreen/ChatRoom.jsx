import { UserAddOutlined, SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Form, Input, Row, Tooltip, Typography } from 'antd'
import React from 'react'
import Message from './Message'

export default function ChatRoom() {
  return (
   <>
    <Row style={{borderBottom:"1px solid black" , height: '10vh', backgroundColor:'blue', padding:'20px 20px'}}>
        <Col span={18}>
            <Typography>ten phng</Typography>
            <Typography>mo ta</Typography>
        </Col>
        <Col span={3}>
            <Button ghost className="add-people"icon={<UserAddOutlined />}>Invite</Button>
        </Col>
        <Col span={3}>
            <Avatar.Group size="small" maxCount={2}>
                <Tooltip title="Ant User" placement="top">
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Tooltip>
                <Tooltip title="Ant User" placement="top">
                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                </Tooltip>
                <Tooltip title="Ant User" placement="top">
                    <Avatar style={{ backgroundColor: '#87d068' }}  />
                </Tooltip>
                <Tooltip title="Ant User" placement="top">
                    <Avatar style={{ backgroundColor: '#1890ff' }}  />
                </Tooltip>
            </Avatar.Group>
            <Divider />
  
        </Col>
    </Row>
    <Row style={{borderBottom:"1px solid black" , height: '78vh', backgroundColor:'yellow', padding:'20px 20px', display: 'flex', flexDirection:"column", justifyContent: 'flex-end'}}>

       
            <Message text="hallo" photoURL='abc' name="duc van" createAt="12/11/2022"/>
       
       
            <Message text="hallo" photoURL='abc' name="duc van" createAt="12/11/2022" />
      
       
            <Message text="hallo" photoURL='abc' name="duc van" createAt="12/11/2022" />
        
        
    </Row>
    <Row style={{borderBottom:"1px solid black" , height: '12vh', backgroundColor:'purple', padding:'20px 20px'}}>
        <Form style={{display:'flex'}}>
            <Form.Item>
                <Input size="large" style={{width:'65vw', marginRight:"10px"}}/>
            </Form.Item>
            <Button size="large" icon={<SendOutlined />}>Send</Button>
        </Form>
    </Row>
    </>
  )
}
