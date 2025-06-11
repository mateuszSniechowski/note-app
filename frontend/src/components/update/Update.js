import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Update.css';

function Update(){
    const [note, setNote] = useState({
        title: "",
        note: "",
        date: "",
        place: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const noteId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async e => {
        e.preventDefault();

        try{
            await axios.put("http://51.20.66.102:3306/notes/" + noteId, note)
            navigate("/");
        } catch(err){
            console.log(err);
        }
    }

    return(
        <div className='container-update'>
            <form>
                <label>Edytuj tytuł</label>
                <input 
                    className='titleUpdateInput'
                    onChange={handleChange}
                    name='title'
                />

                <label>Edytuj treść notatki</label>
                <textarea 
                    className='noteUpdateInput'
                    onChange={handleChange}
                    name='note'
                /> 

                <label>Edytuj date wydarzenia</label>
                <input 
                    className='dateUpdateInput'
                    onChange={handleChange}
                    name='date'
                /> 

                <label>Edytuj miejsce wydarzenia</label>
                <input 
                    className='placeUpdateInput'
                    onChange={handleChange}
                    name='place'
                /> 

                <button className='UpdateBtn' onClick={handleClick}>Edytuj</button>
            </form>
        </div>
    )
}

export default Update;