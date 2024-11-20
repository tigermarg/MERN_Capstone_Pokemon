//imports
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const [formData, setFormData] = useState({ //State for login form
    email: '', 
    password: '',
  });

  const nav = useNavigate(); //Declare variable for useNavigate

  //Handler for input change
  function handleChange(e) { 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  //Handler for submit
  function handleSubmit(e) { 
    e.preventDefault();
    nav('/dashboard'); // Redirect to dashboard after login
  }

  return (
    //Login form
    <div>
      <h2>Login</h2>
      <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
      
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}