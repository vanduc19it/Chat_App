import { Avatar, Button, Col, Collapse, Row, Typography } from 'antd'
import React, { useContext } from 'react'
import {UsergroupAddOutlined} from '@ant-design/icons';
import { auth } from '../../firebase/config'
import { AuthContext } from '../../context/AuthProvider';
export default function SideBar() {
    const { Panel } = Collapse;

    const {user} = useContext(AuthContext)
    console.log(user.photoURL)
  return (
    <>
        <Row style={{padding:"20px 20px", backgroundColor:"#ccc", height:'10vh'}}>
            <Col span={18} style={{display: 'flex'}}>
                <Avatar style={{marginRight: '10px'}} size={40} src={`${user.photoURL}`}>{user.photoURL ? "" : user.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography style={{marginTop: '4px', fontSize: '16px'}} >{user.displayName}</Typography>
            </Col>
            <Col span={6}>
                <Button ghost onClick={()=> auth.signOut()}>Logout</Button>
            </Col>
        </Row>
        <Row style={{padding:"20px 20px", backgroundColor:"green", height:'90vh', display: 'flex', justifyContent: 'space-between'}}>
            
            <Collapse ghost defaultActiveKey={['1']} style={{width:"60%"}}>
                <Panel header="List Rooms" key="1" style={{color: 'white', flex: '1', fontWeight:'bold', backgroundColor:'white'}}>
                    <Typography.Link style={{display: 'flex'}}>1</Typography.Link>
                    <Typography.Link style={{display: 'flex'}}>1</Typography.Link>
                    <Typography.Link style={{display: 'flex'}}>1</Typography.Link>
                    
                </Panel> 
               
            </Collapse>
            <Button ghost icon={<UsergroupAddOutlined /> } style={{marginTop:"10px"}}>Add room</Button>
        </Row>
    </>
  )
}
