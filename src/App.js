import React, { useState } from 'react';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleAuth = async () => {
        try {
            const endpoint = isRegisterMode ? 'register' : 'login';
            const response = await fetch(`http://localhost/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
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
            <button onClick={handleAuth}>{isRegisterMode ? 'Зарегистрироваться' : 'Войти'}</button>
            <p onClick={() => setIsRegisterMode(!isRegisterMode)}>
                {isRegisterMode ? 'Уже есть аккаунт? Войти.' : 'Нет аккаунта? Зарегистрироваться.'}
            </p>
        </div>
    );
};

export default App;
