/*
  Command: other_services
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var text = "🛸 *خدمات وميزات إضافية:*\n\n" +
  "• متجر الكروت الجاهزة 💳\n" +
  "• كشف العمليات السابقة 🅿️\n" +
  "• سوق الأرقام الجاهزة 🔰\n" +
  "• خدمات الرشق وزيادة المتابعين 👤\n" +
  "• قائمة الوكلاء المعتمدين 🧑‍✈️";

var keyboard = [
  [
    { text: "💳 متجر الكروت", title: "💳 متجر الكروت", callback_data: "Card", command: "Card" },
    { text: "🔰 الأرقام الجاهزة", title: "🔰 الأرقام الجاهزة", callback_data: "ready", command: "ready" }
  ],
  [
    { text: "🅿️ كشف الحساب والسجلات", title: "🅿️ كشف الحساب والسجلات", callback_data: "Record", command: "Record" },
    { text: "🧑‍✈️ قسم الوكلاء", title: "🧑‍✈️ قسم الوكلاء", callback_data: "gents", command: "gents" }
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
