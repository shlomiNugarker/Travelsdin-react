import { useCallback, useEffect, useMemo, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup, logout } from '../store/actions/userActions'

export const Signup = ({ history }) => {
  const dispatch = useDispatch()
  
  const [signin, setIsSignin] = useState(false)
  const [cred, setCred] = useState({
    username: '',
    password: '',
    fullname: '',
  })
  
  const { loggedInUser } = useSelector((state) => state.userModule)

  const handleChange = async ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    setCred((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const cleanFields = () =>
    setCred(() => ({ username: '', password: '', fullname: '' }))

  const doLogin = async () => {
    dispatch(login(cred))
    cleanFields()
  }

  const doLogout = async () => {
    dispatch(logout())
    cleanFields()
  }

  const doSignup = async () => {
    dispatch(signup(cred))
    cleanFields()
  }

  const doSubmit = () => {
    if (signin) doLogin()
    else {
      doSignup()
    }
  }

  const tooggle = () => {
    setIsSignin((prevVal) => !prevVal)
  }

  if (loggedInUser) {
    return (
      <section className="sign-up-page">
        <p>loggedInUser: {loggedInUser.fullname}</p>
        <button onClick={doLogout}>Logout</button>
      </section>
    )
  }

  return (
    <section className="sign-up-page">
      <div className="logo-container">
        <p>linkedin</p>
      </div>
      <div className="form-container">
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            doSubmit()
          }}
        >
          <h1>{signin ? 'Sign in' : 'Sign up'}</h1>
          <p>Stay updated on your professional world</p>
          {!signin && (
            <input
              required
              onChange={handleChange}
              type="text"
              placeholder="Fullname"
              id="fullname"
              name="fullname"
              value={cred.fullname}
            />
          )}
          <input
            onChange={handleChange}
            type="text"
            id="username"
            name="username"
            value={cred.username}
            placeholder="Username"
            required
          />
          <input
            onChange={handleChange}
            type="text"
            id="password"
            name="password"
            value={cred.password}
            placeholder="Passsword"
            required
          />
          <a>Forgot password?</a>

          <button className="sign-in-btn">
            {signin ? 'Sign in' : 'Sign up'}
          </button>
          <div className="divider-container">
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          <button className="sign-in-apple-btn">Sign in with Apple</button>
        </form>
        <div className="to-sign-up-container">
          <p>
            <a
              onClick={(ev) => {
                ev.preventDefault()
                tooggle()
              }}
            >
              {signin
                ? ' New to LinkedIn? Join now'
                : 'Already on LinkedIn? Sign in'}
            </a>
          </p>
        </div>
      </div>

      {/* <footer className="footer-container">
        <div className="footer">footer</div>
      </footer> */}
    </section>
  )
}
