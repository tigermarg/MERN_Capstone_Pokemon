//Imports
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

export default function SignUp() {
  const [formData, setFormData] = useState({ //State for signUp form
    user: '',
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
    nav('/dashboard'); //Redirect to dashboard after sign up
  }

  return (
    //SignUp form
    <div>
      <h2>Sign Up</h2>
      <SignUpForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
      
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}