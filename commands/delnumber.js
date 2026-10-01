/*
  Command: delnumber
*/

var text = "🎬 - قم بإختيار التطبيق الذي تود حذف الدولة من البوت له ❌";

var keyboard = {
  inline_keyboard: [
    [ { text: "- السيرفر العام", callback_data: "delcon-14" } ],
    [ { text: "- تيليجرام", callback_data: "delcon-3" }, { text: "- واتسأب", callback_data: "delcon-2" } ],
    [ { text: "- إنستقرام", callback_data: "delcon-5" }, { text: "- فيسبوك", callback_data: "delcon-4" } ],
    [ { text: "- تيكتوك", callback_data: "delcon-7" }, { text: "- تويتر", callback_data: "delcon-6" } ],
    [ { text: "- إيمو", callback_data: "delcon-9" }, { text: "- قوقل", callback_data: "delcon-8" } ],
    [ { text: "- سناب", callback_data: "delcon-11" }, { text: "- فايبر", callback_data: "delcon-10" } ],
    [ { text: "- حراج", callback_data: "delcon-13" }, { text: "- نيتفلكس", callback_data: "delcon-12" } ],
    [ { text: "♻️ سيرفر عشوائي [ WhatsApp and Telegram ]", callback_data: "Wdele" } ],
    [ { text: "🐬 - سيرفر واتسأب + تليجرام المُـمـيز", callback_data: "Cdelw" } ],
    [ { text: "- قسم العروض", callback_data: "delcon-1" } ],
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
