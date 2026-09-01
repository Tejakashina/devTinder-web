import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL + '/logout', {}, { withCredentials: true })
      dispatch(removeUser())
      navigate('/login')
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="navbar bg-neutral shadow-sm text-neutral-content">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl text-white">DEV TINDER</Link>
      </div>
      {user && <div className="flex gap-2">

        <div className="flex items-center mx-4">

          <p className="mr-3">
            Welcome, {user.firstName}
          </p>

          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl}
                />
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-neutral rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>

              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><Link to="/premium">Premium</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>

          </div>

        </div>
      </div>
      }
    </div>
  )
}
export default NavBar
