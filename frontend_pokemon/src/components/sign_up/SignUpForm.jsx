//Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth_context';

function SignUpForm() { 
  const [formData, setFormData] = useState({ //State for signUp form
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); //State for error message

  const { signUp } = useAuth(); //Access signUp function from useAuth
  const nav = useNavigate(); //Hook to navigate

  //Handler for input change
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,  //Dynamically update value
    });
  }

  //Handler for submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); //Clear previous errors before submit

    try{
      await signUp(formData); //Call signUp from context

      nav('/dashboard'); //If successful, navigate to dashboard

    } catch (err){
      setError(err.message); //If error, display error message
    }
  }

  return (
    //Sign Up Form
    <>
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

    {/* If error, display... */}
    <p>{error ? error : null }</p>  
    </>    
  );
}

export default SignUpForm;