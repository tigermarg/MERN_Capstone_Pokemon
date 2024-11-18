import { useState } from 'react';

function SignUpForm() {
  const [formData, setFormData] = useState({ //State for formData
    username: '',
    email: '',
    password: '',
  });

  function handleChange(){ //Handler for input changes
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e){ //Handler for submit 
    e.preventDefault();
  }

  return (
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