import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ //State for formData
    email: '',
    password: '',
  });

  const nav = useNavigate();

  function handleChange(e){ //Handler for input
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e){ //Handler for submit
    e.preventDefault();
    nav('/dashboard') //navigate to dashboard
  }

  return (  //Form data
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;