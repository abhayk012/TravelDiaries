import React, { useEffect, useState } from 'react'
import { addprofileAPI, removeprofileAPI, userprofileAPI } from '../services/allAPI'
import { base_url } from '../services/baseurl'
import Updateprofile from './Updateprofile'


function Profile() {
  const [open, setopen] = useState(false)
  const [preview, setPreview] = useState("")
  const [token, settoken] = useState("")
  const [profileDetails, setprofileDetails] = useState({
    linkedin: "",
    github: "",
    profileimg: null
  })

  const handleAdd = async (e) => {
    e.preventDefault();
    const { profileimg } = profileDetails;
    if ( !profileimg) {
      alert("Please fill the form completely")
    }
    else {
      // 
      // 
      const reqbody = new FormData();
      reqbody.append('profileimg', profileimg)
      const reqheader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await addprofileAPI(reqbody, reqheader)
      if (result.status === 200) {
        alert("Profile added successfully");
        // setAddProfieResponse(result);
      }
      else {
        alert(result.response.data)
      }
    }
    console.log(profileDetails);
  }
  useEffect(() => {
    settoken(sessionStorage.getItem("token"))
  }, [])
  useEffect(() => {
    if (profileDetails.profileimg) {
      setPreview(URL.createObjectURL(profileDetails.profileimg))
    }
  }, [profileDetails.profileimg])

  const [userprofile, setuserprofile] = useState([])
  const getuserprofile = async () => {

    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userprofileAPI(reqheader)
    setuserprofile(result.data);

  }
  const handleremove = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await removeprofileAPI(id, reqheader)
    if (result.status === 200) {
      alert("Profile deleted successfully");
      setprofileDetails();
    }
  }

  useEffect(() => {
    getuserprofile();
  }, [])
  return (
    <>
      <div className='card shadow p-4'>
        <div className='  text-center'>
          <h2>Profile</h2>
          {/* <button className='btn btn-outline-info'>
          </button> */}
        </div>

        <div className='text-center'>
          {
            userprofile.length > 0 ?
              userprofile.map((item) => (
                <img height={'100px'} src={`${base_url}/uploads/${item.profileimg}`} alt="Image is not loading" className='mt-3 rounded' />
              )) :
              <label htmlFor="profile" className='text-center mb-2 mt-3'>
                <input type="file" id='profile' style={{ display: "none" }}
                  onChange={((e) => setprofileDetails({ ...profileDetails, profileimg: e.target.files[0] }))} />
                <img height={'100px'} className='rounded' src={preview ? preview : "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="} alt="" />
              </label>
          }

          {
            userprofile.length > 0 ?
              userprofile.map((item) => (
                <div>
                  <Updateprofile profile={item} />
                  <button onClick={() => handleremove(item._id)} className='btn btn-danger rounded w-20 mt-3'>Remove Profile</button>
                </div>

              )) :
              <button className='btn btn-success rounded w-100 mt-3' onClick={handleAdd}>Add</button>
          }
        </div>

      </div >
    </>
  )
}

export default Profile