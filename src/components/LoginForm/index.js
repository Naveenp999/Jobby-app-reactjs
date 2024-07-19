import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  fetchDetails = async () => {
    const {username, password} = this.state
    const {history} = this.props
    const details = {
      username,
      password,
    }
    const options = {
      body: JSON.stringify(details),
      method: 'POST',
    }
    const element = await fetch('https://apis.ccbp.in/login', options)
    const data = await element.json()
    if (element.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({
        isError: true,
        errorMsg: data.error_msg,
        username: '',
        password: '',
      })
    }
  }

  formSubmit = event => {
    event.preventDefault()
    this.fetchDetails()
  }

  passwordChange = event => this.setState({password: event.target.value})

  usernameChange = event => this.setState({username: event.target.value})

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg, isError} = this.state
    return (
      <div className="loginform-container">
        <form className="login-content" onSubmit={this.formSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label className="label first" htmlFor="input1-slot">
            USERNAME
          </label>
          <input
            className="input"
            type="text"
            onChange={this.usernameChange}
            placeholder="Username"
            id="input1-slot"
            value={username}
          />
          <label className="label" htmlFor="slot2">
            PASSWORD
          </label>
          <input
            className="input"
            type="password"
            onChange={this.passwordChange}
            placeholder="Password"
            id="slot2"
            value={password}
          />
          <button className="button" type="submit">
            Login
          </button>
          {isError && <p className="error-msg">**{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
