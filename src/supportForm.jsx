import { useState } from "react";
import "./support-form.scss";

export default function SupportForm({ onMockAdminAccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiReply, setAiReply] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAiReply("");

    const res = await fetch(
      "https://api.unique-marmot-10470.appmixer.cloud/flows/6d9a9c4b-6617-4297-978c-775ea99f2908/components/ab128bb1-ba7e-438a-bc48-4abdebfcecc6",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    setAiReply(data.suggestedReply);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="support-form-container">
      <div className="ai-orb"></div>
      <h1 className="form-title">🤖 AI Support Assistant</h1>
      <div className="form-description">
        <p>
          <strong>AI Support Assistant</strong> is a smart contact form that
          uses AI to classify user messages into categories like billing,
          technical support, or feedback — and routes them to the right
          department. It also gives users an instant AI-generated reply.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="support-form">
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="your.email@example.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message ✨"}
        </button>
      </form>
      {aiReply && <div className="ai-reply">💬 {aiReply}</div>}
      <button type="button" className="admin-btn" onClick={onMockAdminAccess}>
        Mock Admin Access
      </button>
    </div>
  );
}
