import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../services/baseurl';

function Placecard({place}) {
  const navigate=useNavigate()
  const handleclick = () => {
    navigate("/placeview",
     { state: { place } });
  }
  if (!place) {
    return null; // or handle the case when place is null or undefined
  }
  return (
    <>
     

<Card style={{ width: '18rem' ,cursor:"pointer"}} onClick={()=>handleclick()} className='shadow'>
    <Card.Img
        height={'300px'}
        width={'100%'}
        variant="top" src={`${base_url}/uploads/${place.placeimg}`}/>
    <Card.Body>
        <Card.Title>{place.place}</Card.Title>
    </Card.Body>
</Card>


    </>
  )
}

export default Placecard