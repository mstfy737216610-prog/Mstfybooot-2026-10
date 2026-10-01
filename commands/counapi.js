/*
  Command: counapi
*/

var text = "🔰 تستطيع عبر هذه الأزرار رفع وحذف اي API لاي موقع تريده ومزامنته فورياً مع خوادم التوريد ☑️\n\n" +
  "المواقع المدعومة:\n" +
  "5sim · tempnum · sms-man · vak-sms · acktiwator · pvapins · sms3t · onlinesim · supersmstech · viotp · simsms · grizzly · smscode · tiger-sms · 2ndline · receivesms · fastpva · dropsms · 24sms7 · sellotp · duraincloud";

var keyboard = {
  inline_keyboard: [
    [ { text: "➕ رفع مفتاح API لموقع معين", callback_data: "addapi" } ],
    [ { text: "✖️ حذف مفتاح API لموقع معين", callback_data: "delapi" } ],
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
