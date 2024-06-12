import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { base_url } from '../services/baseurl';
import { editplaceAPI } from '../services/allAPI';
// import { editUserProjectAPI} from '../services/allApi';
// import { editProjectResponseContext } from '../context/ContextShare';

function Editplace({ places }) {

  //   const {editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const [show, setShow] = useState(false);
  const [preview, setpreview] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [placeDetails, setplaceDetails] = useState({
    id: places._id,
    place: places.place,
    attractions: places.attractions,
    map: places.map,
    description: places.description,
    name: places.name,
    placeimg: ""
  })

  const handlereset = () => {
    setplaceDetails({
      id: places._id,
      place: places.place,
      attractions: places.attractions,
      map: places.map,
      description: places.description,
      name: places.name,
      placeimg: ""
    })
    setpreview("")
  }
  const handleupdate = async (e) => {
    e.preventDefault()
    const { place, attractions, map, description, placeimg, id } = placeDetails;
    if (!place || !attractions || !map || !description || !id) {
      alert("Please fiil the form completely")
    }
    else {
      const reqbody = new FormData();
      reqbody.append('place', place);
      reqbody.append('attractions', attractions);
      reqbody.append('map', map);
      reqbody.append('description', description);
      preview ? reqbody.append("placeimg", placeimg) :
        reqbody.append("placeimg", places.placeimg)
      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqheader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editplaceAPI(id, reqbody, reqheader);
        console.log(result)
        if (result.status === 200) {
          // setEditProjectResponse(result)
          alert("Place details updated successfully");
          handleClose()
        }
        else {
          alert(result.response.data)
        }
      }
      else {
        const reqheader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editplaceAPI(id, reqbody, reqheader)
        if (result.status === 200) {
          //   setEditProjectResponse(result)
          alert("Place updated successfully");
          handleClose()
        }
        else {
          alert(result.response.data)
        }
      }
    }
  }
  useEffect(() => {
    if (placeDetails.placeimg) {
      setpreview(URL.createObjectURL(placeDetails.placeimg))
    }
  }, [placeDetails.placeimg])

  return (
    <>
      <button className='btn ' onClick={handleShow}><i class="fa-solid fa-pen-to-square text-info"></i></button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Update Place Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-info'>
          <div className='row'>
            <div className='col-lg-6'>
              <label htmlFor="placeImageUpload">
                <input
                  type="file"
                  style={{ display: "none", cursor: "pointer" }}
                  id='placeImageUpload'
                  onChange={(e) => setplaceDetails({ ...placeDetails, placeimg: e.target.files[0] })}
                />
                <img src={preview ? preview : `${base_url}/uploads/${places.placeimg}`} height="150px" className='mt-2' alt="" width={"100%"} />
              </label>
            </div>
            <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column '>
              <div className='w-95 mt-2 mb-2'>
                <input type="text" className='form-control' placeholder='Place name'
                  value={placeDetails.place}
                  onChange={(e) => setplaceDetails({ ...placeDetails, place: e.target.value })} />
              </div>
              <div className='mt-2 mt-2'>
                <input type="text" className='form-control' placeholder='Attractions'
                  value={placeDetails.attractions}
                  onChange={(e) => setplaceDetails({ ...placeDetails, attractions: e.target.value })}
                />
              </div>
              <div className='mt-2 mt-2'>
                <input type="text" className='form-control' placeholder='Map link'
                  value={placeDetails.map}
                  onChange={(e) => setplaceDetails({ ...placeDetails, map: e.target.value })} />
              </div>
              <div className='mt-2 w-95'>
                <textarea name="" id="" className='form-control' placeholder='Share Youre Experinces'
                  value={placeDetails.description}
                  onChange={(e) => setplaceDetails({ ...placeDetails, description: e.target.value })}
                ></textarea>
              </div>

            </div>


          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlereset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleupdate}>
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Editplace