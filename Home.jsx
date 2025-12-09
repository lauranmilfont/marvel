import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const token = "85583346102d8239ee9a97b2437c09ad";

  async function fetchCharacters(query) {
    setLoading(true);
    setErrorMsg("");

    try {
      let response;
      if (query) {
        response = await axios.get(
          `https://superheroapi.com/api/${token}/search/${query}`
        );
        if (response.data.response === "success") {
          setCharacters(response.data.results);
        } else {
          setErrorMsg("Nenhum personagem encontrado.");
          setCharacters([]);
        }
      } else {
        const ids = [346, 620, 659, 332, 149];
        const results = await Promise.all(
          ids.map((id) =>
            axios.get(`https://superheroapi.com/api/${token}/${id}`).then((r) => r.data)
          )
        );
        setCharacters(results);
      }
    } catch (error) {
      setErrorMsg("Erro ao buscar personagens!");
      setCharacters([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCharacters("");
  }, []);

  return (
    <div>
      <h2>Dragon Ball Cards</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar personagem..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => fetchCharacters(searchQuery)}>Buscar</button>
      </div>

      {loading && <p>Carregando...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <div className="cards-grid">
        {characters.map((char) => (
          <div className="card" key={char.id}>
            {char.image?.url && <img src={char.image.url} alt={char.name} />}
            <h3>{char.name}</h3>
            <p>{char.biography?.["full-name"] || "Sem nome completo"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
