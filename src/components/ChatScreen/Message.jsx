import { Avatar, Card, Tag, Typography } from 'antd'
import { formatRelative } from 'date-fns';
import React from 'react'


export default function Message({text, photoURL, name, createdAt}) {
  function formatDate(seconds) {
    console.log(seconds)
    let formattedDate = '';
  
    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
  
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
  
    return formattedDate;
  }
  return (
    <div style={{display: "flex", padding: '12px'}}>
         <div>
            <Avatar src={photoURL}> {photoURL ? '' : name?.charAt(0)?.toUpperCase()}</Avatar>
            <Typography.Text style={{fontWeight: 'bold', marginRight: '10px', padding: '5px'}}>{name}</Typography.Text>
           
        </div>
        <div>
        <Tag color="cyan">
                <Typography.Text style={{marginTop:'-10px'}}>{text}</Typography.Text>
            </Tag>
            
        </div>
        <div style={{marginLeft: '4px'}}>
            <Typography.Text style={{color: '#7c9ecf', fontSize: '12px'}}>{formatDate(createdAt?.seconds)}</Typography.Text>
        </div>
    </div>
  )
}
