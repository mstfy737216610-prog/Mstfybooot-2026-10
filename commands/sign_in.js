/*
  Command: sign_in
*/

var margin = Math.floor(100000 + Math.random() * 900000);
User.setProperty("captcha_answer", margin, "string");

var text = "✅ - لأمان حسابك *وحماية خصوصيتك*، نحتاج للتحقق من *انك انساناً ولست روبوتاً* اولاً. ♻️\n\n" +
  "🔘 - قم بكتابة الرقم الظاهر أمامك *[ `" + margin + "` ]* \n\n" +
  "☑️ - أرسل لنا *الإجابة الصحيحة* للتحقق من *انك لست روبوتاً.*";

var keyboard = {
  inline_keyboard: [
    [ { text: "رجوع للخلف 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
