import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    showMessage: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  successSubmit = jwtToken => {
    const {history} = this.props
    history.replace('/')
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {expire: 30})
  }

  failureSubmit = error => {
    this.setState({showMessage: true, error})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      console.log(response)
      this.successSubmit(data.jwt_token)
      this.setState({username: '', password: ''})
    } else {
      this.failureSubmit(data.error_msg)
      this.setState({username: '', password: ''})
    }
  }

  render() {
    const {showMessage, error, password, username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form" onSubmit={this.onClickSubmit}>
            <div className="label">
              <label htmlFor="username" className="username">
                USERNAME
              </label>
              <input
                className="input"
                id="username"
                placeholder="USERNAME"
                onChange={this.onChangeUsername}
                type="text"
                value={username}
                autoComplete="username"
              />
            </div>
            <div className="label">
              <label htmlFor="current-password" className="username">
                PASSWORD
              </label>
              <input
                className="input"
                id="current-password"
                placeholder="PASSWORD"
                type="password"
                onChange={this.onChangePassword}
                value={password}
                autoComplete="current-password"
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
            {showMessage && <p className="para">*{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
