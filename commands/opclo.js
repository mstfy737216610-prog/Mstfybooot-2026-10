/*
  Command: opclo
*/

var text = "عبر هذا الأزرار تستطيع التحكم بجميع الاقسام واقفالها وفتحها ♻️";

var bot_locked = Bot.getProperty("bot_locked") || false;
var offers_locked = Bot.getProperty("offers_locked") || false;
var wa_locked = Bot.getProperty("wa_server_locked") || false;
var tg_locked = Bot.getProperty("tg_server_locked") || false;

var keyboard = {
  inline_keyboard: [
    [
      { text: bot_locked ? "فتح البوت ✅" : "قفل البوت ❌", callback_data: "toggle_bot_lock" }
    ],
    [
      { text: offers_locked ? "فتح العروض ✅" : "قفل العروض ❌", callback_data: "toggle_offers_lock" },
      { text: "فتح السماح ✅", callback_data: "toggle_grace_lock" }
    ],
    [
      { text: wa_locked ? "فتح سيرفر واتساب ✅" : "قفل سيرفر واتساب ❌", callback_data: "toggle_wa_lock" },
      { text: tg_locked ? "فتح سيرفر تيليجرام ✅" : "قفل سيرفر تيليجرام ❌", callback_data: "toggle_tg_lock" }
    ],
    [
      { text: "رجوع 🔙", callback_data: "c" }
    ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
