import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionsSlice'

const Connections = () => {
  const dispatch = useDispatch()
  const connectionsData = useSelector((store) => store.connections)

  const getConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + '/user/connections',
        { withCredentials: true }
      )
      console.log(res)
      dispatch(addConnection(res.data.data))
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getConnections()
  }, [])

  if (!connectionsData) return

  if (connectionsData.length === 0) return (
    <div className="min-h-[70vh] flex justify-center items-center px-4">

      <div className="text-center">

        <div className="text-6xl mb-4">
          🤝
        </div>

        <h2 className="text-2xl font-bold">
          No Connections Found
        </h2>

        <p className="text-base-content/60 mt-2">
          Start connecting with developers to build your network.
        </p>

      </div>

    </div>
  )

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">

      {/* Heading */}
      <div className="text-center mb-12">

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

        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Connections
        </h1>

        <p className="mt-3 text-base-content/60">
          People you are connected with
        </p>

        <div className="badge badge-primary mt-4 px-4 py-3">
          {connectionsData.length} Connections
        </div>

      </div>


      {/* Connections */}
      <div className="max-w-4xl mx-auto space-y-5">

        {connectionsData.map((cData) => {

          console.log("PHOTO URL:", cData.photoUrl)

          const {
            firstName,
            lastName,
            photoUrl,
            about,
            age,
            gender
          } = cData

          return (
            <div
              key={cData._id}
              className="
                group
                flex
                flex-col
                sm:flex-row
                items-center
                sm:items-center
                gap-6
                p-6
                bg-base-100
                rounded-3xl
                shadow-md
                border
                border-base-300
                hover:shadow-2xl
                hover:border-primary/30
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Profile Image */}
              <div className="shrink-0">

                <div className="
                  rounded-full
                  p-1
                  bg-gradient-to-br
                  from-primary
                  to-secondary
                ">

                  <img
                    src={photoUrl}
                    className="
                      w-28
                      h-28
                      object-cover
                      rounded-full
                      border-4
                      border-base-100
                    "
                    alt="photo"
                  />

                </div>

              </div>


              {/* User Information */}
              <div className="
                text-center
                sm:text-left
                flex-1
                min-w-0
              ">

                {/* Name */}
                <h2 className="
                  text-2xl
                  font-bold
                  truncate
                  group-hover:text-primary
                  transition-colors
                ">
                  {firstName + '' + lastName}
                </h2>


                {/* Age & Gender */}
                {age && gender && (
                  <div className="
                    flex
                    justify-center
                    sm:justify-start
                    items-center
                    gap-2
                    mt-3
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

                <p className="
                  mt-4
                  text-base-content/70
                  leading-relaxed
                  line-clamp-2
                ">
                  {about || "No information available."}
                </p>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Connections