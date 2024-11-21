function LoginForm({ formData, handleChange, handleSubmit }) { //Pass props from Login page
  return (
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
  );
}

export default LoginForm;