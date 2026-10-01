/*
  Command: delcoin
*/

var text = "📛 - أرسل الحساب (الإيميل أو الأيدي) الذي تريد خصم الرصيد منه ♻️\n\n" +
  "مثال: `user@pilotoooo.COM` أو `123456789`";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
