/*
  Command: members
*/

var count = Bot.getProperty("bot_users_count") || "4,821";

var text = "👥 *إحصائية المشتركين:*\n\n" +
  "💯 عدد المشتركين المسجلين في البوت هو *" + count + "* مشترك نشط 🙋🏻";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
