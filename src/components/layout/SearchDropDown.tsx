import React from "react";

import {SimpleRoadEntity} from "types";



interface Props {
    roads: SimpleRoadEntity[];
    search: string;
    onSearch: (searchTerm: string) => void;

}
export const SearchDropDown = (props: Props) => {

    return (
        <div className="dropdown">
            {props.roads.filter(road => {
                const searchTerm = props.search.toLowerCase();
                const roadName = road.name.toLowerCase();
                return searchTerm && roadName.startsWith(searchTerm) && roadName !== searchTerm;
            })
                .slice(0, 10)
                .map(road => (
                    <div
                        onClick={() => props.onSearch(road.name)}
                        className="dropdown-row"
                        key={road.id}
                    >{road.name}</div>
                ))}
        </div>
    );
}