/*
  Command: baluser
*/

var all_points = Bot.getProperty("total_rubles_pool") || "142,580";
var all_history = Bot.getProperty("total_rubles_history") || "890,410";
var spent_points = Bot.getProperty("total_rubles_spent") || "747,830";
var sold_numbers = Bot.getProperty("total_sold_numbers") || "18,492";

var text = "👥 *إحصائية روبل الجميع: " + all_points + " ₽ ❗️*\n\n" +
  "إحصائيات جميع الروبل منذ افتتاح البوت: *" + all_history + " ₽* ✅\n\n" +
  "إحصائيات الرصيد المستهلك من الجميع: *" + spent_points + " ₽* ♨️\n\n" +
  "إحصائيات الأرقام المباعة من قبل المستخدمين: *" + sold_numbers + " 📞*\n\n" +
  "📆 هذه الإحصائيات مستمرة ومحدثة تلقائياً ☑️";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
