import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import Myplaces from '../components/Myplaces'
import { Col, Row } from 'react-bootstrap'
import Footer from '../components/Footer'

function Admin() {
  const [username, setusername] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("existinguser")) {
      const existinguserdata = JSON.parse(sessionStorage.getItem("existinguser"));
      setusername(existinguserdata.username);
    }
  }, [])
  return (
    <>
      <Header admin={"admin"} />
      <Row className=' me-3 mt-5' style={{ marginBottom: "10vh" }}>
        <Col md={8} lg={8} >
          <h2 className='mt-5 ms-5 mb-5 '><img src="https://cdn.dribbble.com/users/2624315/screenshots/10136821/media/40d181aa5d3d372d9d075c3e7bb2a10e.gif" alt="" height={"100px"} className='rounded' /> Welcome To Travel Diaries  <span style={{  fontWeight: "bolder" }} className='text-info'> {username}</span></h2>
        </Col>
        <Col md={4} lg={4}>
          <Profile />
        </Col>
      </Row>
      <Myplaces />
      <Footer />
    </>
  )
}

export default Admin