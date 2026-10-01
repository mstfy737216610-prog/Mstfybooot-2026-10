/*
  Command: unres
*/

var text = "🔓 - أرسل الحساب (الإيميل) الذي تريد فك تقييده وإعادة تفعيل الشراء له في البوت ♻️";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
