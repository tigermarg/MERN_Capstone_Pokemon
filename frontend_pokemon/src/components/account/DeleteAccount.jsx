import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth_context';

function DeleteAccountButton() {
  const [error, setError] = useState(null);  //State for handling errors
  const [message, setMessage] = useState(null);  //State for handling success message
  const { deleteAccount, logout } = useAuth();  //Extract functions from auth context

  const nav = useNavigate();  //Navigation hook

  //Handler for deleting account
  const handleDelete = async () => {

    //Confirm before deleting
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {

      try {

        const data = await deleteAccount();  //Call deleteAccount function from context

        //If succsessful, display success message
        setMessage(data.msg);

        //Wait 2 seconds before logging out and navigating to home
        setTimeout(() => {
          logout();
          nav('/'); 
        }, 2000);

      } catch (err) {
        setError(err.message || 'Something went wrong');
    }}
  };

  return (
    <div>
      {/* Delete button */}
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Delete Account
      </button>

      {/* Display error or success message */}
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {message && <p style={{ color: 'green' }}>{message}</p>} 
    </div>
  );
}

export default DeleteAccountButton;