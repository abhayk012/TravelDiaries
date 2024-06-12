import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Placecard from '../components/Placecard'
import { allplaceAPI } from '../services/allAPI'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function Home() {
    const [searchkey, setsearchkey] = useState("")
    const [allplace, setallplace] = useState([])
    const getallplace = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqheader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await allplaceAPI(searchkey, reqheader)
            setallplace(result.data);
        }
    }
    useEffect(() => {
        getallplace();
    }, [searchkey])
    return (
        <>
            <Header home={"home"} />
            <div className=''>
            <div className='d-flex justify-content-center flex-column align-items-center mt-2 '>
                <h1 className='text-center mt-3'>Welcome to <span style={{ color: "aqua", fontWeight: "bold" }}>Travel </span>Diaries</h1>
                <div className='mt-3 w-25 d-flex '>
                    <input type="text" className='form-control text-center shadow' 
                    onChange={(e)=>setsearchkey(e.target.value)} placeholder='search for the place you want' />
                    <i class='fa-solid fa-magnifying-glass fa-rotate-90 mt-1' style={{ marginLeft: "-45px" }}></i>
                </div>
            </div>
            <Row className='ms-5 mt-5 mb-5'>
                {
                    allplace.length > 0 ?
                        allplace.map((item) => (
                            <Col className='px-5 py-3 mt-3' md={6} lg={4} sm={12}>
                                <Placecard place={item} />
                            </Col>
                        )) :
                        <div className='text-center'>
                           <Link to='/admin'><img height={"400px"} src="https://media2.giphy.com/media/l0HlCV8U15grrbVaU/200.gif?cid=790b7611bplcut2rtre1iumg1d22jje6i5xlj183qarflmwh&ep=v1_gifs_search&rid=200.gif&ct=g"  alt="" /></Link> 
                        </div>
                }

            </Row>
            </div>
<Footer/>
        </>
    )
}

export default Home