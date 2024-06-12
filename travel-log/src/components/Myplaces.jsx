import React, { useEffect, useState } from 'react'
import Addplace from './Addplace'
import { deletePlaceApi, userplaceAPI } from '../services/allAPI';
import Editplace from './Editplace';
import './mp.css'
import { Card, Col, Row } from 'react-bootstrap';
import { base_url } from '../services/baseurl';
import Placecard from './Placecard';

function Myplaces() {
  const [userplaces, setuserplaces] = useState([]);
  const getuserplaces = async () => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userplaceAPI(reqheader);
    setuserplaces(result.data)
  }
  useEffect(() => {
    getuserplaces()
  }, [])
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deletePlaceApi(id, reqheader)
    if (result.status === 200) {
      alert("Removed successfully");
      getuserplaces();
    }
  }
  return (
    <>
      <div className="card shadow p-5 ms-3 me-3 mb-5 ">
        <div className='d-flex'>
          <h3 className=''>My Travel Experience</h3>
          <div className='ms-auto'>
            <Addplace />
          </div>
        </div>
        <Row>
          {
            userplaces.length > 0 ?
              userplaces.map((item) => (
                <Col className='px-5 py-3 mt-3' md={6} lg={4} sm={12}>
                  <Card style={{ width: '18rem', cursor: "pointer" }} className='shadow'>
                    <Card.Img
                      height={'300px'}
                      width={'100%'}
                      variant="top" src={`${base_url}/uploads/${item.placeimg}`} />
                    <Card.Body>
                      <Card.Title>{item.place}</Card.Title>
                      <Editplace places={item} />
                      <a href={item.map}><button className='btn '><i class='fa-solid fa-location-dot fa-xl text-primary'></i></button></a>
                      <button className='btn ' onClick={() => handleDelete(item._id)}><i class='fa-solid fa-trash fa-xl text-danger'></i></button>
                    </Card.Body>
                  </Card>
                </Col>
              )) :
              <p>Nothing adeed yet</p>
          }
        </Row>
      </div>
    </>
  )
}

export default Myplaces