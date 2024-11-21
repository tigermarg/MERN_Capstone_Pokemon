//Imports
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

export default function SignUp() {

  return (
    <div>
      <h2>Sign Up</h2>
      <SignUpForm />
      
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}