import { Avatar, Typography } from 'antd'
import React from 'react'

export default function Message({text, name, createAt, photoURL}) {
  return (
    <div>
         <div>
            <Avatar src={photoURL}>A</Avatar>
            <Typography.Text>{name}</Typography.Text>
            <Typography.Text>{createAt}</Typography.Text>
        </div>
        <div>
            <Typography.Text>{text}</Typography.Text>
        </div>
    </div>
  )
}
