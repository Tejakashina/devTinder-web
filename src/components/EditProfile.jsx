import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import UserCard from './userCard'
const EditProfile = ({ user }) => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age || '')
    const [gender, setGender] = useState(user.gender || '')
    const [about, setAbout] = useState(user.about)
    const [showToast,setShowToast]=useState(false)
    const updateProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL + '/updateProfile', { firstName, lastName, photoUrl, about, age, gender }, { withCredentials: true })
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
           setTimeout(() => {
                setShowToast(false)
            },2000)
        }
        catch (err) {
            setError(err?.response?.data || "Something Went wrong")
        }
    }
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    return (
        <>
            {showToast &&
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>User updated successfully.</span>
                    </div>
                </div>
            }
            <div className='flex justify-center items-start my-10'>
                <div className='flex justify-center mx-8'>
                    <div className="card bg-base-200 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset">
                                    <label className="label" htmlFor="firstName">First Name</label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" className="input" />
                                    <label className="label" htmlFor="lastName">lastName</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" className="input" />
                                    <label className="label" htmlFor="photoUrl">PhotoUrl</label>
                                    <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} id="photoUrl" className="input" />
                                    <label className="label" htmlFor="age">Age</label>
                                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} id="age" className="input" />
                                    <label className="label" htmlFor="gender">Gender</label>
                                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} id="gender" className="input" />
                                    <label className="label" htmlFor="about">About</label>
                                    <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} id="about" className="input" />
                                </fieldset>
                            </div>
                            <p className='text-red-500'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={updateProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} showActions = {false} />
               
            </div>
    
        </>
    )
}
export default EditProfile
