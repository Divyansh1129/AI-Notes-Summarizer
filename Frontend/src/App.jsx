import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text) {
      alert("Enter some text");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/notes/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setSummary(data.summary || "No summary received");
    } catch (error) {
      console.error(error);
      setSummary("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ✅ Header FIXED */}
        <div style={styles.header}>
          <span style={styles.emoji}>🧠</span>
          <h1 style={styles.titleText}>
            AI Notes <span style={{ color: "#667eea" }}>Summarizer</span>
          </h1>
        </div>

        <textarea
          placeholder="Paste your notes here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={handleSummarize} style={styles.button}>
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        <div style={styles.outputBox}>
          <h2 style={{ color: "#333" }}>Summary</h2>

          <p style={styles.summaryText}>
            {loading
              ? "⏳ Generating summary..."
              : summary || "Your summary will appear here..."}
          </p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    width: "500px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    textAlign: "center",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },

  emoji: {
    fontSize: "32px",
  },

  titleText: {
    margin: 0,
    fontSize: "26px",
    color: "#333",
    fontWeight: "700",
  },

  textarea: {
    width: "100%",
    height: "130px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    resize: "none",
    marginBottom: "15px",
    background: "#f9f9f9",
    color: "#333",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea, #5a67d8)",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "600",
  },

  outputBox: {
    textAlign: "left",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  },

  summaryText: {
    background: "#f4f6ff",
    padding: "12px",
    borderRadius: "10px",
    minHeight: "60px",
    color: "#333",
    lineHeight: "1.5",
  },
};

export default App;