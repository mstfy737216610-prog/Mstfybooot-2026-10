/*
  Command: /start
*/

var first_name = user.first_name || "عزيزي";
var user_id = "" + (user.telegramid || "");
var admin_id = "8338869162";

// Admin check
if (user_id === admin_id) {
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
        { text: "📱 تجربة واجهة المستخدم العادي", callback_data: "startup" }
      ]
    ]
  };

  Bot.sendMessage(admin_welcome, {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify(admin_keyboard)
  });
} else {
  // Check if user is logged in
  var user_account = User.getProperty("account_email");
  var user_balance = User.getProperty("balance") || 0;
  var user_spent = User.getProperty("spent") || 0;

  if (user_account) {
    var home_text = "👨‍✈️ *⁞ مرحبا بك* [" + first_name + "](tg://user?id=" + user_id + ") ؛\n" +
      "🏛 *⁞ هذه تفاصيل حسابك في بوت @pilotoooo* ⬇️\n\n" +
      "📨︙حسابك: *" + user_account + "*\n" +
      "💰︙رصيدك: *₽ " + user_balance + " 💸*\n" +
      "🆔︙أيدي حسابك: *" + user_id + " ⚜*\n" +
      "♻️︙رصيدك المصرف: *" + user_spent + " 🗞*\n\n" +
      "☑️ *⁞ قناة البوت الرسمية: @sms_com_bot*\n" +
      "🎬︙قم بالتحكم بالبوت الأن عبر الضغط على الأزرار.";

    var home_keyboard = {
      inline_keyboard: [
        [ { text: "☎️︙شراء ارقـام وهمية", callback_data: "Buynum" } ],
        [ { text: "💰︙شحن رصيدك", callback_data: "Payment" }, { text: "👤︙قسم الرشق", callback_data: "sh" } ],
        [ { text: "🅿️︙كشف الحساب", callback_data: "Record" }, { text: "🛍︙قسم العروض", callback_data: "Wo" } ],
        [ { text: "☑️︙قسم العشوائي", callback_data: "worldwide" }, { text: "👑︙قسم الملكي", callback_data: "saavmotamy" } ],
        [ { text: "💰︙ربح روبل مجاني 🤑", callback_data: "assignment" } ],
        [ { text: "💳︙متجر الكروت", callback_data: "readycard" }, { text: "🔰︙الارقام الجاهزة", callback_data: "ready" } ],
        [ { text: "👨‍💻︙قسم الوكلاء", callback_data: "gents" }, { text: "⚙︙إعدادات البوت", callback_data: "MyAccount" } ],
        [ { text: "📮︙تواصل الدعم أونلاين", callback_data: "super" } ]
      ]
    };

    Bot.sendMessage(home_text, {
      parse_mode: "Markdown",
      reply_markup: JSON.stringify(home_keyboard)
    });
  } else {
    var welcome_text = "♐️ - مرحبا بك [" + first_name + "](tg://user?id=" + user_id + ") ؛ 🤍\n\n" +
      "*- في بوت @pilotoooo* ؛ البوت الأفضل على التليجرام والذي يقوم بتوفير *خدمات الأرقام الوهمية* ل مواقع السوشيال ميديا مثل *التيليجرام والواتساب والتويتر وغيره* 👾\n\n" +
      "*- قم بإنشاء حساب جديد* ؛ واذا كان لديك حساب من قبل: قم بالضغط على زر *تسجيل الدخول* ☑️";

    var user_keyboard = {
      inline_keyboard: [
        [ { text: "لديكَ حساب؟ تسجيل دخول 📲", callback_data: "login" } ],
        [ { text: "إنشاء حساب جديد ☑️", callback_data: "sign_in" } ],
        [ { text: "شروط الإستخدام وإخلاء للمسؤلية 🚨", callback_data: "to_explain" } ],
        [ { text: "إدارة البوت 👨🏻‍💻", url: "tg://user?id=" + admin_id } ],
        [ { text: "هام للأعضاء الجُدد ⚠️", callback_data: "Important" } ],
        [ { text: "إحصائيات المستخدمين 📈", callback_data: "statsbot2" } ]
      ]
    };

    Bot.sendMessage(welcome_text, {
      parse_mode: "Markdown",
      reply_markup: JSON.stringify(user_keyboard)
    });
  }
}
