/*
  Command: addagent
*/

var text = "🔰 - أرسل الحساب (الإيميل) الذي تريد رفعه كـ وكيل معتمد رسمي في البوت 🎖\n\n" +
  "مثال: `agent@pilotoooo.COM`";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
