import {Component} from 'react'

import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class Para extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-interface-container">
          <h1 className="main-heading">Find The Job That Fits Your Life</h1>
          <p className="interface-details">
            Millions of people are searching for jobs,salary information,
            <br />
            company reviews. Find the jobs that fits your abilities and
            potential.
          </p>
          <div>
            <Link to="/jobs">
              <button className="find-job-btn" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}
export default Para
