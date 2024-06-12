import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./header.css"
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

function Header({ home, admin, placeview }) {
  const ishome = home ? true : false;
  const isadmin = admin ? true : false;
  const isplaceview = placeview ? true : false;
  console.log("Home:", home);
  console.log("Admin:", admin);
  console.log("Placeview:", placeview);

  // const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
      <Navbar expand="lg" className='bg-info'>
        <Container className='ms-5' >
          <Navbar.Brand href="/home" style={{ fontWeight: "700" }}><img src="https://static.thenounproject.com/png/5773331-200.png" alt="loading" height={"45px"} />Travel Diaries</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                ishome &&
                <Nav.Link href="/admin" style={{ color: "white", fontWeight: "600" }}><i className='fa-solid fa-user' /> Admin</Nav.Link>
              }
              {
                isadmin &&
                <Nav.Link href="/home" style={{ color: "white", fontWeight: "600" }}><i className='fa-solid fa-home'></i> Home</Nav.Link>
              }
              {
                isplaceview &&
                <Nav.Link href="/home" style={{ color: "white", fontWeight: "600" }}><i className='fa-solid fa-home'></i> Home</Nav.Link>
              }
              <button className='btn btn-outline-light rounded logout' onClick={handleLogout}><i class="fa-solid fa-right-from-bracket fa-rotate-180"></i> Logout</button>
              <StripeCheckout
                billingAddress
                stripeKey="pk_test_51OysNmSGWTpUptTZBFbxSSabgsUSDmvfaEYijsIwkNcZSWam0puj2F2d4T8oCzd6eFWBB7onQvNHCyE21tKmHO7I00nbUjmQtu"
              >
                <button className='btn btn-warning ms-5'>For vip</button>
              </StripeCheckout>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header