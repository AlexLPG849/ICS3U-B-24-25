const form = document.getElementById("user-form");
const tbody = document.querySelector("#user-table tbody");

async function loadUsers() {
  const res = await fetch("https://ics3u-b-24-25.onrender.com/api/users");
  const users = await res.json();

  tbody.innerHTML = "";

  for (const u of users) {
    const tr = document.createElement("tr");
    tr.dataset.id = u._id;

    tr.innerHTML = `
      <td>${u.name}</td>
      <td>${u.phone}</td>
      <td>${u.address}</td>
      <td><span class="pill">${u.gender}</span></td>
      <td>${u.age}</td>
      <td>${u.username}</td>
      <td>
        <button class="btn deleteBtn" data-id="${u._id}">✕</button>
      </td>
    `;

    tbody.appendChild(tr);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  const res = await fetch("https://ics3u-b-24-25.onrender.com/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    alert("Failed to save user");
    return;
  }

  form.reset();
  loadUsers();
});

tbody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = e.target.dataset.id;
    await fetch(`https://ics3u-b-24-25.onrender.com/api/users/${id}`, { method: "DELETE" });
    e.target.closest("tr").remove();
  }
});

loadUsers();