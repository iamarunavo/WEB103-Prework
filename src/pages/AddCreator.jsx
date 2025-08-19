import { useState } from "react";
import { supabase } from "../client";
import { useNavigate, Link } from "react-router-dom";

export default function AddCreator() {
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("creators").insert([form]);
    navigate("/");
  };

  return (
    <div className="container">
      <Link to="/" className="back-btn">
        ← Back to Creators
      </Link>
      
      <div className="form-container">
        <h2>Add New Creator</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Creator Name</label>
            <input
              id="name"
              className="form-control"
              placeholder="Enter creator name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="url">Channel URL</label>
            <input
              id="url"
              className="form-control"
              placeholder="https://www.youtube.com/@channel"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              placeholder="Tell us about this creator..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="imageURL">Image URL (optional)</label>
            <input
              id="imageURL"
              className="form-control"
              placeholder="https://example.com/image.jpg"
              value={form.imageURL}
              onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
            />
          </div>
          
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              ➕ Add Creator
            </button>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
