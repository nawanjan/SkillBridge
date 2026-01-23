function sendMessage() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (!name || !message) {
    document.getElementById("response").innerText =
      "Please fill all fields";
    return;
  }

  fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, message })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("response").innerText = data.reply;
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
    })
    .catch(() => {
      document.getElementById("response").innerText =
        "Error sending message";
    });
}
