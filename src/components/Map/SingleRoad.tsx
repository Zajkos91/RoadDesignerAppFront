import React, {useEffect, useState} from "react";
import {RoadEntity} from 'types';
import {useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import {Spinner} from "../common/Spinner/Spinner";

interface Props {
    id: string;
}

// export const Route = () => {
//     const map = useMap();
//
//     useEffect(() => {
//         if (!map) return;
//
//         const routingControl = L.Routing.control({
//             waypoints: [L.latLng(53.1553033, 23.1387033), L.latLng(51.6792, 19.949)],
//             routeWhileDragging: true
//         }).addTo(map);
//
//         // return (() => {
//         //     map.removeControl(routingControl);
//         // });
//     }, [map]);
//
//     return null;
// }



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
        {road.realisationYear && <p><strong>{road.realisationYear} zł</strong></p>}
        <hr/>
        <a href={road.url} target="_blank" rel="noreferrer">Przejdź do GoogleStreet</a>
    </>


}