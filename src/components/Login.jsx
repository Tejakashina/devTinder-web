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
            const res = await axios.post(
                BASE_URL + '/signup',
                {
                    firstName,
                    lastName,
                    emailId,
                    password
                },
                { withCredentials: true }
            )

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
            const res = await axios.post(
                BASE_URL + '/login',
                {
                    emailId,
                    password
                },
                { withCredentials: true }
            )

            dispatch(addUser(res.data))
            return navigate("/")
        }
        catch (err) {
            setError(err?.response?.data || "Something Went wrong")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-200">

            <div className="w-full max-w-md">

                {/* Logo / Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Dev<span className="text-primary">Tinder</span> 💻
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        {isLoginForm
                            ? "Connect with developers around you"
                            : "Create your developer account"}
                    </p>
                </div>


                {/* Card */}
                <div className="card w-full bg-base-100 shadow-2xl border border-base-300">

                    <div className="card-body p-8">

                        {/* Title */}
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold">
                                {isLoginForm ? "Welcome Back 👋" : "Join DevTinder 🚀"}
                            </h2>

                            <p className="text-sm text-base-content/60 mt-1">
                                {isLoginForm
                                    ? "Login to continue connecting with developers."
                                    : "Create your account and start networking."}
                            </p>
                        </div>


                        {/* Form */}
                        <fieldset className="fieldset">

                            {/* Signup fields */}
                            {!isLoginForm && (
                                <>
                                    <label
                                        className="label font-medium"
                                        htmlFor="firstName"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        id="firstName"
                                        className="input input-bordered w-full"
                                        placeholder="Enter your first name"
                                    />


                                    <label
                                        className="label font-medium mt-2"
                                        htmlFor="lastName"
                                    >
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        id="lastName"
                                        className="input input-bordered w-full"
                                        placeholder="Enter your last name"
                                    />
                                </>
                            )}


                            {/* Email */}
                            <label
                                className="label font-medium mt-2"
                                htmlFor="emailId"
                            >
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                id="emailId"
                                className="input input-bordered w-full"
                                placeholder="you@example.com"
                            />


                            {/* Password */}
                            <label
                                className="label font-medium mt-2"
                                htmlFor="password"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Enter your password"
                            />

                        </fieldset>


                        {/* Error */}
                        {error && (
                            <div className="alert alert-error mt-4 text-sm">
                                <span>{error}</span>
                            </div>
                        )}


                        {/* Button */}
                        <div className="mt-6">

                            <button
                                className="btn btn-primary w-full text-base"
                                onClick={isLoginForm ? handleLogin : handleSignup}
                            >
                                {isLoginForm ? "Login" : "Create Account"}
                            </button>

                        </div>


                        {/* Divider */}
                        <div className="divider text-xs text-base-content/50">
                            OR
                        </div>


                        {/* Toggle */}
                        <p
                            className="text-center text-sm cursor-pointer hover:text-primary transition-colors"
                            onClick={() => {
                                setLoginForm((val) => !val)
                                setError("")
                            }}
                        >
                            {isLoginForm
                                ? "New to DevTinder? "
                                : "Already have an account? "}

                            <span className="font-semibold text-primary">
                                {isLoginForm ? "Create an account" : "Login"}
                            </span>
                        </p>

                    </div>
                </div>


                {/* Bottom text */}
                <p className="text-center text-xs text-base-content/50 mt-6">
                    By continuing, you agree to DevTinder's Terms & Privacy Policy.
                </p>

            </div>
        </div>
    )
}

export default Login