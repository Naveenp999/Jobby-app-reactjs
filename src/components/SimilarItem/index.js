import {FaStar} from 'react-icons/fa'
import {CgWorkAlt} from 'react-icons/cg'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

const SimilarItem = props => {
  const {content} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = content
  return (
    <div className="company-job-banner similar-item-con">
      <div className="company-details">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="role-container">
          <h1 className="role">{title}</h1>
          <div className="job-item-horizantal">
            <FaStar className="rating-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="side-text">Description</h1>
      <p className="similar-description job-description">{jobDescription}</p>
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
    </div>
  )
}
export default SimilarItem
