import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      let { data } = await supabase.from("creators").select("*");
      setCreators(data || []);
    };
    fetchCreators();
  }, []);

  return (
    <div className="container">
      <h1>Creatorverse</h1>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/creators/new" className="add-creator-btn">
          ➕ Add Creator
        </Link>
      </div>

      {creators.length === 0 ? (
        <div className="empty-state">
          <p>No creators yet!</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Add your first creator to get started! 🚀
          </p>
        </div>
      ) : (
        <div className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}
