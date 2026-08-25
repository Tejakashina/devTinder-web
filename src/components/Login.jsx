import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginForm, setLoginForm] = useState(true)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const handleSignup = async () => {
        setError("")
        try {
            const res = await axios.post(BASE_URL + '/signup', {
                firstName,
                lastName,
                emailId,
                password
            }, { withCredentials: true })
            dispatch(addUser(res.data.data))
            return navigate("/profile")
        }
        catch (err) {
            setError(err?.response?.data || "Something Went wrong")
        }
    }
    const handleLogin = async () => {
        setError("")
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
            setError(err?.response?.data || "Something Went wrong")
        }




    }
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">{isLoginForm ? "Login" : "Signup"}</h2>
                    <div>
                        <fieldset className="fieldset">
                            {!isLoginForm && <>
                                <label className="label" htmlFor="firstName">First Name</label>
                                <input type="email" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" className="input" placeholder='Please enter First Name' />
                                <label className="label" htmlFor="lastName">Last Name</label>
                                <input type="email" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" className="input" placeholder='Please enter Last Name' />
                            </>}
                            <label className="label" htmlFor="emailId">Email Id</label>
                            <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} id="emailId" className="input" placeholder="Please enter EmailId" />
                            <label className="label" htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Please enter Password" />
                        </fieldset>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Signup"}</button>
                    </div>
                    <p className='text-center cursor-pointer py-2' onClick={() => setLoginForm((val) => !val)}>{isLoginForm ? "New User ? Signup here" : "Existing User ? Login here"}</p>
                </div>
            </div>
        </div>
    )
}
export default Login
