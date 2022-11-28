import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "./personagem.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Personagem() {
  const [person, setPerson] = useState([]);
  const [habilities, setHabilites] = useState([]);
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPerson() {
      const response = await api
        .get(`/agents/${id}`, {
          params: {
            language: "pt-BR",
            isPlayableCharacter: true,
          },
        })
        .then((response) => {
          setHabilites(response.data.data.abilities);
          setPerson(response?.data.data);
          setRole(response?.data?.data.role);
          setLoading(false);
        })
        .catch(() => {
          console.log("Personagem não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }

    loadPerson();
  }, [navigate, id]);

  function adicionarFavoritos() {
    const minhaLista = localStorage.getItem("personFavorites");
    let personSaves = JSON.parse(minhaLista) || [];

    const hasPerson = personSaves.some(
      (personagensSalvos) => personagensSalvos.uuid === person.uuid
    );

    if (hasPerson) {
      toast.warn("Este personagem já está na lista");
      return;
    }

    personSaves.push(person);
    localStorage.setItem("personFavorites", JSON.stringify(personSaves));
    toast.success("Personagem adicionado com sucesso");
  }

  if (loading) {
    return (
      <div className="loading-text">
        <h1>Carregando informações...</h1>
      </div>
    );
  }

  return (
    <div className="person-info">
      <div className="person-infos-all">
        <img src={person.displayIcon} alt={person.displayName} />
        <div className="container-text">
          <h1>{person.displayName}</h1>
          <strong>{person.role?.displayName}</strong>
        </div>
        <div className="details">
          <strong>Função do {person.role?.displayName}</strong>
          <p>{person.role?.description}</p>
          <button onClick={adicionarFavoritos} className="page-navigate">
            Adicionar aos favoritos
          </button>
        </div>
      </div>

      <div className="habilities-container">
        <h1>Habilidades</h1>
        <div className="habilities">
          {habilities.map((personagem) => {
            return (
              <div key={personagem.displayName} className="habilities-details">
                {personagem.displayIcon ? (
                  <div className="imagem-container">
                    <img src={personagem.displayIcon} />
                  </div>
                ) : (
                  <h1 className="undefined-image">Sem Imagem</h1>
                )}
                <div key={personagem.displayName} className="habilities-text">
                  <strong>{personagem.displayName}</strong>
                  <strong>{personagem.slot}</strong>
                  <p>{personagem.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
