import { useState, useRef, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/HealthcareHome.css';
import { useNavigate } from "react-router-dom";

export default function HealthcareHome() {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const getBotReply = (message) => {
    const lowerMsg = message.toLowerCase();

    // Request Care
    if (lowerMsg.includes("request") || lowerMsg.includes("support") || lowerMsg.includes("care")) {
      return "You can request medical care by filling out the 'Patient Support' form with patient details, medical condition, and a brief description of the symptoms and urgency.";
    }

    // Volunteer
    if (lowerMsg.includes("volunteer") || lowerMsg.includes("skills") || lowerMsg.includes("register")) {
      return "To register as a volunteer, please complete the 'Volunteer Registration' form with your Availability (weekdays, weekends, specific hours, or full-time/part-time) and relevant skills such as caregiving, first aid, medical assistance, communication, or coordination experience.";
    }

    // Contact
    if (lowerMsg.includes("contact")) {
      return "For general inquiries, please use the 'Contact Us' form. Our team will respond shortly.";
    }

    // Required Details
    if (
      lowerMsg.includes("details") ||
      lowerMsg.includes("required") ||
      lowerMsg.includes("information needed")
    ) {
      return "To assist you better, please specify whether you are asking about the details for the Care Request form or the Volunteer Registration form.";
    }

    // Service Cost
    if (
      lowerMsg.includes("free") ||
      lowerMsg.includes("cost") ||
      lowerMsg.includes("price") ||
      lowerMsg.includes("service") ||
      lowerMsg.includes("charge")
    ) {
      return "Our basic healthcare support coordination service is free. Additional medical services may depend on the provider.";
    }

    // Response Time
    if (lowerMsg.includes("how long") || lowerMsg.includes("get back") || lowerMsg.includes("response time")) {
      return "Our team typically responds within 24 hours.";
    }

    // Fallback
    return "I can help you with care requests, volunteer registration, required details, contacting us or service information like cost details. Please let me know how I can assist.";
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: chatInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      const botReply = getBotReply(chatInput);
      const botMessage = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleCardClick = (cardType) => {
    if (cardType === "Patient Support") {
      navigate("/support");
    } 
    else if (cardType === "Volunteer Registration") {
      navigate("/volunteer");
    }
    else if (cardType === "Contact Form") {
      navigate("/contact");
    }
  };

  return (
    <div className="healthcare-home">
      {/* Header */}
      <header className="healthcare-header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L20 12H28L22 18L24 28L16 22L8 28L10 18L4 12H12L16 4Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>CareConnect</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Healthcare Support</h1>
            <p className="hero-subtitle">Compassionate Care for Everyone</p>
            <p className="hero-description">
              Providing support, guidance, and personalized care for patients and their families.
              We're here to ensure you never face your health journey alone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <h3 className="mission-label">Our Mission</h3>
            <h2 className="mission-title">
              Supporting and empowering patients and their families with comprehensive healthcare assistance
            </h2>
            <p className="mission-description">
              Through dedicated programs and compassionate care, we provide vital support to those navigating
              their healthcare journey. We offer emotional, financial, and practical assistance to help patients
              and families overcome health challenges.
            </p>
          </div>
          <div className="mission-icon">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="cards-section">
        <div className="cards-container">
          <div className="card" onClick={() => handleCardClick('Patient Support')}>
            <div className="card-icon patient-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4Z" stroke="currentColor" strokeWidth="3" fill="none"/>
                <path d="M24 14V34M14 24H34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="card-title">Patient Support</h3>
            <p className="card-description">
              Access resources and guidance to help you through your healthcare journey.
            </p>
            <button className="card-button">Get Support</button>
          </div>

          <div className="card" onClick={() => handleCardClick('Volunteer Registration')}>
            <div className="card-icon volunteer-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 4L29 19H44L32 28L37 44L24 35L11 44L16 28L4 19H19L24 4Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
              </svg>
            </div>
            <h3 className="card-title">Volunteer Registration</h3>
            <p className="card-description">
              Join our community of volunteers and make a difference in patients' lives.
            </p>
            <button className="card-button">Register Now</button>
          </div>

          <div className="card" onClick={() => handleCardClick('Contact Form')}>
            <div className="card-icon contact-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M8 10H40C41.1046 10 42 10.8954 42 12V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V12C6 10.8954 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="3" fill="none"/>
                <path d="M6 12L24 26L42 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="card-title">Contact Us</h3>
            <p className="card-description">
              Have questions or need assistance? Reach out to our support team and we'll respond promptly.
            </p>
            <button className="card-button">Contact Now</button>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="chat-widget">
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-header-content">
                <div className="chat-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h4>CareConnect Bot</h4>
                  <span className="chat-status">Online</span>
                </div>
              </div>
              <button className="chat-close" onClick={() => setIsChatOpen(false)}>
                ✕
              </button>
            </div>
            <div className="chat-messages">
              {chatMessages.map((message) => (
                <div key={message.id} className={`chat-message ${message.sender}`}>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                </div>
              ))}<div ref={messagesEndRef} />
            </div>
            <div className="chat-input-section">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button className="chat-send" onClick={handleSendMessage}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 10L18 2L10 18L8 11L2 10Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        )}
        <button
          className={`chat-button ${isChatOpen ? 'chat-open' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M21 7L7 21M7 7L21 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 4H24V18H8L4 22V4Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
              <path d="M9 10H19M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}