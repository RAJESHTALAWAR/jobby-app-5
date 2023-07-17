import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {BsBriefcaseFill} from 'react-icons/bs'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  render() {
    const onLogout = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    return (
      <div className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image-size"
          />
        </Link>
        <ul className="unordered-container-ls">
          <Link to="/" className="link-items">
            <li>Home</li>
          </Link>

          <Link to="/jobs" className="link-items">
            <li>Jobs</li>
          </Link>
        </ul>
        <div className="logout-container-ls">
          <button className="logout-btn" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
        <ul className="mobile-nav-container">
          <Link to="/">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="small-logo-size"
              />
            </li>
          </Link>
          <Link to="/">
            <li>
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsBriefcaseFill className="icon" />
            </li>
          </Link>
          <li>
            <button className="btn" type="button" onClick={onLogout}>
              <FiLogOut className="icon" />
            </button>
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(Header)
