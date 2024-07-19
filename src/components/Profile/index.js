import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

const apiStatusById = [
  {initial: 'INITIAL'},
  {success: 'SUCCESS'},
  {failure: 'FAILURE'},
  {loading: 'LOADING'},
]

class Profile extends Component {
  state = {
    name: '',
    profileImageUrl: '',
    shortBio: '',
    activeMode: apiStatusById[0].initial,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({activeMode: apiStatusById[3].loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const element = await fetch('https://apis.ccbp.in/profile', options)

    const data = await element.json()
    if (element.ok === true) {
      this.setState({
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
        activeMode: apiStatusById[1].success,
      })
    } else {
      this.setState({activeMode: apiStatusById[2].failure})
    }
  }

  retry = () => {
    this.setState({activeMode: apiStatusById[0].initial}, this.getUserDetails)
  }

  getApplication = () => {
    const {name, shortBio, profileImageUrl} = this.state
    return (
      <div className="profile-main-banner">
        <div className="profile-banner">
          <img src={profileImageUrl} alt="profile" className="profile-photo" />
          <h1 className="name">{name}</h1>
          <p className="bio-description">{shortBio}</p>
        </div>
      </div>
    )
  }

  loadingResults = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noResults = () => (
    <div className="no-products">
      <button className="button" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  selectOne = () => {
    const {activeMode} = this.state
    switch (activeMode) {
      case apiStatusById[1].success:
        return this.getApplication()
      case apiStatusById[2].failure:
        return this.noResults()
      case apiStatusById[3].loading:
        return this.loadingResults()
      default:
        return null
    }
  }

  render() {
    return this.selectOne()
  }
}

export default Profile
