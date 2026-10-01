/*
  Command: Buynum
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var text = "☑️ - *يرجى إختيار التطبيق* الذي تريد *شراء رقم وهمي* لتفعيله 🎥\n\n" +
  "🔺 - يمكنك إختيار *السيرفر العام* ☑️ ، يمكن ل هذا السيرفر شراء رقم يستقبل الكود لكل البرامج المتوفرة لديك *وبسعر واحد ومميز* 👾";

var keyboard = [
  [
    { text: "⁞ واتسأب 💬", title: "⁞ واتسأب 💬", callback_data: "Kn-2", command: "Kn-2" },
    { text: "⁞ تيليجرام 📢", title: "⁞ تيليجرام 📢", callback_data: "Kn-3", command: "Kn-3" }
  ],
  [
    { text: "⁞ إنستقرام 🎥", title: "⁞ إنستقرام 🎥", callback_data: "Kn-5", command: "Kn-5" },
    { text: "⁞ فيسبوك 🏆", title: "⁞ فيسبوك 🏆", callback_data: "Kn-4", command: "Kn-4" }
  ],
  [
    { text: "⁞ تويتر 🚀", title: "⁞ تويتر 🚀", callback_data: "Kn-6", command: "Kn-6" },
    { text: "⁞ تيكتوك 🎬", title: "⁞ تيكتوك 🎬", callback_data: "Kn-7", command: "Kn-7" }
  ],
  [
    { text: "⁞ قوقل 🌐", title: "⁞ قوقل 🌐", callback_data: "Kn-8", command: "Kn-8" },
    { text: "⁞ سناب 🐬", title: "⁞ سناب 🐬", callback_data: "Kn-11", command: "Kn-11" }
  ],
  [
    { text: "⁞ حراج 🛍", title: "⁞ حراج 🛍", callback_data: "Kn-13", command: "Kn-13" },
    { text: "⁞ إيمو 🐦", title: "⁞ إيمو 🐦", callback_data: "Kn-9", command: "Kn-9" }
  ],
  [
    { text: "⁞ السيرفر العام ☑️", title: "⁞ السيرفر العام ☑️", callback_data: "Kn-14", command: "Kn-14" }
  ],
  [
    { text: "⁞ السيرفر الملكي 👑", title: "⁞ السيرفر الملكي 👑", callback_data: "saavmotamy", command: "saavmotamy" }
  ],
  [
    { text: "⁞ سيرفرات الشراء العشوائي ♻️", title: "⁞ سيرفرات الشراء العشوائي ♻️", callback_data: "worldwide", command: "worldwide" }
  ],
  [
    { text: "- رجوع 🔙", title: "- رجوع 🔙", callback_data: "back", command: "back" }
  ]
];

try {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: text,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: keyboard }
  });
} catch(e) {
  Bot.sendInlineKeyboard(keyboard, text);
}
