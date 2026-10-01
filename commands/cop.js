/*
  Command: cop
*/

var text = "اهلا وسهلا مطوري 🖤\n\nالان قم بإختيار موضوع كشف رصيد عضو او رصيد موقع الناقل ❄️";

var keyboard = {
  inline_keyboard: [
    [ { text: "رصيد مستخدم ☑️", callback_data: "copchat" } ],
    [ { text: "رصيد موقع الأرقام 🗃", callback_data: "simcop" } ],
    [ { text: "رصيد حساباتي بجميع المواقع 💸", callback_data: "Balancesms" } ],
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
