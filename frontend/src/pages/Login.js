import '../index.css'
import { Link  } from 'react-router-dom'
import videobg from '../assets/Data_Grid.mp4'

const Login = () => {
    return (
        <div>
            <div className='overlay'></div>
            <video src={videobg} autoPlay loop muted />
            <div className="login template login_page d-flex justify-content-center align-items-center vh-100">
                <h1 className='title'>Welcome to DeliverE</h1>
                <h1><br /></h1>
                <div className="form_container p-5 rounded bg-white">
                    <form action="">
                        <h3 className="text-center">Sign In</h3>
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control"/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Password" className="form-control"/>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary">Sign In</button>
                        </div>
                        <p className='text-center mt-2'>
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login