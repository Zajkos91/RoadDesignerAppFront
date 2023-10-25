import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {Btn} from "../common/Button/Btn";
import {SearchContext} from "../../contexts/search.contexts";
import {SimpleRoadEntity} from "types";


export const Header = () => {
    const {search, setSearch} = useContext(SearchContext);
    const [inputVal, setInputVal] = useState(search);
    const [roads, setRoads] = useState<SimpleRoadEntity[]>([]);

    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    }


    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/road/search/${search}`);
            const data = await res.json();
            setRoads(data);

        })();

    }, [search]);



const onSearch = (searchTerm: string) => {
    setInputVal(searchTerm);
    setSearch(searchTerm);
    console.log(searchTerm);
};

return (
    <>
    <header>
        <h1>
            <a href="/"><strong>Drogowiec</strong> Inwestycje</a>
        </h1>
        <Btn to="add/" text="Dodaj inwestycje drogową"/>
        <Btn to="login/" text="Panel admina"/>
        <div className="search-container">
        <form className="search" onChange={setSearchFromLocalState} onSubmit={setSearchFromLocalState}>
            <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}/> <Btn text="Szukaj"/>
        </form>
        <div className="dropdown">
            {roads.filter(road => {
                const searchTerm = search.toLowerCase();
                const roadName = road.name.toLowerCase();
                return searchTerm && roadName.startsWith(searchTerm) && roadName !== searchTerm;
            })
                .slice(0, 10)
                .map(road => (
                    <div
                        onClick={() => onSearch(road.name)}
                        className="dropdown-row"
                        key={road.id}
                    >{road.name}</div>
                ))}
        </div>
        </div>

    </header>

    </>
)

};
