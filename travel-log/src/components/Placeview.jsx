import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Placereview from './Placereview'
import ListGroup from 'react-bootstrap/ListGroup';
import Header from './Header';
import Addreview from './Addreview';
import { base_url } from '../services/baseurl';
import { useLocation } from 'react-router-dom';

function Placeview() {
    const location = useLocation();
    const place = location.state.place;
    return (
        <>
            <div className='' style={{ height: "100vh" }}>
                <Header placeview={"placeview"} />
                <Row className='mt-5 mb-5'>
                    <Col md={1}></Col>
                    <Col md={4} lg={4} className=''>
                        <hr />
                        <img src={`${base_url}/uploads/${place.placeimg}`}
                            height={"250px"} alt="" className='rounded shadow' style={{ marginTop: "80px" }} />
                        <hr /> </Col>
                    <Col md={6} lg={6} className='ms-5 bg-info rounded'>
                        <hr />
                        <h2 className='text-center bg-dark text-info rounded'><span className='text-light me-2'>Place</span>Details</h2>
                        <hr />
                        <ListGroup className='shadow'>
                            <ListGroup.Item> <h4 className='text-center'>{place.place}</h4> </ListGroup.Item>
                            <ListGroup.Item>Experience shared by :<span className='ms-3'>{place.name}</span></ListGroup.Item>
                            <ListGroup.Item>Attractions :<span className='ms-3'>{place.attractions}</span></ListGroup.Item>
                            <ListGroup.Item>Travel Experience : <span className='ms-3'>{place.description}</span></ListGroup.Item>
                            <ListGroup.Item className='text-center p-3'>
                                <a href={place.map}><button className='btn btn-light '><i class='fa-solid fa-map-location-dot fa-xl text-success'></i></button></a>
                            </ListGroup.Item>
                            <ListGroup.Item className='text-center p-3'>
                            <Placereview />
                            <Addreview />
                        </ListGroup.Item>
                    </ListGroup>
                    <hr />
                </Col>
                <Col md={1} lg={1}></Col>
            </Row>

        </div >
        </>
    )
}

export default Placeview