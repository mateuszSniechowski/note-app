import './AddNote.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddNote() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  function getTitle(e){
    setTitle(e.target.value);
  }

  function getNote(e){
    setNote(e.target.value);
  }

  function getDate(e){
    setDate(e.target.value);
  }

  function getPlace(e){
    setPlace(e.target.value);
  }

  const handleClick = async e => {
    e.preventDefault();

    if(!title || !note){
      alert("Pole temat i notatka są wymagane!");
      return;
    }

    try{
        await axios.post("http://51.20.66.102:3306/notes", {title, note, date, place});
        window.location.reload();
    }catch(err){
        console.log(err);
    }
  }

  return (
    <div className="container-addNote">
        <form>
            <label>Dodaj temat</label>
            <input 
              className='titleInput'
              value={title}
              name='title'
              onChange={getTitle}
            />

            <label>Dodaj notatkę</label>
            <textarea 
              className='noteInput'
              value={note}
              name='note'
              onChange={getNote}
            />

            <label>Dodaj datę wydarzenia</label>
            <input 
              className='dateInput'
              value={date}
              name='date'
              onChange={getDate}
              placeholder='opcjonalnie'
            />

            <label>Dodaj miejsce wydarzenia</label>
            <input 
              className='placeInput'
              value={place}
              name='place'
              onChange={getPlace}
              placeholder='opcjonalnie'
            />

            <button className='submit' onClick={handleClick}>Dodaj</button>

        </form>
    </div>
  );
}

export default AddNote;
