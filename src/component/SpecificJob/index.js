import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'

import Header from '../Header'

import SkillItem from '../SkillItem'

import SimilarJobs from '../SimilarJobs'

import './index.css'

class SpecificJob extends Component {
  state = {jobDetails: {}, lifeAtCompany: {}, similarJob: [], skillsList: []}

  componentDidMount() {
    this.getSpecificJobs()
  }

  getSpecificJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchedResponse = await fetch(url, options)
    const data = await fetchedResponse.json()
    console.log(data)

    const convertedJobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
    }
    console.log(convertedJobDetails)

    const convertedLifeAtCompany = {
      description: data.job_details.life_at_company.description,
      imageUrl: data.job_details.life_at_company.image_url,
    }
    console.log(convertedLifeAtCompany)

    const convertedSkills = data.job_details.skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))
    console.log('skillsDown')
    console.log(convertedSkills)

    const convertedSimilarJobs = data.similar_jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))

    console.log(convertedSimilarJobs)

    this.setState({
      similarJob: convertedSimilarJobs,
      skillsList: convertedSkills,
      jobDetails: convertedJobDetails,
      lifeAtCompany: convertedLifeAtCompany,
    })
  }

  render() {
    const {lifeAtCompany, similarJob, skillsList, jobDetails} = this.state
    return (
      <>
        <Header />
        <div className="specific-job-container">
          <div className="job-top-container">
            <img src={jobDetails.companyLogoUrl} className="company-logo" />
            <div className="titled-container">
              <h1 className="company-title">{jobDetails.title}</h1>
              <div className="rating-container">
                <p className="location-name">
                  <AiFillStar /> {jobDetails.rating}
                </p>
              </div>
            </div>
          </div>
          <div className="job-middle-container">
            <div className="location-container">
              <p className="location-name">{jobDetails.location}</p>
            </div>
            <div className="type-job-container">
              <p className="location-name">{jobDetails.employmentType}</p>
            </div>
            <p className="location-name">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="description-link-container">
            <h1 className="description-heading">Description</h1>
            <a href={jobDetails.companyWebsiteUrl}>
              Visit <FiExternalLink />
            </a>
          </div>
          <p className="description-para">{jobDetails.jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="unordered-skills-container">
            {skillsList.map(eachItem => (
              <SkillItem eachSkills={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <div className="life-at-company-container">
            <div>
              <h1 className="skills-heading">Life at company</h1>
              <p className="description-life">{lifeAtCompany.description}</p>
            </div>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="unordered-similar-container">
          {similarJob.map(eachItem => (
            <SimilarJobs similarJobs={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }
}

export default SpecificJob
