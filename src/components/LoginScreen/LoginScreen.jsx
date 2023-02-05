import { Row, Col, Button } from 'antd'
import React, { useContext } from 'react'
import { auth } from '../../firebase/config'
import { FacebookAuthProvider,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  //handle login by facebook
  const handleFbLogin = async () => {
    const FbProvider = new FacebookAuthProvider();
    const res = await signInWithPopup(auth, FbProvider);
    console.log(res.user)
  }
  const handleGgLogin = async () => {
    const GgProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, GgProvider);
    console.log(res.user)
  }
  if(user?.uid) {
    navigate('/');
    return;
  }
  return (

      <div className="container" >

      
      <h3 style={{paddingTop:'10px'}}>Login to Chat App</h3>
      <Row justify='center'>
        <Col lg={12}>
          <Button style={{width:'100%', marginBottom:'10px'}} onClick={handleGgLogin}>Login with Google</Button>
        </Col>
      </Row>
      <Row justify='center'>
        <Col lg={12}>
          <Button type="primary" style={{width:'100%', marginBottom:'10px'}} onClick={handleFbLogin}>Login with Facebook</Button>
        </Col>
      </Row>
      </div>
      
  )
}

export default LoginScreen