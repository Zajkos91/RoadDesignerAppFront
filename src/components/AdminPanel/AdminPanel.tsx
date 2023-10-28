import React, {useContext, useEffect, useState} from "react";
import {RoadsDetails} from "./subcomponents/RoadsDetails";
import {SimpleRoadEntity} from "types";
import {SearchContext} from "../../contexts/search.contexts";
import './AdminPanel.css';

export const AdminPanel = () => {

    const [roads, setRoads] = useState<SimpleRoadEntity[]>([]);
    const {search} = useContext(SearchContext);

    const handleDeleteRoad = (id: string) => {
        setRoads(prev => prev.filter(road => road.id !== id));
    }

    useEffect(() => {

        (async () => {
            const res = await fetch(`http://localhost:3001/road/search/${search}`);
            const data = await res.json();
            setRoads(data);

        })();

    }, [search]);

    return (
        <>
            <div className="admin-container">
                <h1>Lista inwestycji drogowych:</h1>
                <section>
                    {
                        roads.map(road => (
                            <RoadsDetails key={road.id} name={road.name} id={road.id} onDelete={handleDeleteRoad}/>
                        ))
                    }
                </section>
            </div>
        </>

    )
}