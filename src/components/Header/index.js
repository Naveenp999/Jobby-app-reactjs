import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const Logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <ul className="nav-bar">
        <li className="logo-container">
          <Link to="/" className="link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </li>
        <li className="head-content">
          <ul className="nav-btn-container">
            <Link className="link" to="/">
              <li className="nav-item">Home</li>
            </Link>
            <Link to="/jobs" className="link">
              <li className="nav-item">Jobs</li>
            </Link>
          </ul>
          <button className="jobs-btn" type="button" onClick={Logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
