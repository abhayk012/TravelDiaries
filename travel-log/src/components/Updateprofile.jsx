import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import { base_url } from '../services/baseurl';
import { updateprofileAPI } from '../services/allAPI';
// import { addProfieResponseContext } from '../context/ContextShare';

function Updateprofile({ profile }) {
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [preview, setpreview] = useState("")
    // const { addProfieResponse,setAddProfieResponse } = useContext(addProfieResponseContext)


    const [profileDetails, setprofileDetails] = useState({
        id: profile._id,
        profileimg: ""
    })


    const handlereset = () => {
        setprofileDetails({
            id: profile._id,
            profileimg: ""
        })
        setpreview("")
    }
    const handleupdate = async (e) => {
        e.preventDefault()
        const { profileimg, id } = profileDetails;
        if ( !id) {
            alert("Please fiil the form completely")
        }
        else {
            const reqbody = new FormData();
            preview ? reqbody.append("profileimg", profileimg) :
                reqbody.append("profileimg", profile.profileimg)
            const token = sessionStorage.getItem("token");
            if (preview) {
                const reqheader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateprofileAPI(id, reqbody, reqheader);
                console.log(result)
                if (result.status === 200) {
                    //   setEditProjectResponse(result)
                    alert("Project updated successfully");
                    // setAddProfieResponse(result)
                    handleClose()
                }
                else {
                    alert(result.response.data)
                }
            }
            else {
                const reqheader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateprofileAPI(id, reqbody, reqheader)
                if (result.status === 200) {
                    //   setEditProjectResponse(result)
                    alert("Project updated successfully");
                    // setAddProfieResponse(result)
                    handleClose()
                }
                else {
                    alert(result.response.data)
                }
            }
        }
    }
    useEffect(() => {
        if (profileDetails.profileimg) {
            setpreview(URL.createObjectURL(profileDetails.profileimg))
        }
    }, [profileDetails.profileimg])

    

    return (
        <>
            <button className='btn btn-success rounded w-30 mt-3 me-5' onClick={handleShow}>Update</button>

            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update/Remove Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="uploadProfileimg">
                        <input type="file" style={{ display: "none", cursor: "pointer" }} id='uploadProfileimg' onChange={(e) => setprofileDetails({ ...profileDetails, profileimg: e.target.files[0] })} />
                        <img src={preview ? preview : `${base_url}/uploads/${profile.profileimg}`} height="300px" className='ms-5' alt="" width={"100%"} />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleupdate} className='btn-success'>Update</Button>
                    <Button onClick={handlereset} className='btn-warning'>Reset</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Updateprofile