import React, {SyntheticEvent, useState} from "react";
import {RoadPopup} from "./RoadPopup";


interface Props {
    id: string;
    name: string;
    description: string;
    url: string;
    realisationYear: number;
    startAddress: string,
    endAddress: string,
    onDelete: (id: string) => void;
    onRefresh: () => void;

}

export const RoadsDetails = (props: Props) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);


    const {id, name} = props;


    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsOpenPopup(false);
        props.onRefresh();
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
            <RoadPopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props}/>
        </details>

    );
};