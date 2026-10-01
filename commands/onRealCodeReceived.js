/*
  Command: onRealCodeReceived
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

try {
  var data = JSON.parse(content);

  // Check if real SMS arrived
  if (data.sms && data.sms.length > 0) {
    var first_sms = data.sms[0];
    var code = first_sms.code;
    var full_text = first_sms.text || code;
    var phone = data.phone || User.getProperty("current_active_phone");

    var success_msg = "🎉 *تم استلام كود التفعيل الحقيقي بنجاح!* ✅\n\n" +
      "☎️ - الرقم : `" + phone + "`\n" +
      "💬 - كود التفعيل : `" + code + "`\n\n" +
      "📜 نص الرسالة المستلمة:\n`" + full_text + "`\n\n" +
      "إضغط على الكود لنسخه مباشرة.";

    Api.sendMessage({
      chat_id: target_chat_id,
      text: success_msg,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [ { text: "🏡 القائمة الرئيسية", title: "🏡 القائمة الرئيسية", callback_data: "back", command: "back" } ]
        ]
      }
    });
  } else {
    // Waiting for code
    Api.sendMessage({
      chat_id: target_chat_id,
      text: "⏳ *الكود لم يصل من المزود بعد*\n\nيرجى طلب الكود في واتساب/تيليجرام والانتظار 10 ثوانٍ ثم الضغط على تحديث مجدداً.",
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [ { text: "♻️ تحديث الكود الآن", title: "♻️ تحديث الكود الآن", callback_data: "check_real_code-" + data.id, command: "check_real_code-" + data.id } ],
          [ { text: "🚫 إلغاء الرقم", title: "🚫 إلغاء الرقم", callback_data: "cancel_real_number-" + data.id, command: "cancel_real_number-" + data.id } ]
        ]
      }
    });
  }
} catch(err) {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: "⚠️ تعذر معالجة الرسالة من المزود: " + content,
    parse_mode: "Markdown"
  });
}
