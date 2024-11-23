//Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth_context';

function LoginForm() { 
  const [formData, setFormData] = useState({ //State for login form
    email: '', 
    password: '',
  });

  const [error, setError] = useState(null); //State for error message
  
  const { login } = useAuth(); //Access login function from useAuth
  const nav = useNavigate(); //Hook to navigate

  //Handler for input change
  function handleChange(e) { 
    setFormData({
      ...formData,  //Spread existing formData 
      [e.target.name]: e.target.value,  //Dynamically update value
    });
  }

  //Handler for submit
  async function handleSubmit(e) { 
    e.preventDefault();
    setError(null); //Clear previous error message

    try {

        await login(formData);  //Login with formData
        nav('/dashboard');  //If successful, navigate to dashboard

    } catch (err) {
      setError(err.message) //If error, display error message
      };
    }
  

  return ( //Login Form
    <>  
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>

    {/* If error, display message */}
    <p>{error ? error : null }</p>  
    </>
  );
}

export default LoginForm;