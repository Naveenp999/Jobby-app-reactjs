import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import FilterItems from '../FilterItems'
import Header from '../Header'
import JobItem from '../JobItem'

const apiStatusById = [
  {initial: 'INITIAL'},
  {success: 'SUCCESS'},
  {failure: 'FAILURE'},
  {loading: 'LOADING'},
]

class Jobs extends Component {
  state = {
    activeEmploymentTab: [],
    activeSalaryRange: '',
    search: '',
    jobsList: [],
    Total: 0,
    activeMode: apiStatusById[0].initial,
  }

  componentDidMount() {
    this.fetchDataFromUrl()
  }

  retry = () => {
    this.setState({activeMode: apiStatusById[0].initial}, this.fetchDataFromUrl)
  }

  fetchDataFromUrl = async () => {
    this.setState({activeMode: apiStatusById[3].loading})

    const {activeEmploymentTab, activeSalaryRange, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const filterItem = activeEmploymentTab.join(',')
    console.log(filterItem)
    const filtersUrl = `employment_type=${filterItem}&minimum_package=${activeSalaryRange}&search=${search}`
    const apiUrl = `https://apis.ccbp.in/jobs?${filtersUrl}`
    const element = await fetch(apiUrl, options)
    if (element.ok === true) {
      const data = await element.json()
      const {jobs, total} = data
      const jobslist = jobs.map(ele => ({
        companyLogoUrl: ele.company_logo_url,
        employmentType: ele.employment_type,
        id: ele.id,
        jobDescription: ele.job_description,
        location: ele.location,
        packagePerAnnum: ele.package_per_annum,
        rating: ele.rating,
        title: ele.title,
      }))
      this.setState({
        jobsList: jobslist,
        Total: total,
        activeMode: apiStatusById[1].success,
      })
    } else {
      this.setState({activeMode: apiStatusById[2].failure})
    }
  }

  getNOProductsView = () => (
    <div className="no-products">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-banner"
      />
      <h1 className="head">No Jobs Found</h1>
      <p className="desc">We could not find any jobs, Try other filters.</p>
    </div>
  )

  getAllJobs = () => {
    const {jobsList, Total} = this.state
    if (Total > 0) {
      return (
        <ul className="jobs-list-con">
          {jobsList.map(element => (
            <JobItem content={element} key={element.id} />
          ))}
        </ul>
      )
    }
    return this.getNOProductsView()
  }

  salaryChange = item => {
    this.setState({activeSalaryRange: item}, this.fetchDataFromUrl)
  }

  employeChange = item => {
    const {activeEmploymentTab} = this.state
    const index = activeEmploymentTab.findIndex(sortItem => sortItem === item)
    let newList = []
    if (index !== -1) {
      activeEmploymentTab.splice(index, 1)
      newList = [...activeEmploymentTab]
    } else {
      newList = [...activeEmploymentTab, item]
    }
    this.setState({activeEmploymentTab: [...newList]}, this.fetchDataFromUrl)
  }

  searchChange = event => this.setState({search: event.target.value})

  searchClicked = () => this.fetchDataFromUrl()

  loadingResults = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noResults = () => (
    <div className="no-products">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-banner"
      />
      <h1 className="head">OOPS! Something Went Wrong</h1>
      <p className="desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="button" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  selectOne = () => {
    const {activeMode} = this.state
    switch (activeMode) {
      case apiStatusById[1].success:
        return this.getAllJobs()
      case apiStatusById[2].failure:
        return this.noResults()
      case apiStatusById[3].loading:
        return this.loadingResults()
      default:
        return null
    }
  }

  render() {
    const {search, activeEmploymentTab, activeSalaryRange} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-filters-main">
          <div className="jobs-filters-sub">
            <div className="search-container-small">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={search}
                onChange={this.searchChange}
              />
              <button
                className="search-button"
                type="button"
                onClick={this.searchClicked}
                data-testid="searchButton"
                aria-label="search"
              >
                <BsSearch />
              </button>
            </div>
            <div className="filter-con">
              <FilterItems
                employeTab={activeEmploymentTab}
                salaryTab={activeSalaryRange}
                salaryFilter={this.salaryChange}
                employeFilter={this.employeChange}
              />
            </div>
            <div className="jobs-list">
              <div className="search-container-large">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  value={search}
                  onChange={this.searchChange}
                />
                <button
                  className="search-button"
                  type="button"
                  onClick={this.searchClicked}
                  data-testid="searchButton"
                  aria-label="search"
                >
                  <BsSearch />
                </button>
              </div>
              {this.selectOne()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
