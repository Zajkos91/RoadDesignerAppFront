import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LoginPopup.css';
import {Btn} from "../common/Button/Btn";
import {InputPassword} from "./subcomponents/ShowInputPassword";
import {Modal} from "../Modal/Modal";
import {Spinner} from "../common/Spinner/Spinner";
import bcrypt from "bcryptjs-react";


export const LoginPopup = () => {

    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isActive) {
            resetStateOfInputs();
        }
    }, [isActive]);

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsActive(prev => !prev);
    };
    const resetStateOfInputs = () => {
        setLogin('');
        setPassword('');
    }


    const handleOnSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setLoading(true);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        try {

            const res = await fetch(`http://localhost:3001/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login,
                    hashedPassword,

                }),
            });
            const data = await res.json();
            console.log(data);
            resetStateOfInputs();
            if (res.ok) {

                navigate('/admin');
            }

        } catch (e) {
            alert('Błędne dane logowania');
            console.warn(e);

        } finally {
            setLoading(false);

        }

    };

    if (loading) {
        return <Spinner text='Logowanie...'/>
    }



    return <>
        {/*<Modal>*/}
        <div className="center">
            <button onClick={handleClick}>Login</button>
        </div>
        <div className={`popup ${isActive ? 'active' : ''}`}>
            <div className="close-btn" onClick={handleClick}>&times;</div>
            <form className="form" onSubmit={handleOnSubmit}>
                <h2>Logowanie</h2>
                <div className="form-element">
                    <label>
                        Login:
                        <input
                            type="text"
                            id="login"
                            placeholder="login"
                            value={login} onChange={e => setLogin(e.target.value)}/>
                    </label>
                </div>
                <div className="form-element">
                    <label>
                        Hasło:
                        <InputPassword value={password} onChange={e => setPassword(e.target.value)}/>

                    </label>
                </div>


                {/*<Btn to="/admin" text="Zaloguj"/>*/}
                <button>Zaloguj</button>

            </form>
        </div>
        {/*</Modal>*/}
    </>
}