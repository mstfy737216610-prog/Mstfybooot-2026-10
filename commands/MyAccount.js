/*
  Command: MyAccount
*/

var text = "☑️ *- قسم الإعدادات الخاصة بحسابك في البوت.*";

var keyboard = {
  inline_keyboard: [
    [ { text: "🔑︙تعديل كلمة سر الحساب", callback_data: "changepass" } ],
    [ { text: "🔄︙تحويل روبل إلى حساب صديق", callback_data: "SendCoin" } ],
    [ { text: "☑️︙إستلام تحويل روبل برقم الحماية", callback_data: "receiptpri" } ],
    [ { text: "✅︙الدخول بحساب آخر", callback_data: "login" } ],
    [ { text: "⚠️︙تسجيل الخروج من الحساب", callback_data: "logout" } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
