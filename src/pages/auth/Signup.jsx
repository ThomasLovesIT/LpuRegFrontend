import { useEffect, useState } from "react";
import { useSignup } from '../../hooks/useSignup.jsx';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 🔴 FIX 2: Use 'loading', matching the hook return value
  const { signup, error, loading } = useSignup() 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed semicolon formatting
    await signup(email, password);
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-primary/20">
          
          <form className="card-body" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-bold text-center mb-4 text-primary">
                Join Us 🌲
            </h3>

            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className={`input input-bordered w-full ${error ? 'input-error' : 'input-primary'}`} 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input 
                type="password" 
                placeholder="********" 
                className={`input input-bordered w-full ${error ? 'input-error' : 'input-primary'}`} 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="form-control mt-6">
              {/* 🔴 FIX 3: Attribute is 'disabled' */}
              <button disabled={loading} className="btn btn-primary">
                {/* Optional: Add spinner */}
                {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
                <div role="alert" className="alert alert-error mt-4 p-2 text-sm">
                    <span>{error}</span>
                </div>
            )}

            <p className="text-center mt-4 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="link link-primary font-semibold">
                    Login here
                </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;