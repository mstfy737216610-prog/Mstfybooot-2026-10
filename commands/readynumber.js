/*
  Command: readynumber
*/

var text = "*🔰 - أضف الرقم الجاهز بالشكل التالي:*\n\n" +
  "1⃣ الدولة / الاسم :-\n" +
  "2⃣ السعر بالروبل :-\n" +
  "3⃣ الحالة (جديد / مستخدم) :-\n" +
  "4⃣ ملاحظة :-\n" +
  "5⃣ الرقم مع النداء :-\n" +
  "6⃣ كود التفعيل :-\n\n" +
  "⚠️ - بعد إرسال البيانات سيتم إضافته مباشرة ونشر إشعار تلقائي بقناة البوت.";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
