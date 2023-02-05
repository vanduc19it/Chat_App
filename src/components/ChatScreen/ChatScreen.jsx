import { Col, Row } from 'antd'
import React from 'react'
import ChatRoom from './ChatRoom'
import SideBar from './SideBar'

function ChatScreen() {
  return (
    <Row>
      <Col span={6}><SideBar/></Col>
      <Col span={18}><ChatRoom/></Col>
    </Row>
  )
}

export default ChatScreen