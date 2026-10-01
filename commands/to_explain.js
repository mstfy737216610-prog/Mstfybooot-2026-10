/*
  Command: to_explain
*/

var text = "• *مرحبا بك عزيزي في قسم التعليمات والشروط.*\n\n" +
  "• *شروط البوت :* ↘️\n\n" +
  "- هذا البوت يقوم بجلب أرقام وهمية لجميع مواقع السوشيل ميديا.\n" +
  "- البوت لايتحمل مسؤولية الأرقام في حالة أنها انحظرت.\n\n" +
  "• *للإستفسار تواصل معنا:* @Engku8 .";

var keyboard = {
  inline_keyboard: [
    [ { text: "رجوع للخلف 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
