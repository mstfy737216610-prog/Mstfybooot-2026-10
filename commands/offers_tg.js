/*
  Command: offers_tg
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var text = "🎁 *عروض أرقام Telegram السريعة:*\n\n" +
  "إختر الدولة التي تريد شراء رقم تفعيل تيليجرام فوري لها بأقل تكلفة ↘️";

var keyboard = [
  [
    { text: "روسيا 🇷🇺 ¦ 15 ₽", title: "روسيا 🇷🇺 ¦ 15 ₽", callback_data: "Xi-0tg941", command: "Xi-0tg941" },
    { text: "أوكرانيا 🇺🇦 ¦ 16 ₽", title: "أوكرانيا 🇺🇦 ¦ 16 ₽", callback_data: "Xi-1tg941", command: "Xi-1tg941" }
  ],
  [
    { text: "كازاخستان 🇰🇿 ¦ 18 ₽", title: "كازاخستان 🇰🇿 ¦ 18 ₽", callback_data: "Xi-2tg941", command: "Xi-2tg941" },
    { text: "إندونيسيا 🇮🇩 ¦ 12 ₽", title: "إندونيسيا 🇮🇩 ¦ 12 ₽", callback_data: "Xi-6tg941", command: "Xi-6tg941" }
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
