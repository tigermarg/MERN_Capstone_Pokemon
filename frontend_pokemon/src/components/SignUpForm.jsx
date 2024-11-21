//Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth_context';

function SignUpForm() { 
  const [formData, setFormData] = useState({ //State for signUp form
    user: '',
    email: '',
    password: '',
  });

  const { signUp } = useAuth(); 
  const nav = useNavigate(); //Declare variable for useNavigate

  //Handler for input change
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  //Handler for submit
  async function handleSubmit(e) {
    e.preventDefault();
    await signUp(formData);
    // console.log(formData)
    nav('/dashboard'); //Redirect to dashboard after sign up      
    }

  return (
    //Sign Up Form
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" 
          name="name"
          onChange={handleChange} 
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" 
          name="email" 
          onChange={handleChange} 
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" 
          name="password" 
          onChange={handleChange} 
          required
          minLength="6"
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;