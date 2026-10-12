import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:8080/api/events"
      );

      console.log("API response:", response.data);
      setEvents(response.data);
    } catch (err) {
      console.error("API error:", err);
      setError("Could not load events from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="app-container">

      {/* Header */}
      <header className="header">
        <h1>Online Event Management System</h1>
        <p>Discover and manage upcoming events</p>
      </header>

      {/* Refresh Button */}
      <button
        className="refresh-button"
        onClick={loadEvents}
      >
        Refresh Events
      </button>

      {/* Events */}
      <section className="events-section">
        <h2>Available Events</h2>

        {loading && (
          <div className="loading">
            Loading events...
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="no-events">
            No events available.
          </div>
        )}

        <div className="event-grid">

          {events.map((event) => (
            <div className="event-card" key={event.id}>

              <h3>{event.title}</h3>

              <p className="event-description">
                {event.description}
              </p>

              <div className="event-info">

                <p>
                  <strong>Location:</strong>{" "}
                  {event.location}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {event.date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {event.time}
                </p>

                <p className="capacity">
                  <strong>Capacity:</strong>{" "}
                  {event.capacity}
                </p>

                <span className="category">
                  {event.category}
                </span>

              </div>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

export default App;