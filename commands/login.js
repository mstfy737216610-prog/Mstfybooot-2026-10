/*
  Command: login
*/

var text = "♻️ - يرجى إرسال *رقم الهاتف* المرتبط بحسابك أو *معرف الحساب* المسجل مسبقاً للبدء.";
var keyboard = {
  inline_keyboard: [
    [ { text: "رجوع للخلف 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
