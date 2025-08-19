// src/components/CreatorCard.jsx
import { Link } from "react-router-dom";

export default function CreatorCard({ creator }) {
  return (
    <div className="card">
      
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
        />
      )}

      <h2>{creator.name}</h2>
      <p>{creator.description}</p>

      
      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        Visit Channel
      </a>

      <div className="card-actions">
        
        <Link to={`/creators/${creator.id}`}>
          👀 View
        </Link>

    
        <Link to={`/creators/${creator.id}/edit`}>
          ✏️ Edit
        </Link>
      </div>
    </div>
  );
}
