const API_URL = "http://localhost:3000"; // Backend URL

// ✅ User Signup
async function signup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    document.getElementById("signupError").innerText = data.message;
  }
}

// ✅ User Login
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    document.getElementById("loginError").innerText = data.message;
  }
}

// ✅ Logout Function
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
