/*
  Command: worldwide
*/

var text = "*- هنا قائمة السيرفرات العشوائية* 🌐\n\n" +
  "*- إضغط على أحد السيرفرات بالأسفل* للشراء من دولة عشوائية سريعة الوصول 💰";

var keyboard = {
  inline_keyboard: [
    [ { text: "♻️ سيرفر [ WhatsApp ] عشوائي بسعر 10 روبل 💰", callback_data: "Wi-21" } ],
    [ { text: "♻️ سيرفر [ WhatsApp ] عشوائي بسعر 16 روبل 💰", callback_data: "Wi-22" } ],
    [ { text: "♻️ سيرفر [ Telegram ] عشوائي بسعر 15 روبل 💰", callback_data: "Wi-26" } ],
    [ { text: "♻️ سيرفر [ Telegram ] عشوائي بسعر 16 روبل 💰", callback_data: "Wi-27" } ],
    [ { text: "- رجوع 🔙", callback_data: "Buynum" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
