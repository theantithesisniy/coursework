import React, {useState} from 'react';

const AuthForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const url = isRegistering ? 'http://localhost:3001/auth/register' : 'http://localhost:3001/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            if (response.ok) {
                if (isRegistering) {
                    console.log('Пользователь успешно зарегистрирован');
                } else {
                    console.log('Пользователь успешно аутентифицирован');
                }
            } else {
                console.error('Ошибка при', isRegistering ? 'регистрации' : 'аутентификации', 'пользователя');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }

    return (
        <div>
            <h2>{isRegistering ? 'Регистрация' : 'Авторизация'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Имя пользователя: </label>
                    <input type="text"
                           id='username'
                           value={username}
                           onChange={handleUsernameChange}
                           required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль: </label>
                    <input type="password"
                           id="password"
                           value={password}
                           onChange={handlePasswordChange}
                           required
                    />
                </div>
                <button type="submit"> {isRegistering ? 'Зарегистрироваться' : 'Войти'} </button>
            </form>
            <button onClick={() => {
                setIsRegistering(!isRegistering);
            }}>
                {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
            </button>
        </div>
    );
};

export default AuthForm;
