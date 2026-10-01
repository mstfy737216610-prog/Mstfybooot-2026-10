/*
  Command: unnum
*/

var text = "🆔 - أرسل أيدي العضو الرقمي (Telegram ID) الذي تريد فك تقييده عن الشراء فوراً ♻️\n\n" +
  "مثال: `8338869162`";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
