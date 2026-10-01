/*
  Command: check_real_code
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;
var order_id = params || User.getProperty("current_active_order_id");
var api_key = Bot.getProperty("5sim_api_key") || "";

if (!order_id) {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: "⚠️ لا يوجد رقم نشط حالياً للتحقق من كوده.",
    parse_mode: "Markdown"
  });
  return;
}

// Call real 5sim check API
HTTP.get({
  url: "https://5sim.biz/v1/user/check/" + order_id,
  headers: {
    "Authorization": "Bearer " + api_key,
    "Accept": "application/json"
  },
  success: "onRealCodeReceived",
  error: "onRealNumberError"
});
