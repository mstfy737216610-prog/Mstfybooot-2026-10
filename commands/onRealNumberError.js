/*
  Command: onRealNumberError
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

Api.sendMessage({
  chat_id: target_chat_id,
  text: "❌ *تعذر الاتصال بخادم المزود الفعلي.*\n\nيرجى التأكد من اتصال الإنترنت وصلاحية مفتاح الـ API الخاص بموقع التوريد.",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [ { text: "- رجوع 🔙", title: "- رجوع 🔙", callback_data: "back", command: "back" } ]
    ]
  }
});
