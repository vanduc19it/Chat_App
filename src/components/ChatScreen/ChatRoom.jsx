import { UserAddOutlined, SendOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Col, Divider, Form, Input, Modal, Row, Select, Spin, Tooltip, Typography } from 'antd'
import React, { useContext,  useEffect,  useMemo,  useRef,  useState } from 'react'
import Message from './Message'
import { AppContext } from '../../context/AppProvider'
import { debounce } from 'lodash'
import { db } from '../../firebase/config'
import { addDoc, collection, doc, getDocs, limit,  orderBy, updateDoc, where } from 'firebase/firestore'
import { addDocument } from '../../firebase/services'
import { AuthContext } from '../../context/AuthProvider'
import useFireStore from '../../Hooks/useFireStore'
import styled from 'styled-components'


function DebounceSelect({
    fetchOptions,
    debounceTimeout = 300,
    curMembers,
    ...props
  }) {
    // Search: duc
  
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
  
    const debounceFetcher = React.useMemo(() => {
      const loadOptions = (value) => {
        setOptions([]);
        setFetching(true);
  
        fetchOptions(value, curMembers).then((newOptions) => {
          setOptions(newOptions);
          setFetching(false);
        });
      };
  
      return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);
  
    React.useEffect(() => {
      return () => {
        // clear when unmount
        setOptions([]);
      };
    }, []);
  
    console.log('fetching',fetching)
    console.log("option",options)
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size='small' /> : null}
        {...props}
      >
        {options.map((opt) => (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar size='small' src={opt.photoURL}>
              {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </Select.Option>
        ))}
      </Select>
    );
  }

  //get user tu seacrh
  async function fetchUserList(search, curMembers) {

    const q = await getDocs(collection(db, "users"), where('keywords', 'array-contains', search?.toLowerCase()), orderBy('displayName'),limit(20))
    .then((snapshot) => {
            return snapshot.docs
              .map((doc) => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL,
              }))
              .filter((opt) => !curMembers.includes(opt.value));
          });

    return q;

  }

export default function ChatRoom() {
    
    const {selectedRoom, members, selectedRoomId} = useContext(AppContext);

    const [isModalInviteOpen, setIsModalInviteOpen] = useState(false);
    const [value, setValue] = useState([]);

    const [form] = Form.useForm();
    const handleInviteFriend = () => {
        setIsModalInviteOpen(true);
    }

    const handleOk = () => {
        // reset form value
    form.resetFields();
    setValue([]);

    // update members in current room
    const roomRef = doc(collection(db, 'rooms'),(selectedRoomId))
    
    
    console.log(roomRef)

    updateDoc(roomRef, {
        members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
  
      setIsModalInviteOpen(false);

    }
    const handleCancel = () => {
         // reset form value
    form.resetFields();
    setValue([]);

    setIsModalInviteOpen(false);
    }   
   console.log('value',value)


   const [inputValue, setInputValue] = useState('');
    const {user} = useContext(AuthContext);
    

   const handleInputChange = (e) => {
        setInputValue(e.target.value);
   }
   const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectedRoom.id,
            displayName: user.displayName,
        })

        form.resetFields(['message']);

   }   

   const messagesCondition = useMemo(()=> {
    return {
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id,
    }
    },[selectedRoom.id])

    const messages = useFireStore('messages', messagesCondition)
  

    const MessageListStyled = styled.div`
        max-height: 100%;
        overflow-y: auto;
    `;
    const messageListRef = useRef(null);
    useEffect(() => {
        // scroll to bottom after message changed
        if (messageListRef?.current) {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight + 50;
        }
      }, [messages]);
    
      console.log(messages)
      const sortMessages = messages.sort((a,b)=>new Date(a.createdAt?.seconds) - new Date(b.createdAt?.seconds));
      console.log(sortMessages)
  return (
   <>
    {/* <InviteFriendModal/> */}
    <Modal title="Invite Friend" open={isModalInviteOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout='vertical'>
            <DebounceSelect
            mode='multiple'
            name='search-user'
            label='Tên các thành viên'
            value={value}
            placeholder='Input name'
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom.members}
          />
            </Form>
        </Modal>
         {/* <InviteFriendModal/> */}
    {
        selectedRoom.id ? (
            <>
             <Row style={{borderBottom:"1px solid #ddd" , height: '10vh', backgroundColor:'#00ecff', padding:'20px 20px'}}>
        <Col span={18}>
            <Typography style={{fontSize: '16px', fontWeight: 'bold'}}>{selectedRoom?.name}</Typography>
            <Typography>{selectedRoom?.description}</Typography>
        </Col>
        <Col span={3}>
            <Button ghost className="add-people"icon={<UserAddOutlined />} onClick={handleInviteFriend}>Invite</Button>
        </Col>
        <Col span={3}>
            <Avatar.Group size={30} maxCount={2}>
                {members.map((member) =>
                <Tooltip title={member.displayName} placement="top" key={member.id}>
                    <Avatar src={member.photoURL} >{member.photoURL ? '' : member.displayName.charAt(0)?.toUpperCase()}
                    </Avatar>
                </Tooltip>)}
                
               
            </Avatar.Group>
            <Divider />
  
        </Col>
    </Row>
    <Row style={{borderBottom:"1px solid #ddd" , height: '78vh', backgroundColor:'white', padding:'20px 20px', display: 'flex', flexDirection:"column", justifyContent: 'flex-end'}}>
    <MessageListStyled >
        {
            messages.map((message) =>
                <Message 
                
                    key={message.id}
                    text={message.text} 
                    photoURL={message.photoURL} 
                    name={message.displayName} 
                    createdAt={message.createdAt}
                />
            )
        }
          </MessageListStyled>  
    </Row>

    <Row style={{borderBottom:"1px solid #ddd" , height: '12vh', backgroundColor:'#00ecff', padding:'20px 20px'}}>
        <Form style={{display:'flex'}} form={form}>
            <Form.Item name='message'>
                <Input 
                    size="large" 
                    style={{width:'65vw', marginRight:"10px"}} 
                    onChange={handleInputChange}
                    onPressEnter={handleOnSubmit}
                    placeholder='Type your message'
                    autoComplete='off'
                />
            </Form.Item>
            <Button size="large" icon={<SendOutlined />} onClick={handleOnSubmit} type="primary">Send</Button>
        </Form>
    </Row>
            </>
        )
        :
        <Alert message="Click any room to chat with your friend !" type="info" showIcon style={{margin: '5px'}} />
    }
   
    </>
  )
}