import React, {SyntheticEvent, useState} from 'react';
import './LoginPopup.css';
import {Btn} from "../common/Button/Btn";
import {InputPassword} from "./subcomponents/ShowInputPassword";



export const LoginPopup = () => {

    const [isActive, setIsActive] = useState(false);

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsActive(prev => !prev);
    };

    return <>
        <div className="center">
            <button onClick={handleClick}>Login</button>
        </div>
        <div className={`popup ${isActive ? 'active' : ''}`}>
            <div className="close-btn" onClick={handleClick}>&times;</div>
            <div className="form">
                <h2>Logowanie</h2>
                <div className="form-element">
                    <label>
                        Login:
                        <input type="text" id="login" placeholder="login"/>
                    </label>
                </div>
                <div className="form-element">
                    <label>
                        Hasło:
                        <InputPassword/>

                    </label>
                </div>
                <div className="form-element">

                    <Btn to="/admin" text="Zaloguj"/>
                </div>
            </div>
        </div>
    </>
}