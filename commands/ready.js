/*
  Command: ready
*/

var text = "☑️ *- هذه هي قائمة الأرقام الجاهزة المتوفرة في البوت:*\n\n" +
  "🗄 - يمكنك الشراء الفوري لأرقام مفعلة وجاهزة مع كودها بنقرة واحدة ♻️\n\n" +
  "⚠️ حالياً يتم تجديد الأرقام الجاهزة بواسطة الإدارة دورياً.";

var keyboard = {
  inline_keyboard: [
    [ { text: "تحديث الصفحة 🔂", callback_data: "ready" } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
