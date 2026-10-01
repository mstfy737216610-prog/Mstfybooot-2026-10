/*
  Command: delPHP
*/

var text = "✅ • تم تنظيف وتطهير البوت من الملفات المؤقتة والنفايات 🗑 بنجاح!";

var keyboard = {
  inline_keyboard: [
    [ { text: "- العودة لقائمة التحكم 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
