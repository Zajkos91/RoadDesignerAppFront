import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {Btn} from "../common/Button/Btn";
import {SearchContext} from "../../contexts/search.contexts";
import {SimpleRoadEntity} from "types";
import {SearchDropDown} from "./SearchDropDown";
import {Link} from "react-router-dom";

const logo = require('../../images/logo/logo.png');
const searchIcon = require('../../images/search-icon/search.png');

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
                    <Link to="/"><img className="logo" src={logo} alt="logo"></img>
                        <p className="logo-text"><strong>Inwestycje Drogowe </strong>
                            <p className="logo-text__bottom">Piotr Z</p>
                        </p>

                    </Link>
                </h1>

                <div className="search-container">

                    <form className="search" onChange={setSearchFromLocalState} onSubmit={setSearchFromLocalState}>

                        <img className="search-icon" src={searchIcon} alt="search-icon"/>
                        <label className='result-container'>
                            <input className="search-input" type="text" value={inputVal}
                                   onChange={e => setInputVal(e.target.value)}/>
                            {/*<Btn*/}
                            {/*text="Szukaj"/>*/}
                            <SearchDropDown roads={roads} search={search} onSearch={onSearch}/>
                        </label>

                    </form>

                </div>
                <div className="admin-button">
                    <Btn to="login/" text="Panel admina"/>
                </div>
            </header>


        </>
    )

};
