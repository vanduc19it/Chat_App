import { Avatar, Button, Col, Collapse, Form, Input, Modal, Row, Typography } from 'antd'
import React, { useContext, useState} from 'react'
import {RightOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import { auth } from '../../firebase/config'
import { AuthContext } from '../../context/AuthProvider';
import { AppContext } from '../../context/AppProvider';
import { addDocument } from '../../firebase/services';

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
                <Panel header="List Rooms" key="1" style={{color: 'white', flex: '1', fontWeight:'bold'}}>
                    {
                        rooms.map((room) => 
                            <Row key={room.id} style={{padding:"5px 5px", display: 'flex', alignItems: 'center'}}>
                                <RightOutlined /> 
                                <Typography.Link style={{display: 'flex', paddingLeft: '5px'}} onClick={()=> setSectedRoomId(room.id)}>{room.name}</Typography.Link>
                            </Row>
                        )
                    }
                    
                </Panel> 
               
            </Collapse>
            <Button ghost icon={<UsergroupAddOutlined /> } style={{marginTop:"10px"}} onClick={handleAddRoom}>Add room</Button>
        </Row>
    </>
  )
}
