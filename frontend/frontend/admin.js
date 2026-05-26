const API = "http://127.0.0.1:8000";

console.log("Admin panel loaded");

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
          <td>
            <button onclick="deleteMessage(${msg.id})">
              ❌ Delete
            </button>
          </td>
        </tr>
      `;
      table.innerHTML += row;
    });

  } catch (err) {
    console.error("Error loading messages:", err);
  }
}

loadMessages();
