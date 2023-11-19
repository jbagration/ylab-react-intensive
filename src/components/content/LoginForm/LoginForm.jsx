import { useState } from "react";
import fetchMock from "fetch-mock";
import styles from "./LoginForm.module.scss";
import Form from "../../UI/form/Form";
import Input from "../../UI/form/Input/Input";
import Button from "../../UI/Button/Button";

const LOGIN_ENDPOINT = '/login';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const login = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        fetchMock.mock(LOGIN_ENDPOINT, {
            status: 200,
            body: {
                success: true,
                error: '',
            }
        }, {
            delay: 1500,
        });

        try {
            const response = await fetch(LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.success) {
                setSuccess(true);
            } else {
                setError(data.error || 'Неверный e-mail или пароль');
            }
        } catch (error) {
            setLoading(false);
            setError('Неверный e-mail или пароль');
        }

        fetchMock.restore();
    };

    const buttonDisabled = email.length === 0 || password.length === 0 || loading;

    return (
        <div className={styles.wrapper}>
            <img src="images/login.jpg" alt="login picture" className={styles.image} />

            {success && (
                <div className={styles.logOut}>
                    <h2>Авторизация прошла успешно</h2>
                    <Button type="text" onClick={() => setSuccess(false)}>Выйти</Button>
                </div>
            )}

            {!success && (
                <div className={styles.formWrapper}>
                    <div className={styles.title}>Войти</div>

                    <Form method="POST" action={LOGIN_ENDPOINT} onSubmit={login}>
                        <Input
                            value={email}
                            type="email"
                            name="email"
                            placeholder="Введите e-mail"
                            required={true}
                            disabled={loading}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            value={password}
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            required={true}
                            disabled={loading}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className={styles.error}>{error}</div>

                        <Button type="submit" disabled={buttonDisabled} loading={loading}>
                            Продолжить
                        </Button>
                    </Form>

                    <div className={styles.forgotText}>
                        Забыли
                        <a href="#" className={styles.highlighted}>
                            {' '}
                            логин или пароль
                        </a>
                        ?
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
