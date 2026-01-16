"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = messageHandler;
const API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
async function sendPOSTrequest(chatId, text, replyTo) {
    await fetch(`${API}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            reply_to_message_id: replyTo,
        }),
    });
}
async function sendPhoto(chatId, photoUrl, caption, replyTo) {
    await fetch(`${API}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            photo: photoUrl,
            caption,
            reply_to_message_id: replyTo,
        }),
    });
}
async function messageHandler(request, reply) {
    const msg = request.body?.message;
    if (!msg)
        return reply.end();
    const chatId = msg.chat.id;
    const text = msg.text;
    const messageId = msg.message_id;
    if (text === "/start")
        await sendPOSTrequest(chatId, "Welcome! Bot is alive.", messageId);
    else if (text === "/ping")
        await sendPOSTrequest(chatId, "Pong!", messageId);
    else if (text === "/image")
        await sendPhoto(chatId, "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/British_singer_and_songwriter_Dua_Lipa_at_the_SWR3_New_Pop_Festival_2016.jpg/250px-British_singer_and_songwriter_Dua_Lipa_at_the_SWR3_New_Pop_Festival_2016.jpg", "Here is your image!", messageId);
    else
        await sendPOSTrequest(chatId, "Unknown command.", messageId);
    reply.end();
}
