//Imports
import { Link } from 'react-router-dom';
import SignUpForm from '../components/sign_up/SignUpForm';

export default function SignUp() {

  return (
    <div>
      <h2>Join the Adventure!</h2>
      <SignUpForm />
      
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}