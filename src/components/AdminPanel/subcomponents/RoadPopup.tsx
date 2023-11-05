import React, {SyntheticEvent, useState} from "react";

import './RoadPopup.css';
import {Modal} from "../../Modal/Modal";
import {geocode} from "../../../utils/geocoding";
import {Spinner} from "../../common/Spinner/Spinner";

interface Props {
    isOpenPopup: boolean;
    hidePopup: (e: SyntheticEvent) => void;
    id: string;
    name: string;
    description: string;
    url: string;
    realisationYear: number,

}

export const RoadPopup = (props: Props) => {

    const [loading, setLoading] = useState(false);

    const [updated, setUpdated] = useState(false);

    const [form, setForm] = useState({
        name: props.name,
        description: props.description,
        realisationYear: props.realisationYear,
        url: props.url,
        startAddress: '',
        endAddress: '',
    });


    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const updateRoad = async (e: SyntheticEvent) => {
        e.preventDefault()
        setLoading(true);
        try {

            const {lat: startLat, lon: startLon} = await geocode(form.startAddress);
            const {lat: endLat, lon: endLon} = await geocode(form.endAddress);

            const res = await fetch(`http://localhost:3001/road/${props.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    startLat,
                    startLon,
                    endLat,
                    endLon,
                }),
            });
            const data = await res.json();
            console.log(JSON.stringify({
                ...form,
                startLat,
                startLon,
                endLat,
                endLon,
            }));
            if (res.ok) {
                props.hidePopup(e);
            }

        } catch (e) {
            alert('Błąd danych spróbuj ponownie');
            console.warn(e);

        } finally {
            setLoading(false);
            setUpdated(true);
            console.log(updated);
        }

    };

    if (loading) {
        return <Spinner text='Trwa modyfikowanie inwestycji drogowej...'/>
    }


    return (
        <Modal isOpen={props.isOpenPopup} handleOnClose={props.hidePopup}>
            <div>
                <form className="form" onSubmit={updateRoad}>
                    <p className="form-row">
                        <label>
                            Nazwa:
                            <input type="text"
                                   required
                                   maxLength={99}
                                   value={form.name}
                                   onChange={e => updateForm('name', e.target.value)}/>
                        </label>
                    </p>
                    <p className="form-row">
                        <label>
                            Opis:
                            <textarea
                                name="description"
                                maxLength={99}
                                value={form.description}
                                onChange={e => updateForm('description', e.target.value)}
                            />
                        </label>
                    </p>
                    <p className="form-row">
                        <label>
                            Rok realizacji:
                            <input type="number"
                                   name="realisationYear"
                                   required
                                   maxLength={99}
                                   value={form.realisationYear}
                                   onChange={e => updateForm('realisationYear', Number(e.target.value))}/>
                        </label>
                    </p>
                    <p className="form-row">
                        <label>
                            Link do GoogleStreet:
                            <input type="url"
                                   name="url"
                                   maxLength={99}
                                   value={form.url}
                                   onChange={e => updateForm('url', e.target.value)}/>
                        </label>
                    </p>
                    <p className="form-row">
                        <label>
                            Adres - początek inwestycji drogowej:
                            <input type="text"
                                   name="startAddress"
                                   required
                                   value={form.startAddress}
                                   onChange={e => updateForm('startAddress', e.target.value)}/>
                        </label>
                    </p>
                    <p className="form-row">
                        <label>
                            Adres - koniec inwestycji drogowej:
                            <input type="text"
                                   name="endAddress"
                                   required
                                   value={form.endAddress}
                                   onChange={e => updateForm('endAddress', e.target.value)}/>
                        </label>
                    </p>
                    <button type="submit">Zmodyfikuj</button>
                    <button onClick={props.hidePopup} type="button">Anuluj</button>
                </form>
            </div>
        </Modal>
    );
};