import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './component/Login'
import Header from './component/Header'
import JobDetailsDisplay from './component/JobDetailsDisplay'
import SpecificJob from './component/SpecificJob'
import NotFound from './component/NotFound'
import ProtectedRoute from './component/ProtectedRoute'
import './App.css'

const App = () => (
  <div className="bg-container">
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Header} />
      <ProtectedRoute exact path="/jobs" component={JobDetailsDisplay} />
      <ProtectedRoute exact path="/jobs/:id" component={SpecificJob} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
