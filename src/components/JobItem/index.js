import {FaStar} from 'react-icons/fa'
import {CgWorkAlt} from 'react-icons/cg'
import {Link, withRouter} from 'react-router-dom'
import './index.css'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

const JobItem = props => {
  const {content} = props
  const {
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    companyLogoUrl,
    employmentType,
  } = content
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="company-job-banner">
        <div className="company-details">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <div>
          <hr className="job-line" />
        </div>
        <h1 className="side-text">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default withRouter(JobItem)
