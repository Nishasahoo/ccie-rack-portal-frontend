import React from 'react';
import "../styles/about.css";

export default function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        {/* Header Section */}
        <section className="header-section">
          <div className="header-content">
            <div className="header-text">
              <h1 className="main-title">About ACI Rack Rentals</h1>
              <p className="description">
                We started ACI Rack Rentals to put enterprise-grade hardware in the hands of every engineer—no cold contract or six-figure budget required. Our fully automated lab platform lets you validate designs, rehearse upgrades, and ace certifications on the exact gear you'll run in prod.
              </p>
              <p className="description">
                Each reservation powers up a clean slate, boots your chosen ACI image, and exposes secure console endpoints within minutes. When your session ends, a cryptographic wipe destroys configs and logs, ensuring complete isolation for the next user.
              </p>
            </div>
            
            <div className="stats-container">
              <div className="stat-card stat-purple">
                <div className="stat-number">48</div>
                <div className="stat-label">Racks online</div>
              </div>
              <div className="stat-card stat-blue">
                <div className="stat-number">2.4K</div>
                <div className="stat-label">RDCs delivered</div>
              </div>
              <div className="stat-card stat-indigo">
                <div className="stat-number">15 min</div>
                <div className="stat-label">Avg. spin-up time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="image-section">
          <img 
            src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=1500&q=80" 
            alt="Professional woman on phone in office"
            className="hero-image"
          />
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2 className="section-title">Our values</h2>
          <p className="section-subtitle">
            The principles that guide every feature we build and every rack we maintain.
          </p>

          <div className="values-grid">
            <div className="value-card">
              <h3 className="value-title">Real hardware, real results</h3>
              <p className="value-text">
                Every lab runs on production-grade Cisco leaf, spine, and fabric kit. You get real metal to run real workloads, no compromise. What you test here behaves exactly like your sale's corner fabric.
              </p>
            </div>

            <div className="value-card">
              <h3 className="value-title">Automation first</h3>
              <p className="value-text">
                From power-on to clean wipe, our pipeline handles imaging, cabling, and snapshots so you spend time validating design—not waiting on gear.
              </p>
            </div>

            <div className="value-card">
              <h3 className="value-title">Zero vendor bias</h3>
              <p className="value-text">
                We host vanilla images straight from Cisco and let you load your own tools. Results are yours; we don't gate features behind a paywall.
              </p>
            </div>

            <div className="value-card">
              <h3 className="value-title">Security & privacy</h3>
              <p className="value-text">
                Isolated VLANs, TLS-only console endpoints, and auto-wipe scripts ensure your configs, keys, and logs are gone the moment your booking ends.
              </p>
            </div>

            <div className="value-card">
              <h3 className="value-title">Community-driven learning</h3>
              <p className="value-text">
                We publish reference topologies and share-play videos so every engineer can level up, not just the ones with big hardware budgets.
              </p>
            </div>

            <div className="value-card">
              <h3 className="value-title">Fair, transparent pricing</h3>
              <p className="value-text">
                Our ticker model charges by the hour—pause anytime, never lose unused balance, and see exactly where every token goes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}