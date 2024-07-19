import {FaStar} from 'react-icons/fa'
import {CgWorkAlt} from 'react-icons/cg'
import {Component} from 'react'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {IoLocationSharp} from 'react-icons/io5'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import SimilarItem from '../SimilarItem'

import Header from '../Header'

import './index.css'

const apiStatusById = [
  {initial: 'INITIAL'},
  {success: 'SUCCESS'},
  {failure: 'FAILURE'},
  {loading: 'LOADING'},
]

class JobApplication extends Component {
  state = {
    jobDetails: '',
    similarJobs: [],
    activeMode: apiStatusById[0].initial,
  }

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    this.setState({activeMode: apiStatusById[3].loading})
    const {match} = this.props
    const {params} = match
    const ide = params.id
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const element = await fetch(`https://apis.ccbp.in/jobs/${ide}`, options)
    if (element.ok === true) {
      const data = await element.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs

      const {description} = jobDetails.life_at_company
      const imageUrl = jobDetails.life_at_company.image_url
      const LifeCompany = {imageUrl, description}
      const SkillsList = jobDetails.skills.map(item => ({
        imageUrl: item.image_url,
        name: item.name,
      }))

      const SimilarJobs = similarJobs.map(ITEM => ({
        companyLogoUrl: ITEM.company_logo_url,
        employmentType: ITEM.employment_type,
        id: ITEM.id,
        jobDescription: ITEM.job_description,
        location: ITEM.location,
        rating: ITEM.rating,
        title: ITEM.title,
      }))

      const newJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: [...SkillsList],
        lifeAtCompany: {...LifeCompany},
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      this.setState({
        jobDetails: newJobDetails,
        similarJobs: SimilarJobs,
        activeMode: apiStatusById[1].success,
      })
    } else {
      this.setState({activeMode: apiStatusById[2].failure})
    }
  }

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

  loadingResults = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getApplication = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    console.log(skills)
    return (
      <>
        <Header />
        <div className="application-container">
          <div className="sub-application-container">
            <div className="company-job-banner application-content">
              <div className="company-details">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
                <div className="role-container">
                  <h1 className="role">{title}</h1>
                  <div className="job-item-horizantal">
                    <FaStar className="react-icon rating-icon" />
                    <p className="rating">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="package-con">
                <div className="job-item-horizantal">
                  <div className="job-item-horizantal">
                    <IoLocationSharp className="react-icon" />
                    <p className="item-description">{location}</p>
                  </div>
                  <div className="job-item-horizantal space">
                    <BsBriefcaseFill className="react-icon" />
                    <p className="item-description">{employmentType}</p>
                  </div>
                </div>
                <p className="package-text">{packagePerAnnum}</p>
              </div>
              <hr className="jobs-line" />
              <div className="package-con">
                <h1 className="side-text">Description</h1>
                <div className="job-item-horizantal">
                  <p className="job-description">Visit</p>
                  <a className="item-description" href={companyWebsiteUrl}>
                    <FiExternalLink className="react-icon space" />{' '}
                  </a>
                </div>
              </div>
              <p className="job-description">{jobDescription}</p>
              <h1 className="side-text">Skills</h1>
              <ul className="skills-container">
                {skills.map(element => (
                  <li className="skill-item" key={element.name}>
                    <img
                      src={element.imageUrl}
                      alt={element.name}
                      className="skill-icon"
                    />
                    <p className="space job-description">{element.name}</p>
                  </li>
                ))}
              </ul>
              <h1 className="side-text">Life at Company</h1>
              <div className="company-experience">
                <p className="job-description company-text">
                  {lifeAtCompany.description}
                </p>
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="company"
                  className="company-picture"
                />
              </div>
            </div>
            <h1 className="side-text">Similar Jobs</h1>
            <ul className="similar-jobs-container">
              {similarJobs.map(Item => (
                <SimilarItem content={Item} key={Item.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  retry = () => {
    this.setState({activeMode: apiStatusById[0].initial}, this.fetchDetails)
  }

  noResults = () => (
    <div className="no-products">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-banner"
      />
      <h1 className="heading">OOPS! Something Went Wrong</h1>
      <p className="description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="button" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  render() {
    return this.selectOne()
  }
}

export default JobApplication
