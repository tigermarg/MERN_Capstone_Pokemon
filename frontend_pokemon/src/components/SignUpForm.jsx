function SignUpForm({ formData, handleChange, handleSubmit }) { //Pass props from SignUp page
  
  // POST route using fetch to create new user 
  // async function handleClick(){
  //   try {
  //     let res = await fetch('http://localhost:3000/api/users/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData), // Convert form data to JSON
  //     });
  
  //     let data = await res.json();
      
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
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
  );
}

export default SignUpForm;