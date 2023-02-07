import { Avatar, Button, Col, Collapse, Form, Input, Modal, Row, Typography } from 'antd'
import React, { useContext, useState} from 'react'
import {RightOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { auth } from '../../firebase/config'
import { AuthContext } from '../../context/AuthProvider';
import { AppContext } from '../../context/AppProvider';
import { addDocument } from '../../firebase/services';
import styled from 'styled-components';

export default function SideBar() {

    const { Panel } = Collapse;
    const {user} = useContext(AuthContext)
    const {rooms,selectedRoomId, setSectedRoomId } = useContext(AppContext)
    const [isModalAddRoomOpen, setIsModalAddRoomOpen] = useState(false);
    const [form] = Form.useForm();
    const handleAddRoom = () => {
        setIsModalAddRoomOpen(true);
    }

    const handleOk = () => {
        //add new room to firestore
        addDocument('rooms', {...form.getFieldValue(), members:[user.uid]})

        form.resetFields();
        setIsModalAddRoomOpen(false);

    }
    const handleCancel = () => {
        form.resetFields();
        setIsModalAddRoomOpen(false);
    }   

    
const PanelStyled = styled(Panel)`
&&& {
    .ant-collapse {
        width: 100%;
    }
  .ant-collapse-header,
  p {
    color: white;
  }
  .add-room {
    color: white;
    padding: 0;
  }
}
`;
  
  return (
    <>
        {/* <AddRoomModal/> */}
        <Modal title="Add Room" open={isModalAddRoomOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout='vertical'>
                <Form.Item label="Room Name" name= 'name'>
                    <Input placeholder='Input room name'/>
                </Form.Item>
                <Form.Item label="Room Description" name= 'description'>
                    <Input placeholder='Input room description'/>
                </Form.Item>
            </Form>
        </Modal>
         {/* <AddRoomModal/> */}
        <Row style={{padding:"20px 20px", backgroundColor:"#0091ff", height:'10vh', borderBottom:"1px solid #ddd"}}>
            <Col style={{display: 'flex'}} sm={24} md={14} lg={18}>
                <Row>
                    <Col sm={24} lg={8}>
                    <Avatar style={{marginRight: '30px',}} size={36} src={`${user.photoURL}`}>{user.photoURL ? "" : user.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                    </Col>
                    <Col lg={16}>
                    <Typography style={{marginTop: '4px', fontSize: '14px', fontWeight: 'bold', color:"#fff"}} >{user.displayName}</Typography>
                    </Col>
                </Row>
               
            </Col>
            <Col  sm={12} md={10} lg={6} >
                <Button  ghost onClick={()=> auth.signOut()}>Logout</Button>
            </Col>
        </Row>
        <Row style={{padding:"20px 5px", backgroundColor:"#0091ff", height:'90vh'}}>
   
                <Collapse ghost defaultActiveKey={['1']} style={{paddingTop: '20px', marginRight: '65px'}}>
                    <PanelStyled header="Group Chat" key="1" style={{color: 'white', flex: '1', fontWeight:'bold', fontSize: "15px"}}>
                        {
                            rooms.map((room) => 
                                <Row key={room.id} style={{padding:"5px 5px", display: 'flex', alignItems: 'center'}}>
                                    <RightOutlined style={{color: "#fff"}} /> 
                                    <Typography.Link style={{ paddingLeft: '5px', color: "white"}} onClick={()=> setSectedRoomId(room.id)}>{room.name}</Typography.Link>
                                </Row>
                            )
                        }
                        
                    </PanelStyled> 
                
                </Collapse>
            
                <Button style={{marginTop: '30px', }} ghost icon={<UsergroupAddOutlined /> } onClick={handleAddRoom}>Add room</Button>
            
            
        </Row>
    </>
  )
}
