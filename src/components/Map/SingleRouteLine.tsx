import React, {useContext, useEffect} from "react";
import {useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import './SingleRouteLine.css';
import {SearchContext} from "../../contexts/search.contexts";


interface Props {
    positionStart: number[];
    positionEnd: number[];

}

export const SingleRouteLine = (props: Props) => {
    const map = useMap().setView([53.1450159, 22.1319976], 7);
    const {search} = useContext(SearchContext);

    useEffect(() => {

        if (!map) return;

        const {positionStart, positionEnd} = props;

        const latLng = [L.latLng(positionStart[0], positionStart[1]), L.latLng(positionEnd[0], positionEnd[1])];


        const control = L.Routing.control({

            waypoints: latLng,
            routeWhileDragging: false,
            fitSelectedRoutes: false,
            show: false,


            plan: L.Routing.plan(latLng, {
                addWaypoints: false,
                draggableWaypoints: false,
                routeWhileDragging: false,
                createMarker: function () {
                    return false;
                },

            }),

        });

        control.addTo(map);

        /*
                return () => {
                    if (map && control) {
                        if (map.removeControl) {
                            map.removeControl(control);
                        }
                    }
                };

             Jak mam ten fragment kodu to przy wyszukiwaniu usuwa pozostałe drogi i pokazuje wybrane, ale wywala błąd.
                 Uncaught runtime errors:

                 ERROR
                 Cannot read properties of null (reading 'removeLayer')
                 TypeError: Cannot read properties of null (reading 'removeLayer')
                 at NewClass._clearLines (http://localhost:3000/static/js/bundle.js:29765:25)
                 at NewClass.<anonymous> (http://localhost:3000/static/js/bundle.js:29735:24)
                 at NewClass.<anonymous> (http://localhost:3000/static/js/bundle.js:31323:26)
                 at XMLHttpRequest.loaded (http://localhost:3000/static/js/bundle.js:14868:42)
             Jeżeli pozostawie ten fragment kodu zakomentowany to błędu nie ma ale przy wyszukiwaniu nie zmienia wyswietlania dróg. Poprostu są wyświetlone wszystkie. Przeskakują tylko popupy od SingleRoad.
             */

    }, [map, search]);


    return null;
}