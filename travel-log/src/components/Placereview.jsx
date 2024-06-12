import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import { placeReviewAPI} from '../services/allAPI';

function Placereview() {
    const [open, setOpen] = useState(false);
    const [userreviews, setreviews] = useState([]);
    const getuserreviews = async () => {
        const token = sessionStorage.getItem("token")
        const reqheader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await placeReviewAPI(reqheader);
        setreviews(result.data)
    }
    useEffect(() => {
        getuserreviews()
    }, [])


    return (
        <>
            <button className='btn btn-light  ' style={{ fontWeight: "800" }} onClick={() => setOpen(!open)}>Reviews</button>
            <Collapse in={open}>
                <div className='my-2'>
                    <hr />
                    {
                        userreviews.length > 0 ?
                            userreviews.map((i) => (
                                <div className='mt-3 shadow'>
                                    <hr />
                                    <h6><span className='text-warning'>Review by: </span>{i.name} </h6>
                                    <h6><span className='text-warning'>Review:  </span>{i.review}</h6>
                                    <hr />
                                </div>
                            )):
                            <p></p>
                    }

                </div>
            </Collapse>
        </>
    )
}

export default Placereview