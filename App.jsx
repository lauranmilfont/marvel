import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);   // novo estado
  const [error, setError] = useState(null);        // novo estado

  useEffect(() => {
    const token = "85583346102d8239ee9a97b2437c09ad"; 
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

    setLoading(true);
    Promise.all(
      ids.map((id) =>
        axios.get(`https://superheroapi.com/api/${token}/${id}`)
      )
    )
      .then((responses) => {
        setHeroes(responses.map((res) => res.data));
        setError(null);
      })
      .catch((error) => {
        console.error("Erro ao buscar heróis:", error);
        setError("Não foi possível carregar os heróis.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    const token = "85583346102d8239ee9a97b2437c09ad";
    setLoading(true);
    axios
      .get(`https://superheroapi.com/api/${token}/search/${search}`)
      .then((response) => {
        setResults(response.data.results || []);
        setError(null);
      })
      .catch((error) => {
        console.error("Erro na pesquisa:", error);
        setError("Não foi possível encontrar esse herói.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1>Marvel Cards</h1>

      {/* Caixa de pesquisa */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Digite o nome do herói..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      {/* Loading */}
      {loading && <p>Carregando...</p>}

      {/* Erro */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Resultados da pesquisa ou lista inicial */}
      {!loading && !error && (
        <div className="cards-grid">
          {(results.length > 0 ? results : heroes).map((hero) => (
            <div className="card" key={hero.id}>
              {hero.image && <img src={hero.image.url} alt={hero.name} />}
              <h2>{hero.name}</h2>
              <p>{hero.biography?.["full-name"] || "Sem nome completo"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
