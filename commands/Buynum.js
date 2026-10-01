/*
  Command: Buynum
*/

var text = "☑️ - *يرجى إختيار التطبيق* الذي تريد *شراء رقم وهمي* لتفعيله 🎥\n\n" +
  "🔺 - يمكنك إختيار *السيرفر العام* ☑️ ، يمكن ل هذا السيرفر شراء رقم يستقبل الكود لكل البرامج المتوفرة لديك *وبسعر واحد ومميز* 👾";

var keyboard = {
  inline_keyboard: [
    [ { text: "⁞ واتسأب 💬", callback_data: "Kn-2" }, { text: "⁞ تيليجرام 📢", callback_data: "Kn-3" } ],
    [ { text: "⁞ إنستقرام 🎥", callback_data: "Kn-5" }, { text: "⁞ فيسبوك 🏆", callback_data: "Kn-4" } ],
    [ { text: "⁞ تويتر 🚀", callback_data: "Kn-6" }, { text: "⁞ تيكتوك 🎬", callback_data: "Kn-7" } ],
    [ { text: "⁞ قوقل 🌐", callback_data: "Kn-8" }, { text: "⁞ سناب 🐬", callback_data: "Kn-11" } ],
    [ { text: "⁞ حراج 🛍", callback_data: "Kn-13" }, { text: "⁞ إيمو 🐦", callback_data: "Kn-9" } ],
    [ { text: "⁞ السيرفر العام ☑️", callback_data: "Kn-14" } ],
    [ { text: "⁞ السيرفر الملكي 👑", callback_data: "saavmotamy" } ],
    [ { text: "⁞ سيرفرات الشراء العشوائي ♻️", callback_data: "worldwide" } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
