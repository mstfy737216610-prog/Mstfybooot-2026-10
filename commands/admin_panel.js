/*
  Command: admin_panel
*/

var first_name = user.first_name || "مكتب الإبداع";
var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var admin_welcome = "- اهلا وسهلا مطوري " + first_name + " ، 🖤\n\n- هذه هي قائمة التحكم الكاملة الخاصة بك في البوت 💁🏻";

var admin_keyboard = [
  [
    { text: "حذف دولة 🚫", title: "حذف دولة 🚫", callback_data: "delnumber", command: "delnumber" },
    { text: "إضافة دولة ↗️", title: "إضافة دولة ↗️", callback_data: "addnumber", command: "addnumber" }
  ],
  [
    { text: "خصم رصيد 📛", title: "خصم رصيد 📛", callback_data: "delcoin", command: "delcoin" },
    { text: "إضافة رصيد ♻️", title: "إضافة رصيد ♻️", callback_data: "addcoin", command: "addcoin" }
  ],
  [
    { text: "حذف رقم جاهز ⬆️", title: "حذف رقم جاهز ⬆️", callback_data: "delreadynumber", command: "delreadynumber" },
    { text: "أضف رقم جاهز 📞", title: "أضف رقم جاهز 📞", callback_data: "readynumber", command: "readynumber" }
  ],
  [
    { text: "فتح وقفل الأقسام 🔏", title: "فتح وقفل الأقسام 🔏", callback_data: "opclo", command: "opclo" },
    { text: "إحصائيات البوت 🌚", title: "إحصائيات البوت 🌚", callback_data: "baluser", command: "baluser" }
  ],
  [
    { text: "تقييد عضو ⛔️", title: "تقييد عضو ⛔️", callback_data: "res", command: "res" },
    { text: "فك تقييد عضو 🔓", title: "فك تقييد عضو 🔓", callback_data: "unres", command: "unres" }
  ],
  [
    { text: "فك تقييد عضو عبر الايدي ☑️", title: "فك تقييد عضو عبر الايدي ☑️", callback_data: "unnum", command: "unnum" }
  ],
  [
    { text: "عدد المشتركين 👥", title: "عدد المشتركين 👥", callback_data: "members", command: "members" },
    { text: "إذاعة نشر 📩", title: "إذاعة نشر 📩", callback_data: "set", command: "set" }
  ],
  [
    { text: "رفع وحذف API ⤵️", title: "رفع وحذف API ⤵️", callback_data: "counapi", command: "counapi" },
    { text: "تنظيف البوت 🗑", title: "تنظيف البوت 🗑", callback_data: "delPHP", command: "delPHP" }
  ],
  [
    { text: "الكشف عن الرصيد 🗃", title: "الكشف عن الرصيد 🗃", callback_data: "cop", command: "cop" },
    { text: "صنع كروت 💳", title: "صنع كروت 💳", callback_data: "card", command: "card" }
  ],
  [
    { text: "حذف وكيل ⛔️", title: "حذف وكيل ⛔️", callback_data: "delagent", command: "delagent" },
    { text: "إضافة وكيل 🧑‍✈️", title: "إضافة وكيل 🧑‍✈️", callback_data: "addagent", command: "addagent" }
  ],
  [
    { text: "🏡 القائمة الرئيسية (PLUS SMS)", title: "🏡 القائمة الرئيسية (PLUS SMS)", callback_data: "/start", command: "/start" }
  ]
];

try {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: admin_welcome,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: admin_keyboard
    }
  });
} catch(e) {
  Bot.sendInlineKeyboard(admin_keyboard, admin_welcome);
}
