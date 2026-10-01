/*
  Command: assignment
*/

var user_id = user.telegramid;
var count = User.getProperty("referrals_count") || 0;
var earnings = (count * 0.25).toFixed(2);
var bot_username = bot.name || "pilotoooo";

var text = "💸 *- إربح روبل الآن مجاناً* عبر مشاركة رابط البوت إلى أصدقائك 👥\n" +
  "*- واحصل على 0.25 روبل* مقابل كل شخص يقوم بالدخول والتسجيل عبر الرابط الخاص بك ✅\n\n" +
  "☑️ - رابط الدعوة الخاص بك:\n" +
  "https://t.me/" + bot_username + "?start=" + user_id + "\n\n" +
  "*- عدد من قام بالدخول عبر رابطك:* " + count + " 👤\n" +
  "*- إجمالي أرباحك حتى الآن:* " + earnings + " ₽ 💰";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
