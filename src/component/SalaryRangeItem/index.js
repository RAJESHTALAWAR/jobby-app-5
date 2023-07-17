import {Component} from 'react'

import './index.css'

class SalaryRangeItems extends Component {
  render() {
    const {salaryRange, salaryPackage} = this.props
    const {salaryRangeId, label} = salaryRange

    const salary = () => {
      salaryPackage(salaryRangeId)
    }

    return (
      <li className="types-employ-list-container">
        <input
          type="radio"
          id={salaryRangeId}
          name="option"
          className="checkbox"
          onChange={salary}
        />
        <label htmlFor={salaryRangeId}>{label}</label>
      </li>
    )
  }
}

export default SalaryRangeItems
