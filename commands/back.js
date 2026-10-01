/*
  Command: back
*/

var first_name = user.first_name || "عزيزي";
var user_id = "" + (user.telegramid || "");
var user_account = User.getProperty("account_email");
var user_balance = User.getProperty("balance") || 0;
var user_spent = User.getProperty("spent") || 0;

if (user_account) {
  var home_text = "👨‍✈️ *⁞ مرحبا بك* [" + first_name + "](tg://user?id=" + user_id + ") ؛\n" +
    "🏛 *⁞ هذه تفاصيل حسابك في البوت* ⬇️\n\n" +
    "📨︙حسابك: *" + user_account + "*\n" +
    "💰︙رصيدك: *₽ " + user_balance + " 💸*\n" +
    "🆔︙أيدي حسابك: *" + user_id + " ⚜*\n" +
    "♻️︙رصيدك المصرف: *" + user_spent + " 🗞*\n\n" +
    "☑️ *⁞ قناة البوت الرسمية: @sms_com_bot*\n" +
    "🎬︙قم بالتحكم بالبوت الأن عبر الضغط على الأزرار.";

  var home_keyboard = {
    inline_keyboard: [
      [ { text: "☎️︙شراء ارقـام وهمية", callback_data: "Buynum" } ],
      [ { text: "💰︙شحن رصيدك", callback_data: "Payment" }, { text: "👤︙قسم الرشق", callback_data: "sh" } ],
      [ { text: "🅿️︙كشف الحساب", callback_data: "Record" }, { text: "🛍︙قسم العروض", callback_data: "Wo" } ],
      [ { text: "☑️︙قسم العشوائي", callback_data: "worldwide" }, { text: "👑︙قسم الملكي", callback_data: "saavmotamy" } ],
      [ { text: "💰︙ربح روبل مجاني 🤑", callback_data: "assignment" } ],
      [ { text: "💳︙متجر الكروت", callback_data: "readycard" }, { text: "🔰︙الارقام الجاهزة", callback_data: "ready" } ],
      [ { text: "👨‍💻︙قسم الوكلاء", callback_data: "gents" }, { text: "⚙︙إعدادات البوت", callback_data: "MyAccount" } ],
      [ { text: "📮︙تواصل الدعم أونلاين", callback_data: "super" } ]
    ]
  };

  Bot.sendMessage(home_text, {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify(home_keyboard)
  });
} else {
  Bot.runCommand("/start");
}
