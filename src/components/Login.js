import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate();
    const handleLogin = () => {
        // You can put your login logic here
    
        // After successful login, navigate to another component
        navigate('/'); // Replace '/dashboard' with the path of the component you want to route to
      };
  return (
    
    <form>
  <div className="form-outline mb-4">
    <input type="email" id="form2Example1" className="form-control" />
    <label className="form-label" htmlFor="form2Example1">Email address</label>
  </div>

  <div className="form-outline mb-4">
    <input type="password" id="form2Example2" className="form-control" />
    <label className="form-label" htmlFor="form2Example2">Password</label>
  </div>
  <button type="button" onClick={handleLogin} className="btn btn-primary btn-block mb-4">Sign in</button>

  <div className="text-center">
    <p>Not a member? <Link to="#">Register</Link></p>

  </div>
</form>
    
  )
}

export default Login