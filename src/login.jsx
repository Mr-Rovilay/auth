import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const AuthForm = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({
    login: { email: '', password: '' },
    signup: { fullName: '', email: '', password: '' }
  });

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    // Reset forms when switching
    setErrors({
      login: { email: '', password: '' },
      signup: { fullName: '', email: '', password: '' }
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = { email: '', password: '' };
    
    if (!loginForm.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(prev => ({ ...prev, login: newErrors }));

    if (!newErrors.email && !newErrors.password) {
      console.log('Login form submitted:', loginForm);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newErrors = { fullName: '', email: '', password: '' };
    
    if (!signupForm.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!signupForm.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(signupForm.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!signupForm.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(signupForm.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(prev => ({ ...prev, signup: newErrors }));

    if (!newErrors.fullName && !newErrors.email && !newErrors.password) {
      console.log('Signup form submitted:', signupForm);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-200">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="absolute top-0 flex w-full h-full">
          
          {/* Login Form */}
          <div className={`w-1/2 h-full transition-all duration-700 ease-in-out ${isLoginActive ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <div className="flex flex-col justify-center h-full p-8">
              <h2 className="mb-6 text-3xl font-bold text-gray-800 transition-all duration-500 ease-in-out transform ${isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">Welcome Back</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className={`transition-all duration-500 ease-in-out delay-100 transform ${isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 pl-10 mt-1 transition-all duration-300 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.login.email && <p className="mt-1 text-sm text-red-500">{errors.login.email}</p>}
                </div>
                <div className={`transition-all duration-500 ease-in-out delay-200 transform ${isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full p-3 pl-10 pr-10 mt-1 transition-all duration-300 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute text-gray-400 transition-colors duration-300 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.login.password && <p className="mt-1 text-sm text-red-500">{errors.login.password}</p>}
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                  Login
                </button>
              </form>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className={`w-1/2 h-full transition-all duration-700 ease-in-out ${!isLoginActive ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="flex flex-col justify-center h-full p-8">
              <h2 className="mb-6 text-3xl font-bold text-gray-800 transition-all duration-500 ease-in-out transform ${!isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">Create Account</h2>
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className={`transition-all duration-500 ease-in-out delay-100 transform ${!isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full p-3 pl-10 mt-1 transition-all duration-300 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.signup.fullName && <p className="mt-1 text-sm text-red-500">{errors.signup.fullName}</p>}
                </div>
                <div className={`transition-all duration-500 ease-in-out delay-200 transform ${!isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 pl-10 mt-1 transition-all duration-300 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.signup.email && <p className="mt-1 text-sm text-red-500">{errors.signup.email}</p>}
                </div>
                <div className={`transition-all duration-500 ease-in-out delay-300 transform ${!isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full p-3 pl-10 pr-10 mt-1 transition-all duration-300 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute text-gray-400 transition-colors duration-300 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                    >
                      {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.signup.password && <p className="mt-1 text-sm text-red-500">{errors.signup.password}</p>}
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${!isLoginActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>

          {/* Decorative Background Element */}
          <div 
            className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-orange-400 to-orange-600 transition-all duration-700 ease-in-out transform ${
              isLoginActive ? 'translate-x-full' : 'translate-x-0'
            }`}
            onClick={toggleForm}
          >
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center text-white">
                <h3 className={`mb-4 text-3xl font-bold transition-all duration-500 ease-in-out transform ${isLoginActive ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-3'}`}>
                  {isLoginActive ? "New Here?" : "One of us?"}
                </h3>
                <p className={`mb-6 transition-all duration-500 ease-in-out delay-100 transform ${isLoginActive ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-3'}`}>
                  {isLoginActive 
                    ? "Join us and start your journey today!" 
                    : "To keep connected with us please login with your personal info"}
                </p>
                <button
                  className={`px-8 py-3 text-white transition-all duration-300 ease-in-out border-2 border-white rounded-lg hover:bg-white hover:text-orange-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${isLoginActive ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-3'}`}
                >
                  {isLoginActive ? "Sign Up" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

