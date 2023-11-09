import React, {useContext, useEffect, useState} from "react";
import {RoadsDetails} from "./subcomponents/RoadsDetails";
import {RoadEntity} from "types";
import {SearchContext} from "../../contexts/search.contexts";
import './AdminPanel.css';
import {AuthContext} from "../../contexts/auth.contexts";
import {useNavigate} from "react-router-dom";
import {Btn} from "../common/Button/Btn";


export const AdminPanel = () => {

    const [roads, setRoads] = useState<RoadEntity[]>([]);

    const {search} = useContext(SearchContext);
    const {loggedIn, setLoggedIn} = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn]);


    const handleDeleteRoad = (id: string) => {
        setRoads(prev => prev.filter(road => road.id !== id));
    }

    const handleClick = () => {
        setLoggedIn(false);
    }

    const handleRefresh = () => setRefresh(prev => !prev);

    useEffect(() => {

        (async () => {
            const res = await fetch(`http://localhost:3001/road/search/${search}`);
            const data = await res.json();
            setRoads(data);

        })();

    }, [search, refresh]);

    return (
        <>
            <div className="admin-container">
                <h2>Lista inwestycji drogowych:</h2>
                <section>
                    {
                        roads.map(road => (
                            <RoadsDetails key={road.id}
                                          name={road.name}
                                          id={road.id}
                                          description={road.description}
                                          url={road.url}
                                          realisationYear={road.realisationYear}
                                          startAddress={road.startAddress}
                                          endAddress={road.endAddress}
                                          onDelete={handleDeleteRoad}
                                          onRefresh={handleRefresh}/>
                        ))
                    }

                </section>
                <Btn to="/add" text="Dodaj"/>
                <button onClick={handleClick}>Wyloguj</button>
            </div>

        </>

    )
}