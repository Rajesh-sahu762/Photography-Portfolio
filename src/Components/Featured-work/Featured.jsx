import React from "react";

import "./Featured.css";

export default function FeaturedWork() {

  const works = [

    {
      id: 1,
      title: "Cinematic Frames",
      category: "Film Production",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
      className: "item-large",
    },

    {
      id: 2,
      title: "Wedding Stories",
      category: "Photography",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
      className: "item-vertical",
    },

    {
      id: 3,
      title: "Fashion Editorial",
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
      className: "item-small",
    },

    {
      id: 4,
      title: "Travel Moments",
      category: "Travel",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      className: "item-wide",
    },

    {
      id: 5,
      title: "Urban Portraits",
      category: "Portrait",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
      className: "item-small",
    },

    {
      id: 6,
      title: "Luxury Frames",
      category: "Commercial",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
      className: "item-medium",
    },

  ];

  return (

    <section className="fw-section">

      {/* TOP */}

      <div className="fw-top">

        <p className="fw-label">
          FEATURED WORK
        </p>

        <h2 className="fw-heading">

          Crafted
          <span>
            Visual Stories
          </span>

        </h2>

        <p className="fw-subtext">

          A curated collection of
          cinematic photography,
          storytelling frames,
          luxury wedding moments,
          and artistic compositions.

        </p>

      </div>

      {/* GRID */}

      <div className="fw-grid">

        {

          works.map((item) => (

            <div

              key={item.id}

              className={`fw-card ${item.className}`}

            >

              {/* IMAGE */}

              <img
                src={item.image}
                alt={item.title}
              />

              {/* OVERLAY */}

              <div className="fw-overlay">

                <p>
                  {item.category}
                </p>

                <h3>
                  {item.title}
                </h3>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}