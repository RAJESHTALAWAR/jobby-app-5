import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Para from '../Para'
import './index.css'

class HomeRoute extends Component {
  button = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="container">
        <div className="nav-bar-container">
          <div className="image">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="website-logo"
              alt="website logo"
            />
          </div>
          <div className="heading">
            <Link to="/">
              <h1 className="heading1">Home</h1>
            </Link>
            <Link to="/jobs">
              <h1 className="heading1">Jobs</h1>
            </Link>
          </div>
          <div className="logout">
            <button className="button" type="button" onClick={this.button}>
              Logout
            </button>
          </div>
        </div>
        <Para />
      </div>
    )
  }
}

export default HomeRoute
