import React from "react";
import './Spinner.css'

interface Props {
    text: string;
}

export const Spinner = (props: Props) => {
    return (
        <>
            <div className='Spinner'><div>

        </div><div></div><div></div><div></div><div></div><div></div><div>

        </div><div></div><div></div><div></div><div></div><div></div></div>
            <p>{props.text}</p>
        </>

    )
}