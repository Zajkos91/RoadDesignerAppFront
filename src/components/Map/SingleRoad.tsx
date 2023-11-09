import React, {useEffect, useState} from "react";
import {RoadEntity} from 'types';

import "leaflet-routing-machine";
import {Spinner} from "../common/Spinner/Spinner";

interface Props {
    id: string;
}

export const SingleRoad = (props: Props) => {
    const [road, setRoad] = useState<RoadEntity | null>(null);
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/road/${props.id}`);
            const data = await res.json();
            setRoad(data);

        })();
    }, []);

    if(road === null) {
        return <Spinner text='Wczytywanie...'/>;
    }

    return <>
        <h2>{road.name}</h2>
        <p>{road.description}</p>
        {road.realisationYear && <p>Rok realizacji: <strong>{road.realisationYear}</strong></p>}
        <hr/>
        <a href={road.url} target="_blank" rel="noreferrer">Przejdź do Google Street</a>
    </>


}