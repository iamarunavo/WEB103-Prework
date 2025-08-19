import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      let { data } = await supabase.from("creators").select("*").eq("id", id).single();
      setCreator(data);
    };
    fetchCreator();
  }, [id]);

  if (!creator) return (
    <div className="container">
      <div className="loading">Loading creator details...</div>
    </div>
  );

  return (
    <div className="container">
      <Link to="/" className="back-btn">
        ← Back to Creators
      </Link>
      
      <div className="creator-detail">
        <div className="creator-header">
          <h1>{creator.name}</h1>
          {creator.imageURL && (
            <img 
              src={creator.imageURL} 
              alt={creator.name} 
              className="creator-image"
            />
          )}
        </div>
        
        <div className="creator-description">
          <p>{creator.description}</p>
        </div>
        
        <div className="creator-actions">
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            🌐 Visit Channel
          </a>
          
          <Link 
            to={`/creators/${id}/edit`} 
            className="btn btn-secondary"
          >
            ✏️ Edit Creator
          </Link>
        </div>
      </div>
    </div>
  );
}
