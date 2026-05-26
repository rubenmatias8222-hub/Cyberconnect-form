const API = "http://127.0.0.1:8000";

console.log("Admin dashboard loaded");

async function loadMessages() {
  try {
    const res = await fetch(`${API}/messages`);
    const data = await res.json();

    const table = document.getElementById("messagesTable");
    table.innerHTML = "";

    data.forEach(msg => {
      const row = `
        <tr>
          <td>${msg.id}</td>
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.message}</td>
        </tr>
      `;
      table.innerHTML += row;
    });

    console.log("Messages loaded:", data);

  } catch (err) {
    console.error("Failed to load messages:", err);
  }
}

// auto-load on page open
loadMessages();
