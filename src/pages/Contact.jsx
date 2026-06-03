import React, { useState } from 'react';
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5001/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message");
    }

    // Show success
    setShowSuccess(true);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    });

    // Hide after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

  } catch (error) {
    console.error("Contact form error:", error);
    alert("Failed to send message. Please try again.");
  }
};
  const scrollToForm = () => {
    document.getElementById('contact-form').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="contact-container">
      {/* Header Section */}
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Need help with your AC unit? Have questions about rent availability or token pricing? Our team is here to get you what you're looking for.</p>
      </div>

      {/* Contact Methods */}
      <div className="contact-methods">
        <h2 className="methods-title">Choose your preferred way to connect</h2>
        <p className="methods-subtitle">
          Whatever you need: Live or pre-scheduled support, a custom plan, 
          or a module campaign to ensure you get the assistance you need.
        </p>
        
        <div className="methods-grid">
          <div className="method-card">
            <div className="method-icon">💬</div>
            <h3>Live Chat</h3>
            <p>Get Started with on-demand, billing, and technical assistance.</p>
            <button className="method-btn" onClick={() => alert('Open live chat')}>
              Start chat →
            </button>
          </div>

          <div className="method-card">
            <div className="method-icon">📧</div>
            <h3>Email Support</h3>
            <p>Detailed technical assistance and account management.</p>
            <button className="method-btn" onClick={scrollToForm}>
              Send email →
            </button>
          </div>

          <div className="method-card">
            <div className="method-icon">📞</div>
            <h3>Phone Support</h3>
            <p>Describe the urgent tech issues and emergency calls.</p>
            <button className="method-btn" onClick={() => window.location.href = 'tel:+1234567890'}>
              Call us →
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="form-section" id="contact-form">
        <h2>Send us a message</h2>
        <p className="form-subtitle">
          Fill out the form below and we'll get back to you within 24 hours. 
          For urgent tech issues, please use live chat or call us directly.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company (optional)</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
             >
              <option value="">Select a topic</option>
              <option value="general">General Inquiry</option>
              <option value="technical">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="partnership">Partnership</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us what you need help with, so we can get you started quickly. Or, feel free just to say hi!"
            />
          </div>

          <button type="submit" className="submit-btn">
            Send message
          </button>

          {showSuccess && (
            <div className="success-message">
              ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
            </div>
          )}
        </form>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="faq-title">Frequently asked questions</h2>
        <p className="faq-subtitle">
          Quick answers to common questions about AC rent service, billing, and platform features.
        </p>
        
        <div className="faq-grid">
          <div className="faq-category">
            <div className="faq-category-icon">🚀</div>
            <h3>Getting Started</h3>
            <div className="faq-item">
              <p className="faq-question">How do I join? How do it start?</p>
              <a href="#" className="faq-link">View all Getting Started help →</a>
            </div>
            <div className="faq-item">
              <p className="faq-question">What do charges we require?</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">Can I cancel if I'm not happy?</p>
            </div>
          </div>

          <div className="faq-category">
            <div className="faq-category-icon">💳</div>
            <h3>Billing & Tokens</h3>
            <div className="faq-item">
              <p className="faq-question">How does token pricing work?</p>
              <a href="#" className="faq-link">View all Billing & Tokens help →</a>
            </div>
            <div className="faq-item">
              <p className="faq-question">Can I submit a custom pricing plan?</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">How do I change my payment?</p>
            </div>
          </div>

          <div className="faq-category">
            <div className="faq-category-icon">🛠️</div>
            <h3>Technical Support</h3>
            <div className="faq-item">
              <p className="faq-question">Can I have add-ons? Is my profile...</p>
              <a href="#" className="faq-link">View all Technical support help →</a>
            </div>
            <div className="faq-item">
              <p className="faq-question">What do I do/how do I integrate...?</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">I'm experiencing issues, where...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;