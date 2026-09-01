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
    const [showToast, setShowToast] = useState(false)
    const [error, setError] = useState("")

    const dispatch = useDispatch()

    const updateProfile = async () => {
        setError("")

        try {
            const res = await axios.patch(
                BASE_URL + '/updateProfile',
                {
                    firstName,
                    lastName,
                    photoUrl,
                    about,
                    age,
                    gender
                },
                { withCredentials: true }
            )

            dispatch(addUser(res?.data?.data))

            setShowToast(true)

            setTimeout(() => {
                setShowToast(false)
            }, 2000)
        }
        catch (err) {
            setError(
                err?.response?.data || "Something Went wrong"
            )
        }
    }

    return (
        <>
            {/* Success Toast */}
            {showToast &&
                <div className="toast toast-top toast-end z-50">
                    <div className="alert alert-success shadow-lg">
                        <span>
                            ✓ User updated successfully.
                        </span>
                    </div>
                </div>
            }


            <div className="
                min-h-screen
                bg-base-200
                py-10
                px-4
            ">

                {/* Page Heading */}
                <div className="text-center mb-10">

                    <h1 className="text-4xl font-bold">
                        Edit Profile
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Update your profile information
                    </p>

                </div>


                {/* Main Content */}
                <div className="
                    max-w-6xl
                    mx-auto
                    flex
                    flex-col
                    lg:flex-row
                    items-center
                    lg:items-start
                    justify-center
                    gap-10
                ">


                    {/* Edit Form */}
                    <div className="
                        card
                        bg-base-100
                        w-full
                        max-w-md
                        shadow-xl
                        border
                        border-base-300
                    ">

                        <div className="card-body p-7">

                            <h2 className="text-2xl font-bold mb-2">
                                Profile Details
                            </h2>

                            <p className="text-sm text-base-content/60 mb-4">
                                Make changes to your profile below.
                            </p>


                            <fieldset className="fieldset">

                                {/* First Name */}
                                <label
                                    className="label font-medium"
                                    htmlFor="firstName"
                                >
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    id="firstName"
                                    className="input input-bordered w-full"
                                    placeholder="Enter first name"
                                />


                                {/* Last Name */}
                                <label
                                    className="label font-medium mt-3"
                                    htmlFor="lastName"
                                >
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    id="lastName"
                                    className="input input-bordered w-full"
                                    placeholder="Enter last name"
                                />


                                {/* Photo URL */}
                                <label
                                    className="label font-medium mt-3"
                                    htmlFor="photoUrl"
                                >
                                    Profile Photo URL
                                </label>

                                <input
                                    type="text"
                                    value={photoUrl}
                                    onChange={(e) =>
                                        setPhotoUrl(e.target.value)
                                    }
                                    id="photoUrl"
                                    className="input input-bordered w-full"
                                    placeholder="https://example.com/photo.jpg"
                                />


                                {/* Age */}
                                <label
                                    className="label font-medium mt-3"
                                    htmlFor="age"
                                >
                                    Age
                                </label>

                                <input
                                    type="text"
                                    value={age}
                                    onChange={(e) =>
                                        setAge(e.target.value)
                                    }
                                    id="age"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your age"
                                />


                                {/* Gender */}
                                <label
                                    className="label font-medium mt-3"
                                    htmlFor="gender"
                                >
                                    Gender
                                </label>

                                <input
                                    type="text"
                                    value={gender}
                                    onChange={(e) =>
                                        setGender(e.target.value)
                                    }
                                    id="gender"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your gender"
                                />


                                {/* About */}
                                <label
                                    className="label font-medium mt-3"
                                    htmlFor="about"
                                >
                                    About
                                </label>

                                <textarea
                                    value={about}
                                    onChange={(e) =>
                                        setAbout(e.target.value)
                                    }
                                    id="about"
                                    className="
                                        textarea
                                        textarea-bordered
                                        w-full
                                        min-h-28
                                    "
                                    placeholder="Tell something about yourself..."
                                />

                            </fieldset>


                            {/* Error */}
                            {error && (
                                <div className="alert alert-error mt-4">
                                    <span className="text-sm">
                                        {error}
                                    </span>
                                </div>
                            )}


                            {/* Save Button */}
                            <div className="mt-6">

                                <button
                                    className="
                                        btn
                                        btn-primary
                                        w-full
                                        text-base
                                    "
                                    onClick={updateProfile}
                                >
                                    Save Profile
                                </button>

                            </div>

                        </div>
                    </div>


                    {/* Preview */}
                    <div className="
                        w-full
                        max-w-md
                        flex
                        flex-col
                        items-center
                    ">

                        <div className="text-center mb-4">

                            <h2 className="text-2xl font-bold">
                                Profile Preview
                            </h2>

                            <p className="text-sm text-base-content/60 mt-1">
                                This is how your profile will look
                            </p>

                        </div>

                        <UserCard
                            user={{
                                firstName,
                                lastName,
                                photoUrl,
                                age,
                                gender,
                                about
                            }}
                            showActions={false}
                        />

                    </div>

                </div>

            </div>
        </>
    )
}

export default EditProfile