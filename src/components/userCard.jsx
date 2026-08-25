import React from 'react'

const UserCard = ({ user }) => {
  const {firstName,lastName,photoUrl,about,age,gender} = user
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
                  <button className="btn btn-error">Ignore</button>
                  <button className="btn btn-success">Interested</button>

              </div>
          </div>
      </div>
  )
}
export default UserCard
