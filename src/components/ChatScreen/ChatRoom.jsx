import { UserAddOutlined, SendOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Col, Divider, Form, Input, Modal, Row, Select, Spin, Tooltip, Typography } from 'antd'
import React, { useContext,  useState } from 'react'
import Message from './Message'
import { AppContext } from '../../context/AppProvider'
import { debounce } from 'lodash'
import { db } from '../../firebase/config'
import { collection, doc, getDocs, limit,  orderBy, updateDoc, where } from 'firebase/firestore'


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
             <Row style={{borderBottom:"1px solid black" , height: '10vh', backgroundColor:'blue', padding:'20px 20px'}}>
        <Col span={18}>
            <Typography>{selectedRoom?.name}</Typography>
            <Typography>{selectedRoom?.description}</Typography>
        </Col>
        <Col span={3}>
            <Button ghost className="add-people"icon={<UserAddOutlined />} onClick={handleInviteFriend}>Invite</Button>
        </Col>
        <Col span={3}>
            <Avatar.Group size="small" maxCount={2}>
                {members.map((member) =>
                <Tooltip title={member.displayName} placement="top" key={member.id}>
                    <Avatar src={member.photoURL} >{member.photoURL ? '' : member.displayName.charAt(0)?.toUpperCase()}
                    </Avatar>
                </Tooltip>)}
                
               
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
        :
        <Alert message="Click any room to chat with your friend !" type="info" showIcon style={{margin: '5px'}} />
    }
   
    </>
  )
}
