import React from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { removeFeed } from '../utils/feedSlice'
import axios from 'axios'

const UserCard = ({ user, showActions = true }) => {

    const dispatch = useDispatch()

    const {
        _id,
        firstName,
        lastName,
        photoUrl,
        about,
        age,
        gender
    } = user

    const sendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + '/request/send/' + status + '/' + userId,
                {},
                { withCredentials: true }
            )

            dispatch(removeFeed(userId))
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="
            card
            bg-base-100
            w-full
            max-w-sm
            overflow-hidden
            shadow-xl
            border
            border-base-300
            hover:shadow-2xl
            transition-all
            duration-300
            hover:-translate-y-1
        ">

            {/* Profile Image */}
            <figure className="
                relative
                h-64
                sm:h-96
                bg-base-300
            ">

                <img
                    className="
                        w-full
                        h-full
                        object-cover
                    "
                    src={photoUrl}
                    alt="Photo"
                />

                {/* Image gradient */}
                <div className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-24
                    bg-gradient-to-t
                    from-black/70
                    to-transparent
                ">
                </div>

            </figure>


            {/* Card Content */}
            <div className="
                card-body
                p-4
                sm:p-6
            ">

                {/* Name */}
                <h2 className="
                    text-xl
                    sm:text-2xl
                    font-bold
                ">
                    {firstName + " " + lastName}
                </h2>


                {/* Age & Gender */}
                <div className="flex gap-2 mt-1">

                    {age && (
                        <span className="badge badge-primary badge-outline">
                            {age} years
                        </span>
                    )}

                    {gender && (
                        <span className="
                            badge
                            badge-secondary
                            badge-outline
                            capitalize
                        ">
                            {gender}
                        </span>
                    )}

                </div>


                {/* About */}
                <p className="
                    mt-2
                    text-sm
                    sm:text-base
                    text-base-content/70
                    leading-relaxed
                    line-clamp-2
                ">
                    {about || "No information available."}
                </p>


                {/* Actions */}
                {showActions && (
                    <div className="
                        card-actions
                        flex
                        flex-row
                        justify-center
                        gap-2
                        sm:gap-4
                        mt-4
                        w-full
                    ">

                        <button
                            className="
                                btn
                                btn-error
                                btn-outline
                                rounded-full
                                flex-1
                                px-2
                                sm:px-7
                                text-sm
                                sm:text-base
                            "
                            onClick={() =>
                                sendRequest("ignored", _id)
                            }
                        >
                            ✕ Ignore
                        </button>


                        <button
                            className="
                                btn
                                btn-success
                                rounded-full
                                flex-1
                                px-2
                                sm:px-7
                                text-sm
                                sm:text-base
                            "
                            onClick={() =>
                                sendRequest("interested", _id)
                            }
                        >
                            ♥ Interested
                        </button>

                    </div>
                )}

            </div>

        </div>
    )
}

export default UserCard