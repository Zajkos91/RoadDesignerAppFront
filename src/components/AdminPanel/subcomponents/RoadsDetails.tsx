import React, {SyntheticEvent, useState} from "react";


interface Props {
id: string;
name: string;
onDelete: (id: string) => void;

}

export const RoadsDetails = (props: Props) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);


    const {id, name} = props;



    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = (e: SyntheticEvent)  => {
        e.preventDefault();
        setIsOpenPopup(false);
    };

    const handleRemoveRoad = async () => {
        try {
            const res = await fetch(`http://localhost:3001/road/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            props.onDelete(id);



        } catch (e) {
            console.warn(e); //@TODO dodać obsługę błędów
        }
    }


    return (
        <details>
            <summary>{name}</summary>
            <button onClick={showPopup}>Edytuj</button>
            <button onClick={handleRemoveRoad}>Usuń</button>
        </details>
    );
};