const output = document.getElementById("output");
const tokenInput = document.getElementById("token");
const webhookInput = document.getElementById("webhook");

webhookInput.value = `${window.location.origin}/api/index`;

function getToken() {
  return tokenInput.value.trim();
}

function getWebhook() {
  return webhookInput.value.trim();
}

async function callTelegramAPI(method, params = {}) {
  const token = getToken();
  if (!token) {
    output.innerText = "Please enter your bot token.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/${method}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      },
    );

    const data = await response.json();
    output.innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    output.innerText = "Error: " + error.message;
  }
}

async function setWebhook() {
  const url = getWebhook();
  if (!url) {
    output.innerText = "Please enter a webhook URL.";
    return;
  }

  await callTelegramAPI("setWebhook", { url });
}

async function removeWebhook() {
  await callTelegramAPI("deleteWebhook");
}

async function showStatus() {
  await callTelegramAPI("getWebhookInfo");
}

async function clearCache() {
  await callTelegramAPI("deleteWebhook", {
    drop_pending_updates: true,
  });
}

document.getElementById("setWebhook").onclick = setWebhook;
document.getElementById("editWebhook").onclick = setWebhook;
document.getElementById("removeWebhook").onclick = removeWebhook;
document.getElementById("showStatus").onclick = showStatus;
document.getElementById("clearCache").onclick = clearCache;
