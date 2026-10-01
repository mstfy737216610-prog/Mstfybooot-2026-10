/*
  Command: card
*/

var text = "💯 حسنا مطوري 🖤\n\n" +
  "قم بإرسال قيمة الكرت بالروبل الآن (أرقام فقط مثل: 50 أو 100 أو 500) وسيتم توليد كرت فريد تلقائياً لشحن الحسابات 💳";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
