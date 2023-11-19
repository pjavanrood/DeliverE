import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import videobg from '../assets/Data_Grid.mp4'
import '../index.css'

const Signup = () => {
    const base_url = 'http://localhost:4000'

    const [message, setMessage] = useState('')
    const nameRef = useRef(undefined)
    const lastNameRef = useRef(undefined)
    const emailRef = useRef(undefined)
    const passwordRef = useRef(undefined)

    const navigate = useNavigate()

    const displayMessage = (msg, err) => {
        setMessage(msg)

        toast.dismiss()

        if (err) {
            toast.error(msg)
        } else {
            toast.success(msg)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()  

        const name = nameRef.current.value
        const lastName = lastNameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

        if (
            name === ''
            || lastName === ''
            || email === ''
            || password === ''
        ) {
            const msg = 'Missing Value!'
            displayMessage(msg, true)
            return
        } else if ( !emailRegex.test(email) ) {
            const msg = 'Invalid Email!'
            displayMessage(msg, true)
            return
        }

        setMessage('Sending Req')

        const userData = {
            name: name,
            last_name: lastName,
            email: email,
            password: password
        }
        
        const data = await axios.post(`${base_url}/signup`, userData).then(response => response.data).catch(
            err => {
                return {
                    success: false,
                    message: 'Error!'
                }
            }
        )

        console.log(data.message)

        if (data.success) {
            displayMessage("Signed Up!", false)
        } else {
            displayMessage(data.message, true)
            return
        }

        navigate('/dashboard')

    }

    return (
        <div>
            <div className='overlay'></div>
            <video src={videobg} autoPlay loop muted />
            <div className="login template login_page d-flex justify-content-center align-items-center vh-100">
                <h1 className='title'>Welcome to DeliverE</h1>
                <br />
                <div className="form_container p-5 rounded bg-white">
                    <h3 className="text-center">Sign Up</h3>
                    <form onSubmit={handleSubmit}>    
                        <div className="mb-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder="Enter Name" className="form-control" ref={nameRef}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="Last Name">Last Name</label>
                            <input type="text" placeholder="Enter Last Name" className="form-control" ref={lastNameRef}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control" ref={emailRef}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Password" className="form-control" ref={passwordRef}/>
                        </div>
                        <div className="d-grid">
                            <button type='submit' className="btn btn-primary">Sign Up</button>
                        </div>
                        <ToastContainer />
                        <p className='text-center mt-2'>
                            Already Registered <Link to="/login">Sign In</Link>
                        </p>
                    </form>
                    <br />
                    <h2>{message}</h2>

                </div>
            </div>
        </div>
    )
}


export default Signup