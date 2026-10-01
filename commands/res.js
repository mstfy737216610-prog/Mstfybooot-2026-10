/*
  Command: res
*/

var text = "☑️ - أرسل الحساب (الإيميل أو الأيدي) الذي تريد تقييده ومنعه من الشراء في البوت ♻️\n\n" +
  "مثال: `8338869162` أو `client@pilotoooo.COM`";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
