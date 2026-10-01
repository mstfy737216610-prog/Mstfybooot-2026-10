/*
  Command: MyAccount
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;
var user_id = "" + (user.telegramid || "8338869162");
var balance = User.getProperty("balance") || "10.5";

var text = "👤 *تفاصيل حسابك الشخصي:*\n\n" +
  "🆔 أيدي الحساب: `" + user_id + "`\n" +
  "💰 الرصيد الحالي: *" + balance + " ₽*\n\n" +
  "إختر الإجراء المطلوب من الخيارات بالأسفل ⬇️";

var keyboard = [
  [
    { text: "🔑︙تعديل كلمة سر الحساب", title: "🔑︙تعديل كلمة سر الحساب", callback_data: "changepass", command: "changepass" }
  ],
  [
    { text: "🔄︙تحويل روبل إلى حساب صديق", title: "🔄︙تحويل روبل إلى حساب صديق", callback_data: "SendCoin", command: "SendCoin" }
  ],
  [
    { text: "☑️︙إستلام تحويل روبل برقم الحماية", title: "☑️︙إستلام تحويل روبل برقم الحماية", callback_data: "receiptpri", command: "receiptpri" }
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
