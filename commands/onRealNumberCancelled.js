/*
  Command: onRealNumberCancelled
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

User.setProperty("current_active_order_id", null);
User.setProperty("current_active_phone", null);

Api.sendMessage({
  chat_id: target_chat_id,
  text: "🚫 *تم إلغاء الرقم لدى المزود بنجاح واسترداد رصيدك بالكامل.*",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [ { text: "🏡 القائمة الرئيسية", title: "🏡 القائمة الرئيسية", callback_data: "back", command: "back" } ]
    ]
  }
});
