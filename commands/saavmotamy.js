/*
  Command: saavmotamy
*/

var text = "🐻 *ـ مرحباً عزيزي العميل* ،\n\n" +
  "هذا القسم مخصّص فقط *للواتساب ، والتيليجرام* ، يرجى إختيار أحد السيرفرات في الأسفل ، *كل سيرفر يحتوي على عدة دول ذات سعر رخيص وجودة مضمونة جداً* ✅.";

var keyboard = {
  inline_keyboard: [
    [ { text: "🐬 - سيرفر واتسأب الملكي المُـمـيز ⭐️", callback_data: "Cw-31" } ],
    [ { text: "🍂 - سيرفر تيليجرام الملكي المُـمـيز ⭐️", callback_data: "Cw-36" } ],
    [ { text: "- رجوع 🔙", callback_data: "Buynum" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
