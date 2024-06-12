import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./auth.css"
import { Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';

function Authentication({ register }) {
    const navigate = useNavigate()
    const registerForm = register ? true : false;
    const [userdata, setuserdata] = useState({
        username: "",
        email: "",
        password: ""
    })
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(userdata);
        const { username, email, password } = userdata;
        if (!username || !email || !password) {
            alert("Please fill the form completely")
        }
        else {
            const result = await registerAPI(userdata)
            if (result.status === 200) {
                alert("user registered succesfully")
                setuserdata({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/')
            }
            else {
                alert(result.response.data)
            }
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(userdata);
        const { email, password } = userdata;
        if (!email || !password) {
            alert("Please fill the form completely")
        }
        else {
            const result = await loginAPI(userdata)
            if (result.status === 200) {
                alert("User Logged In Successsfully")
                sessionStorage.setItem("existinguser", JSON.stringify(result.data.existinguser))
                sessionStorage.setItem("token", result.data.token)
                setuserdata({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/home')
            }
            else {
                alert("Password/Email is invalid")
            }
        }
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center fullpage' style={{ width: "100%", height: "100vh" }}>
                <div className='w-100 container second'>
                    <div className='rounded  mt-3' style={{ height: "80vh" }}>
                        <div className='row align-items-center'  >
                            <div className='col-lg-6 col-md-6 p-5' >
                                <img className='rounded' src="https://i.gifer.com/921j.gif" alt="" width={"100%"} height={""} />
                            </div>
                            <div className='col-lg-6 col-md-6 ' >
                                <div className='d-flex align-items-center flex-column'>
                                    <h2 className='text-light' style={{ fontWeight: "bolder" }}>
                                        <img src="https://static.thenounproject.com/png/5773331-200.png" style={{ background: "white", borderRadius: "8px", opacity: "0.5" }} alt="loading" height={"45px"} className='me-3' />
                                        Travel Diaries
                                    </h2>
                                    <h4 className='text-light'>
                                        {
                                            registerForm ? "Sign up to your account" : "Sign in to your account"
                                        }
                                    </h4>
                                    <Form className='rounded p-5 mt-3' style={{ backgroundImage: "linear-gradient(to right, grey,skyblue)", height: "44vh", opacity: "0.8" }}>
                                        {
                                            registerForm &&
                                            <Form.Group md="4" controlId="validationCustomUsername">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control value={userdata.username}
                                                    onChange={(e) => setuserdata({ ...userdata, username: e.target.value })}
                                                    type="text"
                                                    placeholder="Username" />
                                            </Form.Group>
                                        }
                                        <Form.Group md="4" controlId="validationCustomUsername">
                                            <Form.Label>Email</Form.Label>

                                            <Form.Control
                                                value={userdata.email}
                                                onChange={(e) => setuserdata({ ...userdata, email: e.target.value })}
                                                type="email"
                                                placeholder="enter your email"
                                                required // Make the input field required
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Define a regex pattern for email validation
                                            />
                                        </Form.Group>

                                        <Form.Group md="4" controlId="validationCustomUsername">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                value={userdata.password}
                                                onChange={(e) => setuserdata({ ...userdata, password: e.target.value })}
                                                type="password"
                                                placeholder="password" />
                                        </Form.Group>
                                    </Form>
                                    {
                                        registerForm ?
                                            <div className='mt5'>
                                                <button className='btn btn-success rounded mt-3' onClick={handleRegister}>Register <img src="https://cdn-icons-png.flaticon.com/512/3456/3456426.png" alt="" height='20px' /></button>
                                                <p>Already A User? Click Here To <Link to='/' style={{ textDecoration: "none", fontWeight: "bolder" }} className='log'>Login</Link></p>
                                            </div>
                                            :
                                            <div >
                                                <button className='btn btn-primary rounded mt-3' onClick={handleLogin}><i class="fa-solid fa-right-to-bracket"></i> Login</button>
                                                <p>Not A User? Click Here To <Link to='/register' style={{ textDecoration: "none", fontWeight: "bolder" }} className='log'>Register</Link></p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-center" autoClose={1500} theme="colored" />
            </div>

        </>
    )
}

export default Authentication