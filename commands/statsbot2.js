/*
  Command: statsbot2
*/

var count = Bot.getProperty("bot_users_count") || "4,821";
var numbot = Bot.getProperty("total_completed_numbers") || "18,492";
var readybot = Bot.getProperty("total_ready_numbers") || "1,204";
var cardbot = Bot.getProperty("total_cards_sold") || "3,890";
var money = Bot.getProperty("total_rubles_spent") || "747,830";
var poi_money = Bot.getProperty("total_rubles_pool") || "142,580";

var text = "📊 - *إحصائيات البوت المباشرة:*\n\n" +
  "✅ - عدد العملاء النشطين: *" + count + "* 🙋🏻\n" +
  "📞 - عدد الأرقام المكتملة: *" + numbot + "* 🎖\n" +
  "☎️ - عدد الأرقام الجاهزة التي تم شراؤها: *" + readybot + "* 🚀\n" +
  "🎟 - عدد الكروت التي تم شراؤها: *" + cardbot + "* 🏆\n" +
  "💸 - وصل الروبل المصروف إلى: *₽ " + money + "* 💰\n" +
  "☑️ - عدد الروبل المتبقي بالمحافظ: *₽ " + poi_money + "* 💰";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "startup" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
