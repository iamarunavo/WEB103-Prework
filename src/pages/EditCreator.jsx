import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        let { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
        if (error) {
          console.error("Error fetching creator:", error);
          alert("Error loading creator data");
          return;
        }
        if (data) {
          setForm(data);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error loading creator data");
      }
    };
    fetchCreator();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Remove the id from the form data before updating
      const { id: _, ...updateData } = form;
      
      const { data, error } = await supabase
        .from("creators")
        .update(updateData)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating creator:", error);
        alert("Error updating creator: " + error.message);
        return;
      }

      if (data && data.length > 0) {
        console.log("Successfully updated creator:", data[0]);
        alert("Creator updated successfully!");
        navigate("/");
      } else {
        alert("No changes were made or creator not found");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating creator");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this creator?")) {
      try {
        const { error } = await supabase.from("creators").delete().eq("id", id);
        if (error) {
          console.error("Error deleting creator:", error);
          alert("Error deleting creator: " + error.message);
          return;
        }
        alert("Creator deleted successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("Error deleting creator");
      }
    }
  };

  return (
    <div className="container">
      <Link to="/" className="back-btn">
        ← Back to Creators
      </Link>
      
      <div className="form-container">
        <h2>Edit Creator</h2>
        
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">Creator Name</label>
            <input
              id="name"
              className="form-control"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="url">Channel URL</label>
            <input
              id="url"
              className="form-control"
              value={form.url || ""}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="imageURL">Image URL</label>
            <input
              id="imageURL"
              className="form-control"
              value={form.imageURL || ""}
              onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
            />
          </div>
          
          <div className="btn-group">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? " Updating..." : "💾 Update Creator"}
            </button>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
            <button 
              type="button" 
              onClick={handleDelete}
              className="btn btn-danger"
            >
              🗑️ Delete Creator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
