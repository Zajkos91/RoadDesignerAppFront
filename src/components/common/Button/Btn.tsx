import React from "react";
import './Btn.css';
import {Link} from "react-router-dom";

interface Props {
    text: string;
    to?: string;
    onClick?: () => void;
}

export const Btn = (props: Props) => (
    props.to ? <Link className="btn" to={props.to}>{props.text}</Link>
        : <button onClick={props.onClick}>{props.text}</button>
);