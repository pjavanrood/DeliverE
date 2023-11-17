import React, { useRef } from 'react';
import { Link } from "react-router-dom"
import videobg from '../assets/Data_Grid.mp4'
import '../index.css'

const Signup = () => {
    const videoRef = useRef(null);

    let direction = 1;

    const handleVideoEnd = () => {
        // Set currentTime to the duration of the video to play it in reverse
        // videoRef.current.currentTime = 0; //videoRef.current.duration;
        // Play the video in reverse
        if (videoRef.current.playbackRate > 0) {
            videoRef.current.playbackRate = -5
        } else {
            videoRef.current.playbackRate = +5
        }
        
    };

    const handleVideoPlay = () => {
        // Set playbackRate back to normal when playing forward
        if (videoRef.current.playbackRate > 0) {
            videoRef.current.playbackRate = -5
        } else {
            videoRef.current.playbackRate = +5
        }
    };
    
    return (
        <div>
            <div className='overlay'></div>
            <video ref={videoRef} onEnded={handleVideoEnd} onPlay={handleVideoPlay} src={videobg} autoPlay loop muted />
            <div className="login template login_page d-flex justify-content-center align-items-center vh-100">
                <h1 className='title'>Welcome to DeliverE</h1>
                <h1><br /></h1>
                <div className="form_container p-5 rounded bg-white">
                    <form action="">
                    <h3 className="text-center">Sign Up</h3>
                        <div className="mb-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder="Enter Name" className="form-control"/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="Last Name">Last Name</label>
                            <input type="text" placeholder="Enter Last Name" className="form-control"/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control"/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Password" className="form-control"/>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        <p className='text-center mt-2'>
                            Already Registered <Link to="/login">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Signup