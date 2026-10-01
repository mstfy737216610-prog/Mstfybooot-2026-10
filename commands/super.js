/*
  Command: super
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;
var admin_id = "8338869162";

var text = "💬 *- قسم التواصل مع الدعم أونلاين*\n\n" +
  "⚜ - هنا يمكنك *التواصل معنا* لحل جميع *المشكلات التي قد تواجهك* في البوت 💛\n" +
  "☑️ - أرسل *رسالتك* الآن وسوف يتم *إيصالها إلى الإدارة* مباشرة.\n\n" +
  "🕰 - متواجدون طوال اليوم ❄️\n" +
  "❎ - فضلاً لا ترسل الألفاظ غير اللائقة ☺️🖤";

var keyboard = [
  [
    { text: "💬 مراسلة المالك مباشرة 👨‍💻", title: "💬 مراسلة المالك مباشرة 👨‍💻", url: "tg://user?id=" + admin_id }
  ],
  [
    { text: "- إلغاء والرجوع 🔙", title: "- إلغاء والرجوع 🔙", callback_data: "back", command: "back" }
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
