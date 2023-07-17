import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobs
  return (
    <li className="similar-list-card">
      <div className="similar-profile-container">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="titled-container">
          <h1 className="company-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="description-para">{jobDescription}</p>
      <div className="similar-jobs-container">
        <div>
          <p>{location}</p>
        </div>
        <div>
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
