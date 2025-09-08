// src/pages/Home.jsx
// src/pages/Home.jsx

// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FiTrendingUp,
  FiPieChart,
  FiCalendar,
  FiCloud,
  FiUserCheck,
  FiPlusCircle,
  FiBarChart2,
} from "react-icons/fi";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <PublicHeader />

      {/* Hero Section */}
      <main className="home-content">
        <h2>Take Control of Your Finances</h2>
        <p>
          Track your income and expenses with ease. Visualize where your money
          goes and make smarter financial decisions.
        </p>
        <Link to="/register" className="get-started-btn">
          Get Started
        </Link>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <h3>Why Choose FinTrackr?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <FiTrendingUp className="feature-icon" />
            <h4>Track Transactions</h4>
            <p>
              Easily add income and expenses with categories, dates, and notes.
            </p>
          </div>
          <div className="feature-card">
            <FiPieChart className="feature-icon" />
            <h4>Visual Insights</h4>
            <p>
              Pie charts and bar charts help you understand spending patterns.
            </p>
          </div>
          <div className="feature-card">
            <FiCalendar className="feature-icon" />
            <h4>Smart Filters</h4>
            <p>
              View your finances by day, week, or month for better planning.
            </p>
          </div>
          <div className="feature-card">
            <FiCloud className="feature-icon" />
            <h4>100% Free</h4>
            <p>Store data locally or sync to the cloud — no hidden costs.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h3>How It Works</h3>
        <div className="steps-grid">
          <div className="step-card">
            <FiUserCheck className="step-icon" />
            <h4>1. Create an Account</h4>
            <p>Sign up for free in less than 1 minute.</p>
          </div>
          <div className="step-card">
            <FiPlusCircle className="step-icon" />
            <h4>2. Add Transactions</h4>
            <p>Log your income and expenses with categories.</p>
          </div>
          <div className="step-card">
            <FiBarChart2 className="step-icon" />
            <h4>3. See Insights</h4>
            <p>Get clear visuals of where your money goes.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h3>What Our Users Say</h3>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>
              "FinTrackr made me realize how much I was overspending on food.
              Now I save 20% every month!"
            </p>
            <h5>— Sarah K.</h5>
          </div>
          <div className="testimonial-card">
            <p>
              "Simple, clean, and effective. The charts help me stay on track
              with my budget."
            </p>
            <h5>— James M.</h5>
          </div>
          <div className="testimonial-card">
            <p>
              "Finally a free finance app that does exactly what I need — no
              fluff, just results."
            </p>
            <h5>— Anita R.</h5>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta-banner">
        <h3>Ready to get started?</h3>
        <Link to="/register" className="cta-btn">
          Create Free Account
        </Link>
      </section>

      <PublicFooter />
    </div>
  );
}

export default Home;
