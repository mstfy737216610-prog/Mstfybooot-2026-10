/*
  Command: c
*/

// Admin Main Panel Return
var first_name = user.first_name || "عزيزي";
var admin_welcome = "- اهلا وسهلا مطوري " + first_name + " ، 🖤\n\n- هذه هي قائمة التحكم الخاصة بك في البوت 💁🏻";
var admin_keyboard = {
  inline_keyboard: [
    [
      { text: "حذف دولة 🚫", callback_data: "delnumber" },
      { text: "إضافة دولة ↗️", callback_data: "addnumber" }
    ],
    [
      { text: "خصم رصيد 📛", callback_data: "delcoin" },
      { text: "إضافة رصيد ♻️", callback_data: "addcoin" }
    ],
    [
      { text: "حذف رقم جاهز ⬆️", callback_data: "delreadynumber" },
      { text: "أضف رقم جاهز 📞", callback_data: "readynumber" }
    ],
    [
      { text: "فتح وقفل الأقسام 🔏", callback_data: "opclo" },
      { text: "إحصائيات البوت 🌚", callback_data: "baluser" }
    ],
    [
      { text: "تقييد عضو ⛔️", callback_data: "res" },
      { text: "فك تقييد عضو 🔓", callback_data: "unres" }
    ],
    [
      { text: "فك تقييد عضو عبر الايدي ☑️", callback_data: "unnum" }
    ],
    [
      { text: "عدد المشتركين 👥", callback_data: "members" },
      { text: "إذاعة نشر 📩", callback_data: "set" }
    ],
    [
      { text: "رفع وحذف API ⤵️", callback_data: "counapi" },
      { text: "تنظيف البوت 🗑", callback_data: "delPHP" }
    ],
    [
      { text: "الكشف عن الرصيد 🗃", callback_data: "cop" },
      { text: "صنع كروت 💳", callback_data: "card" }
    ],
    [
      { text: "حذف وكيل ⛔️", callback_data: "delagent" },
      { text: "إضافة وكيل 🧑‍✈️", callback_data: "addagent" }
    ],
    [
      { text: "📱 واجهة المستخدم العادي", callback_data: "startup" }
    ]
  ]
};

Bot.sendMessage(admin_welcome, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(admin_keyboard)
});
