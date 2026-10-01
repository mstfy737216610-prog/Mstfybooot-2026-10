/*
  Command: Record
*/

var text = "☑️ *- هنا جميع سجلات حسابك والعمليات في البوت* 🚀";

var keyboard = {
  inline_keyboard: [
    [ { text: "⁞ سجل البوت العام ☑️", callback_data: "statsbot" } ],
    [ { text: "⁞ سجل حسابك الشخصي 🗂", callback_data: "Record2" } ],
    [ { text: "⁞ سجل جميع الأرقام المشتراة 📞", callback_data: "Download1" } ],
    [ { text: "⁞ سجل عمليات تحويل الروبل 🔁", callback_data: "Download4" } ],
    [ { text: "⁞ سجل كروت الشحن 🎟", callback_data: "Download3" } ],
    [ { text: "⁞ سجل عمليات شحن حسابك 💸", callback_data: "Download5" } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
