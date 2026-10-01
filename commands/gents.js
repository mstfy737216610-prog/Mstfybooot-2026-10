/*
  Command: gents
*/

var admin_id = "8338869162";

var text = "🧑‍✈️ *- أهلاً بك عزيزي العميل* في قسم وكلاء البوت الرسميين المعتمدين في بوت *@pilotoooo* ☑️\n\n" +
  "يمكنك شحن رصيدك أو الاستفسار المباشر عبر الوكيل الرسمي.";

var keyboard = {
  inline_keyboard: [
    [ { text: "👮🏻 المالك الرسمي", url: "tg://user?id=" + admin_id } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
