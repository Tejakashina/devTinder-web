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
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true })
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
  if (connectionsData.length === 0) return <p>No Connections Found</p>
  return (
    <div className='text-center  my-10'>
      <h1 className='text-bold text-3xl'>Connections</h1>


      {connectionsData.map((cData) => {
        console.log("PHOTO URL:", cData.photoUrl)
        const { firstName, lastName, photoUrl, about, age, gender } = cData
        return (
          <div key={cData._id} className='flex  m-4 p-4 bg-neutral text-neutral-content rounded-lg w-1/3 mx-auto'>
            <div>
              <img src={photoUrl} className='w-20 h-20 rounded-xl' alt="photo" />
            </div>
            <div className='text-left mx-4'>
              <h2 className='text-xl font-bold'>{firstName + '' + lastName}</h2>
              {age && gender && <h2>{age + ',' + gender}</h2>}
              <p>{about}</p>
            </div>
           
          </div>
        )
      })}




    </div>
  )

}

export default Connections