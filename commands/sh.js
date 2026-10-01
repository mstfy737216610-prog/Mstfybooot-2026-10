/*
  Command: sh
*/

var admin_id = "8338869162";

var text = "👤 *- قسم خدمات الرشق وزيادة المتابعين:*\n\n" +
  "⚠️ - عذراً قسم الرشق التلقائي مغلق للصيانة حالياً.\n" +
  "💬 - يمكنك طلب خدمات الرشق المباشرة عبر مراسلة المالك.";

var keyboard = {
  inline_keyboard: [
    [ { text: "💬 مراسلة المالك للرشق", url: "tg://user?id=" + admin_id } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
