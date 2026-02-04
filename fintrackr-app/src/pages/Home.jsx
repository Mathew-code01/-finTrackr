// src/pages/Home.jsx
// src/pages/Home.jsx

// src/pages/Home.jsx
// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  FiTrendingUp, FiPieChart, FiLayers, FiZap, 
  FiLock, FiDatabase, FiCpu, FiCheck 
} from "react-icons/fi";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <PublicHeader />

      {/* --- SECTION 1: HERO (White) --- */}
      <section className="section-white hero-section">
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow">Visual Excellence Built for Impact</span>
            <h1 className="hero-title">
              Master your capital with <br /> <span>surgical precision.</span>
            </h1>
            <p className="hero-subtitle">
              FinTrackr provides a high-fidelity interface for tracking assets,
              income, and expenses—stored entirely in your browser.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn-solid">
                Start Tracking
              </Link>
              <Link to="/login" className="btn-outline">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: FEATURES (Deep Obsidian) --- */}
      <section className="section-dark">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">The Platform</span>
            <h2 className="section-title">
              Sophisticated tools for <br /> financial clarity.
            </h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <FiTrendingUp className="feature-icon" />
              <h4>Real-time Tracking</h4>
              <p>
                Log income and expenses with categorized precision. No lag, just
                data.
              </p>
            </div>
            <div className="feature-card">
              <FiPieChart className="feature-icon" />
              <h4>Visual Insights</h4>
              <p>
                Minimalist charts designed to highlight spending patterns
                without the noise.
              </p>
            </div>
            <div className="feature-card">
              <FiLayers className="feature-icon" />
              <h4>Asset Management</h4>
              <p>
                Organize multiple streams of income with an elegant, unified
                dashboard.
              </p>
            </div>
            <div className="feature-card">
              <FiZap className="feature-icon" />
              <h4>Instant Filters</h4>
              <p>
                Segment data by timeline or category with high-speed
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: HOW IT WORKS (White) --- */}
      <section className="section-white">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Execution</span>
            <h2 className="section-title">Simplicity in every step.</h2>
          </div>
          <div className="steps-container">
            <div className="step-item">
              <h4>Initialize</h4>
              <p>
                Create your private account in seconds with zero configuration
                required.
              </p>
            </div>
            <div className="step-item">
              <h4>Input</h4>
              <p>
                Record your financial movement using our streamlined transaction
                engine.
              </p>
            </div>
            <div className="step-item">
              <h4>Analyze</h4>
              <p>
                Review generated reports to optimize your future capital
                allocation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: TESTIMONIALS (Deep Obsidian) --- */}
      <section className="section-dark">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Recognition</span>
            <h2 className="section-title">
              Built for those who <br /> value precision.
            </h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>
                "The cleanest finance UI I've used. No fluff, just results."
              </p>
              <span className="author">Alex Rivera — Fintech Analyst</span>
            </div>
            <div className="testimonial-card">
              <p>
                "Local storage integration makes this the most private way to
                track wealth."
              </p>
              <span className="author">Sarah Chen — Lead Developer</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: TRUST & SECURITY (White) --- */}
      {/* --- SECTION 5: TRUST & SECURITY (White background, Boxed Card) --- */}
      <section className="section-white security-section">
        <div className="container">
          <div className="security-inner-card">
            <div className="security-text">
              <span className="eyebrow">Privacy First</span>
              <h2 className="section-title">
                Your data stays <br /> exactly where it belongs.
              </h2>
              <p>
                FinTrackr utilizes <strong>Local Storage</strong> technology.
                Your financial history remains on your device, never hitting a
                third-party server.
              </p>
              <ul className="trust-list">
                <li>
                  <FiCheck /> No Cloud Storage
                </li>
                <li>
                  <FiCheck /> 100% Private
                </li>
                <li>
                  <FiCheck /> No Data Mining
                </li>
                <li>
                  <FiCheck /> Instant Backup
                </li>
              </ul>
            </div>
            <div className="security-visual">
              <FiLock className="big-icon" />
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

export default Home;