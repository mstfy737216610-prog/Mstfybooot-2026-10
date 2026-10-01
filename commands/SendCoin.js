/*
  Command: SendCoin
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var text = "☑️ - يمكنك الآن *تحويل رصيد من حسابك الى حساب شخص آخر* بشكل مباشر وفي مدة *لاتتعدى الـ 10 ثواني* ✅\n\n" +
  "🔄 - عمولة التحويل: *0%* ⚜\n" +
  "⚠️ - أقل مبلغ للتحويل: *20.00 ₽* 💸\n\n" +
  "أرسل الحساب أو الأيدي الرقمي للشخص الذي ترغب بالتحويل له ⬇️";

var keyboard = [
  [
    { text: "- إلغاء والرجوع 🔙", title: "- إلغاء والرجوع 🔙", callback_data: "back", command: "back" }
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
