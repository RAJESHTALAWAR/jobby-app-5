import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import SalaryRangeItems from '../SalaryRangeItem'
import EmploymentItem from '../EmploymentItem'
import JobDetailsItem from '../JobDetailsItem'

import './index.css'

const apiConstantStatus = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobDetailsDisplay extends Component {
  state = {
    jobDetailsList: [],
    profileDetails: {},
    isLoading: false,
    search: '',
    type: '',
    salaryType: '',
    isProfileLoading: false,
    profileFailure: false,
    apiStatus: '',
    isJobsLoading: false,
  }

  componentDidMount() {
    this.getJobsDetails()
    this.getProfileDetails()
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.progress, isJobLoading: true})
    const {search, type, salaryType} = this.state
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${salaryType}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchedResponse = await fetch(url, options)
    const data = await fetchedResponse.json()
    console.log(data)
    if (fetchedResponse.ok === true) {
      const convertedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(convertedData)
      this.setState({
        jobDetailsList: convertedData,
        isJobsLoading: false,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstantStatus.failure,
        isJobsLoading: false,
      })
    }
  }

  retryProfile = () => {
    this.getProfileDetails()
  }

  retryJobDetails = () => {
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    this.setState({isProfileLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchedResponse = await fetch(url, options)
    const data = await fetchedResponse.json()
    console.log(data)
    if (fetchedResponse.ok) {
      const profileConvertedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: profileConvertedData,
        isProfileLoading: false,
      })
    } else {
      this.setState({isProfileLoading: false, profileFailure: true})
    }
  }

  onSearchInput = event => {
    this.setState({search: event.target.value})
    this.getJobsDetails()
  }

  onChangeEmployee = employmentTypeId => {
    this.setState({type: employmentTypeId})
    this.getJobsDetails()
  }

  onChangeSalary = salaryRangeId => {
    this.setState({salaryType: salaryRangeId})
    this.getJobsDetails()
  }

  renderProfile = () => {
    const {profileDetails, isProfileLoading, profileFailure} = this.state

    return (
      <>
        {profileFailure ? (
          <div className="failure-profile-container">
            <button
              className="find-job-btn"
              type="button"
              onClick={this.retryProfile}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {isProfileLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <div className="profile-container">
                <img
                  src={profileDetails.profileImageUrl}
                  className="profile-image-size"
                  alt="profile"
                />
                <h1 className="profile-name">{profileDetails.name}</h1>
                <p className="profile-description">{profileDetails.shortBio}</p>
              </div>
            )}
          </>
        )}
      </>
    )
  }

  renderJobsLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image-size"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <div className="failure-profile-container">
        <button
          className="find-job-btn"
          type="button"
          onClick={this.retryJobDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetailsList} = this.state

    return (
      <div className="bg">
        {jobDetailsList.length === 0 ? (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="failure-image-size"
            />
            <h1 className="failure-heading">No Jobs Found</h1>
            <p className="failure-para">
              We could not find any jobs. Try other filters
            </p>
          </div>
        ) : (
          <ul className="jobs-container">
            {jobDetailsList.map(eachItem => (
              <JobDetailsItem jobDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderJobsAllRender = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.progress:
        return this.renderJobsLoader()
      case apiConstantStatus.success:
        return this.renderJobDetails()
      case apiConstantStatus.failure:
        return this.renderJobDetailsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-detailed-container">
          <div className="right-detailed-container">
            {this.renderProfile()}
            <hr />
            <div className="type-employment-container">
              <h1 className="employ-heading">Type of Employment</h1>
              <ul className="unordered-type-employ-container">
                {employmentTypesList.map(eachItem => (
                  <EmploymentItem
                    typeEmployment={eachItem}
                    key={eachItem.employmentTypeId}
                    typeEmploy={this.onChangeEmployee}
                  />
                ))}
              </ul>
            </div>
            <hr />
            <div className="salary-details-container">
              <h1 className="employ-heading">Salary Range</h1>
              <ul className="unordered-type-employ-container">
                {salaryRangesList.map(eachItem => (
                  <SalaryRangeItems
                    salaryRange={eachItem}
                    key={eachItem.salaryRangeId}
                    salaryPackage={this.onChangeSalary}
                  />
                ))}
              </ul>
            </div>
          </div>

          <div className="left-detailed-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                onChange={this.onSearchInput}
                placeholder="search"
              />
              <div className="search-icon-container">
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-btn"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderJobsAllRender()}
          </div>
        </div>
      </>
    )
  }
}
export default JobDetailsDisplay
