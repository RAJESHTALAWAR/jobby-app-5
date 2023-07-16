import './index.css'

const JobItems = props => {
  const {jobItemsDetails} = props
  const {name, profileImageUrl, shortBio} = jobItemsDetails

  return (
    <div className="card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/profile-bg.png"
        className="profile-image"
      />
      <h1 className="heading">{name}</h1>
      <img src={profileImageUrl} className="profile-image" />
      <p className="para">{shortBio}</p>
    </div>
  )
}

export default JobItems
