import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import users from "../../utils/mockUsers";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button"; // Assuming this is your custom Button
import { UserLock } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      dispatch(loginSuccess(user));
      setError("");

      if (user.role === "Developer") {
        navigate("/developer-dashboard");
      } else if (user.role === "Manager") {
        navigate("/manager-dashboard");
      }
    } else {
      setError("Invalid email or password");
      dispatch(loginFailure("Invalid credentials"));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
          <div className="text-center space-y-2">
            <UserLock className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Sign in to TaskNavigator
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              id="login-btn"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              type="submit"
              value="Login"
            />
          </form>

          {error && (
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}

          {/* <div className="text-sm text-center text-gray-500 pt-2 border-t border-gray-200">
            <p>Demo Credentials:</p>
            <p>Developer:  developer@fealtyx.com / dev@123</p>
            <p>Manager: manager@fealtyx.com / manager@123</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
