import React, {useState} from "react";


interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> ) => void;
}

export const InputPassword = (props: Props) => {

    const [password, setPassword] = useState('password')
    const handleClicked = () => {
        setPassword(() => password === 'password' ? "text": "password" );
    }


    return (
        <>
            <input type={password} id="password" placeholder="hasło" value={props.value} onChange={props.onChange}/>
            <div className="show" onMouseDown={handleClicked} onMouseUp={handleClicked}>👀</div>
        </>
    )
}