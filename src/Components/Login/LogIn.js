import React, { useState } from 'react';
import '../Register/signup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LogIn = () => {

    const navigate = useNavigate();
    const [userRegistration, setUserRegistration] = useState({
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/users/signin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegistration),
            });
            const data = await response.json();
            Swal.fire(data.error);
            if (response.ok) {
                navigate('/calendar');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form className='form' action='' onSubmit={handleSubmit}>
                <div>
                    <div className='title'>Login</div>
                </div>
                <div>
                    <label className='user-details' htmlFor='email'>email</label>
                    <input type='text' className='input-box' autoComplete='off'
                        value={userRegistration.email}
                        onChange={handleInput}
                        name='email' id='email'></input>
                </div>
                <div>
                    <label className='user-details' htmlFor='password'>password</label>
                    <input type='password' className='input-box' autoComplete='off'
                        value={userRegistration.password}
                        onChange={handleInput}
                        name='password' id='password'></input>
                </div>
                <div className='login'>
                    if user not registered <Link to="/signup">Create account</Link>
                </div>
                <button className='register' type='submit'>Login</button>
            </form>
        </>
    )
}

export default LogIn;