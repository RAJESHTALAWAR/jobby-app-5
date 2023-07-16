import {Component} from 'react'
import Cookies from 'js-cookie'

import HomeRoute from '../HomeRoute'
import JobItems from '../JobItems'

const apisStatus = {
  initial: 'INITial',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobsRoute extends Component {
  state = {profileList: [], status: apisStatus.initial}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      status: apisStatus.initial,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.true) {
      const updatedData = data.profile_details.map(each => ({
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.shaort_bio,
      }))

      this.setState({status: apisStatus.success, profileList: updatedData})
    }
  }

  render() {
    const {profileList} = this.state
    return (
      <div className="jobs-container">
        <HomeRoute />
        <div className="card-container">
          {profileList.map(each => (
            <JobItems jobItemsDetails={each} key={each.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default JobsRoute
