import './AllNotes.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllNotes() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try{
          const res = await axios.get("http://51.20.66.102:3306/notes")
          setContents(res.data);
      } catch(err){
          console.log(err);
        }
    } 
    fetchAllNotes();
  },[]);


  const handleDelete = async (id) => {
      try{
          await axios.delete("http://51.20.66.102:3306/notes/" + id);
          window.location.reload();
      } catch(err){
          console.log(err);
      }
  }

  return (
    <div className='container-allNotes'>
      <div className="allNotes">
          {Array.isArray(contents) && contents.map(content => (
            <div className='note' key={content.id}>
                <h2>{content.temat}</h2>
                <p>{content.notatka}</p>
                <span><strong>{content.dataWydarzenia}</strong></span>
                <p>{content.miejsceWydarzenia}</p>
                <button className='delete' onClick={() => handleDelete(content.id)}>X</button>
                <button className='update'><Link to={`/update/${content.id}`}>Edytuj</Link></button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllNotes;
