import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { addRequest, removeRequest } from '../utils/requestsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'

const Requests = () => {
  const dispatch = useDispatch()
  const requestsData = useSelector((store) => store.requests)
  const [showToast,setShowToast]=useState(false)
  const reviewRequest = async (status,_id) => {
    try {
      const res = await axios.post(BASE_URL + '/request/review/' + status + '/' + _id, {}, { withCredentials: true })
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
      const res = await axios.get(BASE_URL + '/user/requests/received', { withCredentials: true })
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
  if (requestsData.length === 0) return <p className='text-center my-10'>No Requests Found</p>
  return (
  <>
    { showToast &&
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>Request Accepted successfully.</span>
      </div>
    </div>
            }
    <div className='text-center  my-10'>
      <h1 className='text-bold text-3xl'>Connection Requests</h1>


      {requestsData.map((cData) => {
        console.log("PHOTO URL:", cData.photoUrl)
        const { firstName, lastName, photoUrl, about, age, gender } = cData.fromUserId
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
            <div className="card-actions justify-center my-4">
              <button className="btn btn-success" onClick={() => reviewRequest("accepted", cData._id)}>Accept</button>
              <button className="btn btn-error" onClick={() => reviewRequest("rejected",cData._id)}>Reject</button>

            </div>
          </div>
          
        )
        
      })}




      </div>
    </>
  )
}

export default Requests