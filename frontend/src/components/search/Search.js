import './Search.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Search() {
  const [contents, setContents] = useState([]);
  const [searchResults, setsearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
      const fetchAllNotes = async () =>{
          try{
              const res = await axios.get("http://51.20.66.102:3306/notes")
              setContents(res.data);
          }catch(err){
              console.log(err);
          }
      } 
      fetchAllNotes()
  },[]);


  const handleSearchTextChange = (e) =>{
      const text = e.target.value;
      setSearchText(text);
      searchNotes(text);
  }

  const searchNotes = (text) =>{
      const result = contents.filter((content) => content.temat.toLowerCase().includes(text.toLowerCase()));
      setsearchResults(result);
  }

  return(
      <div className='container-search'>
          <input 
              placeholder='szukaj po tytule...' 
              onChange={handleSearchTextChange}
              value={searchText}
              type='text'
              className='searchInput'
          />

      <div className='searchList'>
          <ul>
              {searchResults.map((content) => (
                  <li key={content.id}>
                      <h2>{content.temat} </h2>
                      <p>{content.notatka}</p>
                      <span><strong>{content.dataWydarzenia}</strong></span>
                      <p>{content.miejsceWydarzenia}</p>
                  </li>
              ))}
          </ul>
      </div>
      </div>
  );
}

export default Search;