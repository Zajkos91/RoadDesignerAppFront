import React, {useEffect} from "react";
import {useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import './SingleRouteLine.css';

interface Props {
    positionStart: number[];
    positionEnd: number[];

}

export const SingleRouteLine = (props: Props) => {
    const map = useMap().setView([53.1450159, 22.1319976], 8);
    // const layer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    // attribution: "OpenStreetMap contributors"}).addTo(map);


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

        // return () => {
        //     if (control) {
        //     map.removeControl(control);
        //     map.removeLayer(layer);
        //     }
        // };


    }, [map]);


    return null;
}