import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import './AddForm.css';
import {Btn} from "../common/Button/Btn";
import {geocode} from "../../utils/geocoding";
import {Spinner} from "../common/Spinner/Spinner";
import {AuthContext} from "../../contexts/auth.contexts";
import {useNavigate} from "react-router-dom";


export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [added, setAdded] = useState(false);
    const {loggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn]);

    const [form, setForm] = useState({
        name: '',
        description: '',
        realisationYear: 2000,
        url: '',
        startAddress: '',
        endAddress: '',
    });


    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };


    const saveRoad = async (e: SyntheticEvent) => {
        e.preventDefault()
        setLoading(true);
        try {

            const {lat: startLat, lon: startLon} = await geocode(form.startAddress);
            const {lat: endLat, lon: endLon} = await geocode(form.endAddress);
            await console.log(startLat,
                startLon,
                endLat,
                endLon);
            const res = await fetch(`http://localhost:3001/road`, {
                method: 'POST',
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
            console.log(data);
            setId(data.id);


        } catch (e) {
            alert('Błąd danych spróbuj ponownie');
            console.warn(e);

        } finally {
            setLoading(false);
            setAdded(true);
            console.log(added);
        }

    };

    if (loading) {
        return <Spinner text='Trwa dodawanie inwestycji drogowej...'/>
    }

    if (id && added) {
        return (
            <>
                <div className="added">
                    <h3>Twoja inwestycja "{form.name}" została poprawnie dodana do serwisu pod ID: {id}.</h3>
                    <Btn onClick={() => setAdded(false)} text="Dodaj kolejną inwestycje"/>
                    <Btn to="/" text="Powrót do mapy"/>
                </div>
            </>
        )
    }

    return (
        <form className="add-form" onSubmit={saveRoad}>
            <h2>Dodawanie inwestycji drogowej</h2>
            <p>
                <label>
                    Nazwa: <br/>
                    <input
                        type="text"
                        name="name"
                        required
                        maxLength={99}
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Opis: <br/>
                    <textarea
                        name="description"
                        maxLength={99}
                        value={form.description}
                        onChange={e => updateForm('description', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Rok realizacji: <br/>
                    <input type="number"
                           name="realisationYear"
                           required
                           maxLength={99}
                           value={form.realisationYear}
                           onChange={e => updateForm('realisationYear', Number(e.target.value))}
                    />

                </label>
            </p>
            <p>
                <label>
                    Link do GoogleStreet: <br/>
                    <input type="url"
                           name="url"
                           maxLength={99}
                           value={form.url}
                           onChange={e => updateForm('url', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Adres - początek inwestycji drogowej: <br/>
                    <input type="text"
                           name="startAddress"
                           required
                           value={form.startAddress}
                           onChange={e => updateForm('startAddress', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Adres - koniec inwestycji drogowej: <br/>
                    <input type="text"
                           name="endAddress"
                           required
                           value={form.endAddress}
                           onChange={e => updateForm('endAddress', e.target.value)}
                    />
                </label>
            </p>
            <Btn text="Zapisz"/>
        </form>
    )

};