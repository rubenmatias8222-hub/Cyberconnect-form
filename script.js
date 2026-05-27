const API = "http://127.0.0.1:8000";

console.log("Admin loaded");

// ---------------------------
// CONTACT FORM
// ---------------------------
function sendContact() {
  fetch(`${API}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    })
  })
  .then(res => res.json())
  .then(data => {
    alert("Message sent successfully!");
    console.log(data);
  })
  .catch(err => {
    console.error("Contact error:", err);
  });
}

// ---------------------------
// LOAD MESSAGES (ADMIN DASHBOARD)
// ---------------------------
async function loadMessages() {
  try {
    const res = await fetch(`${API}/messages`);
    const data = await res.json();

    const table = document.getElementById("messagesTable");
    table.innerHTML = "";

    data.forEach(msg => {
      table.innerHTML += `
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4">${msg.id}</td>
          <td class="px-6 py-4">${msg.name}</td>
          <td class="px-6 py-4">${msg.email}</td>
          <td class="px-6 py-4">${msg.message}</td>
          <td class="px-6 py-4 text-right">
            <button 
              onclick="deleteMessage(${msg.id})"
              class="text-red-600 hover:text-red-800 font-semibold">
              Delete
            </button>
          </td>
        </tr>
      `;
    });

  } catch (err) {
    console.error("Load messages error:", err);
  }
}

// ---------------------------
// DELETE MESSAGE
// ---------------------------
async function deleteMessage(id) {
  try {
    await fetch(`${API}/messages/${id}`, {
      method: "DELETE"
    });

    console.log(`Deleted message ${id}`);
    loadMessages();

  } catch (err) {
    console.error("Delete error:", err);
  }
}

// ---------------------------
// UPLOAD FILE (SAFE VERSION)
// ---------------------------
function uploadFile() {
  const fileInput = document.getElementById("file");

  if (!fileInput || !fileInput.files[0]) {
    alert("Please select a file");
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

  fetch(`${API}/upload`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert("Upload successful!");
    console.log(data);
  })
  .catch(err => {
    console.error("Upload error:", err);
  });
}

// ---------------------------
// INIT
// ---------------------------
loadMessages();
