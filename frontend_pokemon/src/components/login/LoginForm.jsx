import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({ //State for formData
    email: '',
    password: '',
  });

  function handleChange(e){ //Handler for input
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
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;