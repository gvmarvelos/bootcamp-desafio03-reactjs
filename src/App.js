import React, {useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  
  const[repositories, setRepositories] = useState([]);

  async function handleAddRepository() {

    const title = document.getElementById("title").value;

    if(title.length>0){
      const response = await api.post("repositories", {
        title:title
      })
        
      if(response.status>=200){
        const repository = response.data;
        document.getElementById("title").value = "";
        setRepositories([...repositories, repository])
      } else {
        alert("Problemas ao adicionar Repositório, por favor tente novamente");
      }
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete("/repositories/" + id);

    if(response.status>=200){

      const repositoryIndex = repositories.findIndex( repository => repository.id === id);

      if(repositoryIndex>=0){
        
        repositories.splice(repositoryIndex,1); 
        setRepositories(repositories.filter(repository=>repository.id!== id))
      }
    } else {
      alert("Problemas ao remover Repositório, por favor tente novamente");
    }
  }

  async function handleListAllRepository(id) {
    const response = await api.get("/repositories");

    if(response.status>=200){
      const repositories = response.data;
      setRepositories(repositories);
    } else {
      alert("Problemas ao resquisitar todos os Repositórios, por favor tente novamente");
    }
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
      <h1>Desafio ReactJS</h1>
          <ul>
            {repositories.map(
              repository => <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
              )}
          </ul>
          <input placeholder="Titulo" id="title"/>
          <button onClick={handleAddRepository}>Adicionar</button>
          <br/>
          <button onClick={handleListAllRepository}>Listar Todos</button>
      </ul>      
    </div>
  );
}

export default App;
