//Imports
import { Link } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';

export default function Login() {

  return (
    <div >
      <h2>Start Your Journey!</h2>
      <LoginForm />
      
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}