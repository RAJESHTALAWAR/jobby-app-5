import {Component} from 'react'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

class JobDetailsItem extends Component {
  render() {
    const {jobDetails} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <li>
        <Link to={`/jobs/${id}`} className="link-items">
          <div className="job-detailed-card">
            <div className="job-top-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="job details company logo"
              />
              <div className="titled-container">
                <h1 className="company-title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-color" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-middle-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p>{location}</p>
              </div>
              <div className="type-job-container">
                <BsBriefcaseFill className="location-icon" />
                <p>{employmentType}</p>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line" />
            <h1 className="description-heading">Description</h1>
            <p className="description-para">{jobDescription}</p>
          </div>
        </Link>
      </li>
    )
  }
}

export default JobDetailsItem
