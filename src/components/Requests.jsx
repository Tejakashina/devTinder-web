import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { addRequest, removeRequest } from '../utils/requestsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'

const Requests = () => {
  const dispatch = useDispatch()
  const requestsData = useSelector((store) => store.requests)
  const [showToast, setShowToast] = useState(false)

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      )

      dispatch(removeRequest(_id))

      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    }
    catch (err) {
      console.log(err)
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + '/user/requests/received',
        { withCredentials: true }
      )

      console.log(res.data.data)
      dispatch(addRequest(res.data.data))
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  if (!requestsData) return

  if (requestsData.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">

        <div className="text-center">

          <div className="text-6xl mb-5">
            📩
          </div>

          <h2 className="text-2xl font-bold">
            No Connection Requests
          </h2>

          <p className="text-base-content/60 mt-2">
            You don't have any pending requests right now.
          </p>

        </div>

      </div>
    )
  }

  return (
    <>

      {/* Toast */}
      {showToast &&
        <div className="toast toast-top toast-end z-50">

          <div className="alert alert-success shadow-lg">

            <span>
              ✓ Request Accepted successfully.
            </span>

          </div>

        </div>
      }


      <div className="min-h-screen bg-base-100 py-10 px-4">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="
            inline-flex
            items-center
            justify-center
            w-16
            h-16
            rounded-full
            bg-primary/10
            mb-4
          ">
            <span className="text-3xl">
              🤝
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            Connection Requests
          </h1>

          <p className="text-base-content/60 mt-2">
            Developers who want to connect with you
          </p>

          <div className="badge badge-primary mt-4 px-4 py-3">
            {requestsData.length} Pending
          </div>

        </div>


        {/* Requests */}
        <div className="
          max-w-4xl
          mx-auto
          space-y-5
        ">

          {requestsData.map((cData) => {

            console.log("PHOTO URL:", cData.photoUrl)

            const {
              firstName,
              lastName,
              photoUrl,
              about,
              age,
              gender
            } = cData.fromUserId

            return (

              <div
                key={cData._id}
                className="
                  bg-base-200
                  rounded-2xl
                  shadow-md
                  border
                  border-base-300
                  p-6
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  gap-6
                ">

                  {/* Profile Image */}
                  <div className="shrink-0">

                    <img
                      src={photoUrl}
                      className="
                        w-24
                        h-24
                        object-cover
                        rounded-full
                        ring-4
                        ring-primary/20
                      "
                      alt="photo"
                    />

                  </div>


                  {/* User Information */}
                  <div className="
                    flex-1
                    text-center
                    sm:text-left
                  ">

                    <h2 className="text-2xl font-bold">
                      {firstName + '' + lastName}
                    </h2>


                    {/* Age / Gender */}
                    {age && gender && (
                      <div className="
                        flex
                        justify-center
                        sm:justify-start
                        gap-2
                        mt-2
                      ">

                        <span className="badge badge-primary badge-outline">
                          {age} years
                        </span>

                        <span className="
                          badge
                          badge-secondary
                          badge-outline
                          capitalize
                        ">
                          {gender}
                        </span>

                      </div>
                    )}


                    {/* About */}
                    <p className="
                      mt-3
                      text-base-content/70
                      leading-relaxed
                      line-clamp-2
                    ">
                      {about}
                    </p>

                  </div>


                  {/* Actions */}
                  <div className="
                    flex
                    gap-3
                    shrink-0
                  ">

                    <button
                      className="
                        btn
                        btn-success
                        rounded-full
                        px-6
                      "
                      onClick={() =>
                        reviewRequest(
                          "accepted",
                          cData._id
                        )
                      }
                    >
                      ✓ Accept
                    </button>

                    <button
                      className="
                        btn
                        btn-error
                        btn-outline
                        rounded-full
                        px-6
                      "
                      onClick={() =>
                        reviewRequest(
                          "rejected",
                          cData._id
                        )
                      }
                    >
                      ✕ Reject
                    </button>

                  </div>

                </div>

              </div>

            )
          })}

        </div>

      </div>

    </>
  )
}

export default Requests