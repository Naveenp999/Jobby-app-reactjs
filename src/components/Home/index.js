import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = props => {
  const {history} = props

  return (
    <div className="home-container">
      <Header />
      <div className="home-content-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs, salary information, company
          reviews
        </p>
        <Link to="/jobs" className="link">
          <button className="jobs-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
