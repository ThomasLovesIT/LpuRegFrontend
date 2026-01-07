import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin.jsx';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, loading, error} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
  await login(email, password);
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-primary/20">
          
          <form className="card-body" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-bold text-center mb-4 text-primary">
                Welcome Back
            </h3>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="email@example.com"
                className="input input-bordered input-primary w-full" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="********"
                className="input input-bordered input-primary w-full" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>

          <div className="form-control mt-6">
              {/* 🔴 FIX 3: Attribute is 'disabled' */}
              <button disabled={loading} className="btn btn-primary">
                {/* Optional: Add spinner */}
                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
              </button>
            </div>

              {/* Error Message */}
            {error && (
                <div role="alert" className="alert alert-error mt-4 p-2 text-sm">
                    <span>{error}</span>
                </div>
            )}

             {/* UX Helper: Link to Register */}
             <p className="text-center mt-4 text-sm">
                New to ThinkBoard?{' '}
                <Link to="/register" className="link link-primary font-semibold">
                    Create an account
                </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;