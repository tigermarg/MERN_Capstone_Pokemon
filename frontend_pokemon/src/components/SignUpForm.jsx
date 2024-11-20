function SignUpForm({ formData, handleChange, handleSubmit }) { //Pass props from SignUp page
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange} 
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange} 
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" 
          name="password" 
          value={formData.password}
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