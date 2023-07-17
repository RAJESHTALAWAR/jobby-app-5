import {Component} from 'react'

import './index.css'

class EmploymentItem extends Component {
  render() {
    const {typeEmployment, typeEmploy} = this.props
    const {label, employmentTypeId} = typeEmployment

    const typeEmployeeChange = () => {
      typeEmploy(employmentTypeId)
    }

    return (
      <li className="types-employ-list-container">
        <input
          type="checkbox"
          id={employmentTypeId}
          className="checkbox"
          onChange={typeEmployeeChange}
        />
        <label htmlFor={employmentTypeId}>{label}</label>
      </li>
    )
  }
}

export default EmploymentItem
