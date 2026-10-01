/*
  Command: Payment
*/

var admin_id = "8338869162";
var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var text = "☑️ *- تستطيع شحن حسابك الآن عبر:*\n\n" +
  "💸 #إيداع_كريمي_وتحويل\n" +
  "💸 #تحويل_صرافة_يمنية\n" +
  "💸 #بطائق_سوا_stc_موبايلي\n" +
  "💸 #بايير_وعملات_رقمية_USDT\n" +
  "💸 #راجحي #stcpay #أهلي\n" +
  "💸 #آسياسيل #زين_كاش\n\n" +
  "🥇 - للشحن تواصل مباشرة مع المالك أو الوكيل الرسمي للبوت ✅";

var keyboard = [
  [
    { text: "💭 - تواصل بـ فريق الدعم ↖️", title: "💭 - تواصل بـ فريق الدعم ↖️", url: "tg://user?id=" + admin_id }
  ],
  [
    { text: "🎁 - الشحن عبر إدخال كرت شحن ☑️", title: "🎁 - الشحن عبر إدخال كرت شحن ☑️", callback_data: "Card", command: "Card" }
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
