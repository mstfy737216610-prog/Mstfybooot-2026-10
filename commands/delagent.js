/*
  Command: delagent
*/

var text = "👮🏻 *قائمة الوكلاء الرسميين:*\n\n" +
  "لا يوجد وكلاء مضافين حالياً لإزالتهم، يمكنك إضافة وكلاء جدد عبر زر [إضافة وكيل 🧑‍✈️].";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
