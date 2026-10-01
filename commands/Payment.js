/*
  Command: Payment
*/

var admin_id = "8338869162";

var text = "☑️ *- تستطيع شحن حسابك الآن عبر:*\n\n" +
  "💸 #إيداع_كريمي_وتحويل\n" +
  "💸 #تحويل_صرافة_يمنية\n" +
  "💸 #بطائق_سوا_stc_موبايلي\n" +
  "💸 #بايير_وعملات_رقمية_USDT\n" +
  "💸 #راجحي #stcpay #أهلي\n" +
  "💸 #آسياسيل #زين_كاش\n\n" +
  "🥇 - للشحن تواصل مباشرة مع المالك أو الوكيل الرسمي للبوت ✅";

var keyboard = {
  inline_keyboard: [
    [ { text: "💭 - تواصل بـ فريق الدعم ↖️", url: "tg://user?id=" + admin_id } ],
    [ { text: "🎁 - الشحن عبر إدخال كرت شحن ☑️", callback_data: "Card" } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
