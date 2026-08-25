import React from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { removeFeed } from '../utils/feedSlice'
import axios from 'axios'
const UserCard = ({ user }) => {
    const dispatch = useDispatch()
    const {_id, firstName, lastName, photoUrl, about, age, gender } = user
    const sendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, { withCredentials: true })
            dispatch(removeFeed(userId))
        }
        catch (err) {
            console.log(err)
        }
    }
    
  return (
      <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
              <img
                  src={photoUrl}
                  alt="Photo" />
          </figure>
          <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName} </h2>
              <p>{about}</p>
              <p>{age}</p>
              <p>{gender}</p>
              <div className="card-actions justify-center my-4">
                  <button className="btn btn-error" onClick={() => sendRequest("ignored", _id)}>Ignore</button>
                  <button className="btn btn-success" onClick={() => sendRequest("interested", _id)}>Interested</button>

              </div>
          </div>
      </div>
  )
}
export default UserCard
