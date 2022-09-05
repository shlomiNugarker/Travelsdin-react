import { useDispatch, useSelector } from 'react-redux'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { getLoggedinUser, logout } from '../store/actions/userActions'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const FeedIdentityModule = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { loggedInUser } = useSelector((state) => state.userModule)

  const doLogout = async () => {
    dispatch(logout()).then((res) => {
      console.log(res)
      if (res) history.push(`/`)
    })
  }

  if (!loggedInUser)
    return <section className="feed-identity-module">Loading</section>

  const { fullname, imgUrl, profession } = loggedInUser

  return (
    <section className="feed-identity-module">
      <div className="">
        <div className="bg">
          <div
            className="profile-container"
            onClick={() => history.push(`profile/${loggedInUser._id}`)}
          >
            <img src={imgUrl} alt="" className="img" />
          </div>
        </div>

        <div className="profile-name">
          <h1>{fullname}</h1>
          <p className="professional">{profession}</p>
        </div>

        <div className="views">
          <div>
            <p>{loggedInUser.connections.length} connections</p>
            {/* <span>245</span> */}
          </div>

          <div>
            {/* <p>Impressions of your post</p>
            <span>2164</span> */}
          </div>
        </div>

        {/* <div className="to-premium">
          <p>Access exclusive tools & insights</p>
          <div>
            <span className="logo">o</span>
            <p>Try Premium for free</p>
          </div>
        </div> */}

        <div className="my-items">
          <div onClick={doLogout}>
            {/* <span>o</span>
            My items */}
            <p>Logout</p>
            <span>
              <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
