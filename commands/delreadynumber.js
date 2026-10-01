/*
  Command: delreadynumber
*/

var text = "☎️ *إدارة الأرقام الجاهزة:*\n\n" +
  "لا توجد أرقام جاهزة مضافة حالياً لحذفها، أو تم حجزها من قبل المستخدمين بالكامل ⚜️";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
