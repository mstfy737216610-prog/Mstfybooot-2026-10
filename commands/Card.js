/*
  Command: Card
*/

var text = "☑️ - *مرحباً بك عزيزي،*\n\n" +
  "لشحن رصيدك قم بإرسال *كرت الشحن الخاص بالبوت* والمكون من أرقام وحروف بالأسفل ⬇️";

var keyboard = {
  inline_keyboard: [
    [ { text: "- رجوع 🔙", callback_data: "Payment" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
