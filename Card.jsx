export default function Card({ name, image, powerstats }) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p><strong>Inteligência:</strong> {powerstats.intelligence}</p>
      <p><strong>Força:</strong> {powerstats.strength}</p>
      <p><strong>Velocidade:</strong> {powerstats.speed}</p>
      <p><strong>Durabilidade:</strong> {powerstats.durability}</p>
      <p><strong>Poder:</strong> {powerstats.power}</p>
      <p><strong>Combate:</strong> {powerstats.combat}</p>
    </div>
  );
}
