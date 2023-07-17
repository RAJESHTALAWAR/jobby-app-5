import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMessage: ''}

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onSubmitFailure = errorMessage => {
    this.setState({isError: true, errorMessage})
    console.log(errorMessage)
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const fetchedData = await fetch(url, options)
    const data = await fetchedData.json()
    if (fetchedData.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      this.setState({username: '', password: ''})
    } else {
      this.onSubmitFailure(data.error_msg)
      this.setState({username: '', password: ''})
    }
  }

  render() {
    const {isError, errorMessage, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image-size"
          />
          <form onSubmit={this.onSubmitForm} className="form-container">
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="input-bar"
              onChange={this.usernameChange}
              value={username}
            />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input-bar"
              onChange={this.passwordChange}
              value={password}
            />
            <br />
            <button className="login-btn" type="submit">
              Login
            </button>
            {isError && <p className="error-message">*{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
