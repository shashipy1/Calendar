import React, { useState } from 'react';
import './signup.css';
import { Link  } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Signup = ({ setUsername }) => {
    const navigate = useNavigate();
    const [userRegistration, setUserRegistration] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/users/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegistration),
            });
            const data = await response.json();
            Swal.fire(data.error); 
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("username", data.username);
                setUsername(userRegistration.username);
                navigate("/calendar");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <form className="form" action="" onSubmit={handleSubmit}>
                <div>
                    <div className="title">Registration Form</div>
                    <label className="user-details" htmlFor="username">
                        username
                    </label>
                    <input
                        type="text"
                        className="input-box"
                        autoComplete="off"
                        value={userRegistration.username}
                        onChange={handleInput}
                        name="username"
                        id="username"
                    />
                </div>
                <div>
                    <label className="user-details" htmlFor="email">
                        email
                    </label>
                    <input
                        type="text"
                        className="input-box"
                        autoComplete="off"
                        value={userRegistration.email}
                        onChange={handleInput}
                        name="email"
                        id="email"
                    />
                </div>
                <div>
                    <label className="user-details" htmlFor="phone">
                        phone
                    </label>
                    <input
                        type="text"
                        className="input-box"
                        autoComplete="off"
                        value={userRegistration.phone}
                        onChange={handleInput}
                        name="phone"
                        id="phone"
                    />
                </div>
                <div>
                    <label className="user-details" htmlFor="password">
                        password
                    </label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-box"
                            autoComplete="off"
                            value={userRegistration.password}
                            onChange={handleInput}
                            name="password"
                            id="password"
                        />
                        <i
                            className={`password-toggle ${
                                showPassword ? "fa fa-eye-slash" : "fa fa-eye"
                            }`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                </div>
                <div>
                    <label className="user-details" htmlFor="confirmPassword">
                        confirm password
                    </label>
                    <div className="password-input">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="input-box"
                            autoComplete="off"
                            value={userRegistration.confirmPassword}
                            onChange={handleInput}
                            name="confirmPassword"
                            id="confirmPassword"
                        />
                        <i
                            className={`password-toggle ${
                                showConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"
                            }`}
                            onClick={toggleConfirmPasswordVisibility}
                        ></i>
                    </div>
                </div>
                <div className='login'>
                    if user already registered <Link to="/login">login</Link>
                </div>
                <button className='register' type='submit'>Create an account</button>
            </form>
        </>
    );
};

export default Signup;
