import { useState } from 'react';
import LoginForm from '../components/login/LoginForm';
import SignUpForm from '../components/login/signUpForm';

export default function Login(){
  const [isLogin, setIsLogin] = useState(true); //State to toggle between LoginForm & SignUpForm

  function toggleForm(){
    setIsLogin(!isLogin); 
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
    {/* Conditional Rendering  */}
      {isLogin ? <LoginForm /> : <SignUpForm />} 

      <button onClick={toggleForm}>
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
      </button>
    </div>
  );
}
