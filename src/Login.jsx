import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {
    const [emailId, setEmailId] = useState('tejasri.kashina@gmail.com')
    const [password, setPassword] = useState('Teja@123')
    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:7777/login', {
                emailId,
                password
            },
            {withCredentials:true})
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
