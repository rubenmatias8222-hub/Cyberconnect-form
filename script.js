const API = "http://127.0.0.1:8000";

console.log("Admin loaded");

async function loadMessages() {
  const res = await fetch(`${API}/messages`);
  const data = await res.json();

  const table = document.getElementById("messagesTable");
  table.innerHTML = "";

  data.forEach(msg => {
    table.innerHTML += `
      <tr>
        <td>${msg.id}</td>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.message}</td>
        <td>
          <button onclick="deleteMessage(${msg.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function deleteMessage(id) {
  await fetch(`${API}/messages/${id}`, {
    method: "DELETE"
  });

  loadMessages();
}

loadMessages();
