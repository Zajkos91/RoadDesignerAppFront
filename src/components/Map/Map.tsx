import React, {useContext, useEffect, useState} from "react";
import './Map.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import '../../utils/fix-map-icon';
import 'leaflet/dist/leaflet.css';
import {SearchContext} from "../../contexts/search.contexts";


import {SingleRoad} from "./SingleRoad";
import {SingleRouteLine} from "./SingleRouteLine";
import {SimpleRoadEntity} from "types";




export const Map = () => {

    const [roads, setRoads] = useState<SimpleRoadEntity[]>([]);
    const {search} = useContext(SearchContext);




    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/road/search/${search}`);
            const data = await res.json();
            setRoads(data);

        })();

    }, [search]);

    return (
        <>

        <div className="map">

            <MapContainer center={[53.1450159, 22.1319976]} zoom={8}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />

                {
                    roads.map(road => (
                        <>

                            <Marker key={road.id}
                                    position={[road.startLat, road.startLon]}>
                                <Popup>
                                    <SingleRoad id={road.id}/>
                                </Popup>

                            </Marker>
                            <SingleRouteLine

                                positionStart={[road.startLat, road.startLon]}
                                positionEnd={[road.endLat, road.endLon]}
                            />

                        </>

                    ))

                }


            </MapContainer>
        </div>

        </>
    )
}