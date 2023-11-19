import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleAuth = async () => {
        try {
            const endpoint = isRegisterMode ? 'register' : 'login';
            const requestData = isRegisterMode
                ? { name, email, password, password_confirmation: passwordConfirmation }
                : { email, password };

            const response = await fetch(`http://localhost/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isRegisterMode ? 'Регистрация' : 'Вход'}</h2>

            {isRegisterMode && (
                <>
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </>
            )}

            <label>Email:</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password:</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {isRegisterMode && (
                <>
                    <label>Password Confirmation:</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </>
            )}

            <button onClick={handleAuth}>
                {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
            </button>
            <p onClick={() => setIsRegisterMode(!isRegisterMode)}>
                {isRegisterMode
                    ? 'Уже есть аккаунт? Войти.'
                    : 'Нет аккаунта? Зарегистрироваться.'}
            </p>
        </div>
    );
};

export default App;
