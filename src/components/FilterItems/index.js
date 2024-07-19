import './index.css'
import Profile from '../Profile'

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

const FilterItems = props => {
  const {employeTab, salaryTab, salaryFilter, employeFilter} = props

  const employeClass = element => {
    const index = employeTab.findIndex(id => id === element.employmentTypeId)
    if (index !== -1) {
      return 'filter-item active'
    }
    return 'filter-item'
  }

  const salaryClass = element => {
    if (element.salaryRangeId === salaryTab) {
      return 'active filter-item'
    }
    return 'filter-item'
  }

  const employmentOptionClicked = event => {
    employeFilter(event.target.value)
  }

  const salaryOptionClicked = event => salaryFilter(event.target.value)

  return (
    <div className="filter-container">
      <Profile />
      <hr className="line" />
      <h1 className="side-heading">Type of Employment</h1>
      <ul className="filters-con ">
        {employmentTypesList.map(item => (
          <li key={item.employmentTypeId}>
            <button className="item-btn" type="button">
              <input
                type="checkbox"
                value={item.employmentTypeId}
                onClick={employmentOptionClicked}
                className="tick"
              />
              <p className={employeClass(item)}>{item.label}</p>
            </button>
          </li>
        ))}
      </ul>
      <hr className="line" />
      <h1 className="side-heading">Salary Range</h1>
      <ul className="filters-con">
        {salaryRangesList.map(item => (
          <li key={item.salaryRangeId}>
            <button className="item-btn" type="button">
              <input
                type="radio"
                className="tick"
                value={item.salaryRangeId}
                name="option"
                onClick={salaryOptionClicked}
                id={item.salaryRangeId}
              />
              <label className={salaryClass(item)} htmlFor={item.salaryRangeId}>
                {item.label}
              </label>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterItems
