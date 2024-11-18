//Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const [formData, setFormData] = useState({ //State for formData
    username: '',
    email: '',
    password: '',
  });

  const nav = useNavigate(); //Declare variable for useNavigate

  function handleChange(){ //Handler for input changes
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e){ //Handler for submit 
    e.preventDefault();
    nav('/dashboard') //Navigate to dashboard
  }

  return ( //Form data
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          onChange={handleChange} 
          required
          minLengt='5'
        />
      </div>      
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          onChange={handleChange} 
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          onChange={handleChange} 
          required
          minLength='6'
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;