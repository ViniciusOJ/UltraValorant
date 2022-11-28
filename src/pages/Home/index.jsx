import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPerson() {
      const response = await api.get("/agents", {
        params: {
          language: "pt-BR",
          isPlayableCharacter: true,
        },
      });

      setPerson(response.data.data);
      setLoading(false);
    }

    loadPerson();

    return () => {
      console.log("Componente desmontado.");
    };
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-personagens">
        <h1>Agentes do Valorant</h1>
        {person.map((personagem) => {
          return (
            <div
              key={personagem.uuid}
              className={`container-img ${personagem.displayName}`}
            >
              <img src={personagem.bustPortrait} alt={personagem.displayName} />
              <div className="text-person">
                <strong>{personagem.displayName}</strong>
                <p>{personagem.description}</p>
                <Link to={`/agentes/${personagem.uuid}`}>Saiba mais</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
