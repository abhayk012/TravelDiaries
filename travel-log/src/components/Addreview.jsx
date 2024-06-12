import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import { addreviewAPI, deletereviewApi, placeReviewAPI, userreviewAPI } from '../services/allAPI';
import Editreview from './Editreview';


function Addreview() {
    const [open, setOpen] = useState(false);
    const [username, setusername] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem("existinguser")) {
            const existinguserdata = JSON.parse(sessionStorage.getItem("existinguser"));
            setusername(existinguserdata.username);
        }
    }, [])
    const [token, settoken] = useState("")
    const [reviews, setreviews] = useState({
        name: "",
        review: ""
    })
    const handleclear = () => {
        setreviews({
            name: "",
            review: ""
        })
    }
    const handleAdd = async (e) => {
        e.preventDefault();
        const { review, name } = reviews;
        if (!review) {
            alert("Please fill the form completely")
        }
        else {
            // 
            // 
            const reqbody = new FormData();
            reqbody.append('review', review)
            reqbody.append('name', username)
            const reqheader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await addreviewAPI(reqbody, reqheader)
            if (result.status === 200) {
                alert("Youre review added successfully");
                handleclear()
                setOpen(false);
            }
            else {
                alert(result.response.data)
            }
        }
        console.log(review);
    }
    const [userreviews, setuserreviews] = useState([]);
    const getuserreviews = async () => {
        const token = sessionStorage.getItem("token")
        const reqheader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await userreviewAPI(reqheader);
        setuserreviews(result.data)
    }
    
    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqheader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deletereviewApi(id, reqheader)
        if (result.status === 200) {
            alert("Removed successfully");
            setuserreviews();
        }
    }
    useEffect(() => {
        getuserreviews()
    }, [])
    return (
        <>{
            userreviews.length > 0 ?
                userreviews.map((item) => (
                    <div>
                        <Editreview userreview={item} />
                        <button className='btn btn-light text-danger ms-5 mt-2' onClick={() => handleDelete(item._id)}><i className='fa-solid fa-trash'/> Delete</button>
                    </div>
                )) :
                <button className='btn btn-outline-success ms-3' style={{ fontWeight: "800" }} onClick={() => setOpen(!open)}>Add youre reviews</button>
        }
            <Collapse in={open}>
                <div className='my-2'>
                    <hr />
                    <div className='mt-3'>
                        <h6>Youre Review:  <div>
                            <input type="text" placeholder='Review' className='form-control mt-3'
                                onChange={((e) => setreviews({ ...reviews, review: e.target.value }))} />
                        </div></h6>
                        <hr/>
                        <button className='btn btn-outline-primary' onClick={handleAdd}>Add</button>
                    </div>
                </div>
            </Collapse>
        </>
    )
}

export default Addreview