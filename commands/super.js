/*
  Command: super
*/

var text = "💬 *- قسم التواصل مع الدعم أونلاين*\n\n" +
  "⚜ - هنا يمكنك *التواصل معنا* لحل جميع *المشكلات التي قد تواجهك* في البوت. 💛\n" +
  "☑️ - أرسل *رسالتك* الآن وسوف يتم *إيصالها إلى الإدارة* مباشرة.\n\n" +
  "🕰 - متواجدون طوال اليوم ❄️\n" +
  "❎ - فضلاً لا ترسل الألفاظ غير اللائقة ☺️🖤";

var keyboard = {
  inline_keyboard: [
    [ { text: "- إلغاء التواصل ⛔️", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
