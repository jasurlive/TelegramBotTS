const output = document.getElementById("output");
const getToken = () => document.getElementById("token").value.trim();
const getWebhook = () => document.getElementById("webhook").value.trim();

const callTelegramAPI = async (method, params = {}) => {
  const token = getToken();
  if (!token) {
    output.innerText = "⚠️ Please enter your bot token.";
    return null;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    output.innerText = JSON.stringify(data, null, 2);
    return data;
  } catch (err) {
    output.innerText = "❌ Error: " + (err.message || err);
    return null;
  }
};

const setWebhook = async () => {
  const url = getWebhook();
  if (!url) {
    output.innerText = "⚠️ Please enter a webhook URL.";
    return;
  }
  await callTelegramAPI("setWebhook", { url });
};

const editWebhook = setWebhook;

const removeWebhook = async () => {
  await callTelegramAPI("deleteWebhook");
};

const showStatus = async () => {
  await callTelegramAPI("getWebhookInfo");
};

// ✅ Clear pending updates using Telegram API
const clearCache = async () => {
  await callTelegramAPI("deleteWebhook", { drop_pending_updates: true });
};

document.getElementById("setWebhook").onclick = setWebhook;
document.getElementById("editWebhook").onclick = editWebhook;
document.getElementById("removeWebhook").onclick = removeWebhook;
document.getElementById("showStatus").onclick = showStatus;
document.getElementById("clearCache").onclick = clearCache;
