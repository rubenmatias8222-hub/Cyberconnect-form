console.log("🔥 NEW JS FILE LOADED");
console.log("JS running");

const API = "http://127.0.0.1:8000";

// ========================
// CONTACT FORM
// ========================
function sendContact() {
  const btn = document.querySelector("button");
  if (btn) btn.disabled = true;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  if (!nameInput || !emailInput || !messageInput) {
    console.error("Contact form elements missing.");
    if (btn) btn.disabled = false;
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    if (btn) btn.disabled = false;
    return;
  }

  fetch(`${API}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  })
    .then(res => res.json())
    .then(data => {
      const responseBox = document.getElementById("response");

      if (responseBox) {
        responseBox.innerHTML = `
          <div style="padding:10px;margin-top:10px;background:#111;color:#0f0;border-radius:8px;">
            ✅ ${data.message}
          </div>
        `;
      }

      console.log("Server response:", data);
      console.log("Message sent successfully");

      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";

      if (btn) btn.disabled = false;
    })
    .catch(err => {
      console.error("Contact error:", err);
      alert("Failed to send message");

      if (btn) btn.disabled = false;
    });
}

// ========================
// LOAD CONTENT
// ========================
function loadContent() {
  console.log("📥 Fetching dynamic content...");
  
  fetch(`${API}/content`)
    .then(res => {
      if (!res.ok) throw new Error(`Content fetch failed: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const output = document.getElementById("output");
      if (output) {
        output.textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch(err => {
      console.error("❌ Content error:", err);
      alert("Failed to load content");
    });
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("output")) {
    loadContent();
  }
});
