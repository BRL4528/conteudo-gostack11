import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [listRepo, setListRepo] = useState([])
  const [newRepo, setNewRepo] = useState('')

  useEffect(() => {
   async function loadRepo() {
     const response = await api.get('repositories')
     const { data } = response

     setListRepo(data);
   }
   loadRepo()
  }, [newRepo])

  async function handleAddRepository() {
    const data = {
    
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }
    const response = await api.post('repositories', data)
    
    setListRepo([...listRepo, response.data])
  }

  async function handleRemoveRepository(id) {
   await api.delete(`repositories/${id}`)
   setListRepo([])
  }

  return (
    <div>
    <ul data-testid="repository-list">
        {listRepo.map((repo) => ( 
        <li key={repo.id} >
         {repo.title}
         
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
