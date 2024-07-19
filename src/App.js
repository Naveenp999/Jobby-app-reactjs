import './App.css'

import {Switch, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import JobApplication from './components/JobApplication'

import NotFound from './components/NotFound'

import Home from './components/Home'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobApplication} />
    <Route exact path="/bad-path" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
)

export default App
