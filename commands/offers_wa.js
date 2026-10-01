/*
  Command: offers_wa
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var text = "🎁 *عروض أرقام WhatsApp المميزة:*\n\n" +
  "إختر الدولة التي تريد شراء رقم تفعيل واتساب لها بأفضل سعر مخفض ↘️";

var keyboard = [
  [
    { text: "اليمن 🇾🇪 ¦ 20 ₽", title: "اليمن 🇾🇪 ¦ 20 ₽", callback_data: "Xi-30wa941", command: "Xi-30wa941" },
    { text: "السعودية 🇸🇦 ¦ 35 ₽", title: "السعودية 🇸🇦 ¦ 35 ₽", callback_data: "Xi-53wa941", command: "Xi-53wa941" }
  ],
  [
    { text: "مصر 🇪🇬 ¦ 15 ₽", title: "مصر 🇪🇬 ¦ 15 ₽", callback_data: "Xi-21wa941", command: "Xi-21wa941" },
    { text: "العراق 🇮🇶 ¦ 25 ₽", title: "العراق 🇮🇶 ¦ 25 ₽", callback_data: "Xi-47wa941", command: "Xi-47wa941" }
  ],
  [
    { text: "إندونيسيا 🇮🇩 ¦ 10 ₽", title: "إندونيسيا 🇮🇩 ¦ 10 ₽", callback_data: "Xi-6wa941", command: "Xi-6wa941" },
    { text: "فيتنام 🇻🇳 ¦ 11 ₽", title: "فيتنام 🇻🇳 ¦ 11 ₽", callback_data: "Xi-10wa941", command: "Xi-10wa941" }
  ],
  [
    { text: "- رجوع 🔙", title: "- رجوع 🔙", callback_data: "back", command: "back" }
  ]
];

try {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: text,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: keyboard }
  });
} catch(e) {
  Bot.sendInlineKeyboard(keyboard, text);
}
