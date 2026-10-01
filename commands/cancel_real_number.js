/*
  Command: cancel_real_number
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;
var order_id = params || User.getProperty("current_active_order_id");
var api_key = Bot.getProperty("5sim_api_key") || "";

if (order_id && api_key) {
  HTTP.get({
    url: "https://5sim.biz/v1/user/ban/" + order_id,
    headers: {
      "Authorization": "Bearer " + api_key,
      "Accept": "application/json"
    },
    success: "onRealNumberCancelled",
    error: "onRealNumberError"
  });
} else {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: "✅ تم إلغاء الرقم بنجاح.",
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [ { text: "🏡 القائمة الرئيسية", title: "🏡 القائمة الرئيسية", callback_data: "back", command: "back" } ]
      ]
    }
  });
}
