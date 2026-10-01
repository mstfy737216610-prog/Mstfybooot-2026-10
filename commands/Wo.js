/*
  Command: Wo
*/

var text = "🛍 *- قسم العروض الخاصة والتخفيضات المتوفرة في البوت:*\n\n" +
  "✅ - إختر الدولة المطلوبة للشراء بأرخص سعر ممكن 🔰";

var keyboard = {
  inline_keyboard: [
    [ { text: "روسيا 🇷🇺 ¦ 12.00 ₽", callback_data: "Xi-0wa941" }, { text: "أوكرانيا 🇺🇦 ¦ 15.00 ₽", callback_data: "Xi-1wa941" } ],
    [ { text: "إندونيسيا 🇮🇩 ¦ 10.00 ₽", callback_data: "Xi-6wa941" }, { text: "الفلبين 🇵🇭 ¦ 9.50 ₽", callback_data: "Xi-4wa941" } ],
    [ { text: "فيتنام 🇻🇳 ¦ 11.00 ₽", callback_data: "Xi-10wa941" }, { text: "الهند 🇮🇳 ¦ 14.00 ₽", callback_data: "Xi-22wa941" } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
