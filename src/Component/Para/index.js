import {Link} from 'react-router-dom'
import './index.css'

const Para = () => (
  <div className="main-container">
    <h1 className="heading">Find the Job that Fits Your Life</h1>
    <p className="para">
      A broad written statement of a specific job basically is known as a job
      description. It usually includes roles, purpose, responsibilities, scope,
      and working conditions of a job along with the job's title, and the
      designation of the person to whom the employee reports.
    </p>
    <Link to="/jobs">
      <button type="button" className="button">
        Find Jobs
      </button>
    </Link>
  </div>
)

export default Para
