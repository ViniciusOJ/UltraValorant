import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";
import { toast } from "react-toastify";

function Favoritos() {
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("personFavorites");

    setPersonagens(JSON.parse(minhaLista) || []);
  }, []);

  function removePerson(id) {
    let filtroPersons = personagens.filter((item) => {
      return item.uuid !== id;
    });

    setPersonagens(filtroPersons);
    localStorage.setItem("personFavorites", JSON.stringify(filtroPersons));
    toast.success(`Personagem removido com sucesso`);
  }

  return (
    <div className="lista-personagens">
      <h1>Lista de Personagens</h1>

      <ul>
        {personagens.map((personagem) => {
          return (
            <div key={personagem.uuid} className="container-person">
              <div className="icon-name">
                <img src={personagem.bustPortrait} />
                <strong>{personagem.displayName}</strong>
              </div>
              <div className="description">
                <p>{personagem.description}</p>
                <div className="links">
                  <Link to={`/agentes/${personagem.uuid}`}>Ver detalhes</Link>
                  <button onClick={() => removePerson(personagem.uuid)}>
                    Remover personagem
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
