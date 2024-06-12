import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addplaceAPI } from '../services/allAPI';


function Addplace() {
    const [username, setusername] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem("existinguser")) {
            const existinguserdata = JSON.parse(sessionStorage.getItem("existinguser"));
            setusername(existinguserdata.username);
        }
    }, [])
    const [preview, setPreview] = useState("")
    const [token, settoken] = useState("")
    const [placeDetails, setplaceDetails] = useState({
        place: "",
        attractions: "",
        map: "",
        description: "",
        placeimg: "",
        name: "",
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdd = async (e) => {
        e.preventDefault();
        const { place, attractions, map, description, placeimg } = placeDetails;
        if (!place || !attractions || !map || !description || !placeimg) {
            alert("Please fill the form completely")
        }
        else {
            // 
            // 
            const reqbody = new FormData();
            reqbody.append('place', place)
            reqbody.append('attractions', attractions)
            reqbody.append('map', map)
            reqbody.append('description', description)
            reqbody.append('placeimg', placeimg)
            reqbody.append('name',username)
            const reqheader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result = await addplaceAPI(reqbody, reqheader)
            if (result.status === 200) {
                alert("Travel Experience added successfully");
                handlecloseclear();
                handleClose();
            }
            else {
                alert(result.response.data)
            }
        }
        console.log(placeDetails);
    }
    useEffect(() => {
        if (placeDetails.placeimg) {
            setPreview(URL.createObjectURL(placeDetails.placeimg))
        }
    }, [placeDetails.placeimg])
    useEffect(() => {
        settoken(sessionStorage.getItem("token"))
    }, [])
    const handlecloseclear = () => {
        setplaceDetails(
            {
                place: "",
                attractions: "",
                map: "",
                description: "",
                placeimg: "",
            }
        )
        setPreview("")
    }
    return (
        <>
            <div className='mb-5'>
                <Button variant='success' onClick={handleShow}>Add Youre Travel Experience's</Button>


                <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Add <span style={{ color: "aqua" }}>Travel </span><span style={{ color: "orange" }}>Experience's</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-info'>
                        <div className='row'>
                            <div className="col-lg-6">
                                <label htmlFor="projectimgupload">
                                    <img src={preview ? preview : 'https://cdni.iconscout.com/illustration/premium/thumb/professional-wildlife-photographer-at-desert-6576358-5587061.png?f=webp'} height="300px" className='ms-5 mt-5 me-5' />
                                    <p className='text-light text-center'>Upload Place Photo</p>
                                    <input type="file" id='projectimgupload' style={{ display: 'none' }}
                                        onChange={((e) => setplaceDetails({ ...placeDetails, placeimg: e.target.files[0] }))} />
                                </label>
                            </div>
                            <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column' style={{opacity:"0.8"}}>
                                <div className='w-100 mt-2 '>
                                    <input value={placeDetails.place} type="text" className='form-control w-100 border border-success' placeholder='Place name'
                                        onChange={((e) => setplaceDetails({ ...placeDetails, place: e.target.value }))} />
                                </div>
                                <div className='w-100 mt-4 '>
                                    <input value={placeDetails.attractions} type="text" className='form-control w-100 border border-success' placeholder='Attractions of the place'
                                        onChange={((e) => setplaceDetails({ ...placeDetails, attractions: e.target.value }))} />
                                </div>
                                <div className='w-100 mt-4 '>
                                    <input value={placeDetails.map} type="text" className='form-control w-100 border border-success' placeholder='Map link'
                                        onChange={((e) => setplaceDetails({ ...placeDetails, map: e.target.value }))} />
                                </div>
                                <div className='w-100 mt-4 '>
                                    <textarea value={placeDetails.description} className='form-control border border-success' placeholder="Share you're experience"
                                        onChange={((e) => setplaceDetails({ ...placeDetails, description: e.target.value }))}></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlecloseclear}>
                            Clear Fields
                        </Button>
                        <Button variant="warning" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAdd}>
                            Add Place
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Addplace