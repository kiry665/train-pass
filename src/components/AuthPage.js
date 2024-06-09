import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AuthPage.css';
import Cookies from 'js-cookie';

const AuthPage = ({onLogin}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
  }

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const onSubmitLogin = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: data.username,
        password: data.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      });

      const token = response.data.token;
      const expires = new Date(response.data.expires)

      Cookies.set('token', token, { expires: expires });
      Cookies.set('username', data.username, { expires: expires });

      clearMessages();
      setSuccessMessage('You are login')
      navigate("/")
      handleLogin();
    } catch (error) {
      clearMessages();
      setErrorMessage('Login Failed')
    }
  };

  const onSubmitRegister = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username: data.username,
        password: data.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'text'
      });

      setErrorMessage('');
      setSuccessMessage('Registration successful');
      } catch (error) {
      if (error.response && error.response.status === 400) {
        setSuccessMessage('')
        setErrorMessage(error.response.data);
      } else {
        
      }
    }
  };

  const handleTabChange = () => {
    clearMessages();
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(isLogin ? onSubmitLogin : onSubmitRegister)}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" {...register('username', { required: true })} />
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password', { required: true })} />
          {errors.password && <span>This field is required</span>}
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: true,
                validate: value =>
                  value === watch('password') || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    );
  };

  return (
    
    <div className="auth-page">
      <div className="tab-container" onClick={handleTabChange}>
        <button className={`tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
        <button className={`tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Register</button>
      </div>
      <div className="auth-form">
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthPage;