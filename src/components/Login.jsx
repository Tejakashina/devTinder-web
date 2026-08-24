import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
    const navigate = useNavigate()
    const [emailId, setEmailId] = useState('pandu@gmail.com')
    const [password, setPassword] = useState('Pandu@123')
    const dispatch = useDispatch()
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + '/login', {
                emailId,
                password
            },
                { withCredentials: true });
            dispatch(addUser(res.data))
            return navigate("/")
        }
        catch (err) {
            console.error("Login failed:", err)
        }
    }
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="emailId">Email Id</label>
                            <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} id="emailId" className="input" placeholder="Please enter EmailId" />
                            <label className="label" htmlFor="password">Password</label>
                            <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Please enter Password" />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
