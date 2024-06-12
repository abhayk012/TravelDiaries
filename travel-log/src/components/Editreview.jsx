import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deletereviewApi, updatereviewAPI } from '../services/allAPI';

function Editreview({ userreview }) {
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    // const [preview, setpreview] = useState("")
    // const { addProfieResponse,setAddProfieResponse } = useContext(addProfieResponseContext)
    const [reviews, setreviews] = useState({
        id: userreview._id,
        name: userreview.name,
        review: userreview.review
    })


    const handlereset = () => {
        setreviews({
            id: userreview._id,
            name: userreview.name,
            review: userreview.review
        })
    }
    const handleupdate = async (e) => {
        e.preventDefault()
        const { name, review, id } = reviews;
        if (!id || !name || !review) {
            alert("Please fiil the form completely")
        }
        else {
            const reqbody = new FormData();
            reqbody.append('review', review);
            const token = sessionStorage.getItem("token");
            const reqheader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await updatereviewAPI(id, reqbody, reqheader)
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
    // const handleDelete = async (id) => {
    //     const token = sessionStorage.getItem("token")
    //     const reqheader = {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //     }
    //     const result = await deletereviewApi(id, reqheader)
    //     if (result.status === 200) {
    //         alert("Removed successfully");
    //         setreviews();
    //     }
    // }
    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqheader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await deletereviewApi(id,reqheader)
        if(result.status===200){
          alert("Removed successfully");
          setreviews();
        }
      }
    return (
        <>
            <button className='btn btn-outline-success rounded mt-3' onClick={handleShow}>Update/Remove Review</button>

            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update/Remove Review
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className='form-control' placeholder='Attractions'
                        value={reviews.review}
                        onChange={(e) => setreviews({ ...reviews, review: e.target.value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleupdate} className='btn-success'>Update</Button>
                    <Button onClick={handlereset} className='btn-warning'>Reset</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Editreview