/*
  Command: addnumber
*/

var text = "- قم بإختيار الموقع الذي تود إضافة الدولة منه إلى البوت 🎗";

var keyboard = {
  inline_keyboard: [
    [ { text: "5sim.biz 🌐", callback_data: "Bj-Ai" } ],
    [ { text: "tempnum.org 🌐", callback_data: "Bj-Bi" }, { text: "sms-man.ru 🌐", callback_data: "Bj-Ci" } ],
    [ { text: "Vak-sms.com 🌐", callback_data: "Bj-Di" } ],
    [ { text: "sms-acktiwator.ru 🌐", callback_data: "Bj-Ei" }, { text: "pvapins.com 🌐", callback_data: "Bj-Fi" } ],
    [ { text: "onlinesim.io 🌐", callback_data: "Bj-Hi" }, { text: "supersmstech.com 🌐", callback_data: "Bj-Ji" } ],
    [ { text: "viotp.com 🌐", callback_data: "Bj-Ki" } ],
    [ { text: "simsms.org 🌐", callback_data: "Bj-Li" }, { text: "grizzlysms.com 🌐", callback_data: "Bj-Mi" } ],
    [ { text: "sms-code.ru 🌐", callback_data: "Bj-Ni" } ],
    [ { text: "tiger-sms.com 🌐", callback_data: "Bj-Oi" }, { text: "2ndline.io 🌐", callback_data: "Bj-Pi" } ],
    [ { text: "receivesms.store 🌐", callback_data: "Bj-Qi" } ],
    [ { text: "sms.fastpva.com 🌐", callback_data: "Bj-Ri" }, { text: "dropsms.ru 🌐", callback_data: "Bj-Si" } ],
    [ { text: "24sms7.com 🌐", callback_data: "Bj-Ti" } ],
    [ { text: "sellotp.com 🌐", callback_data: "Bj-Ui" }, { text: "mm.duraincloud.com 🌐", callback_data: "Bj-Vi" } ],
    [ { text: "- رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});
