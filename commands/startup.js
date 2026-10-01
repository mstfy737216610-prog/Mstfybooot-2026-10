/*
  Command: startup
*/

var first_name = user.first_name || "عزيزي";
var user_id = "" + (user.telegramid || "");
var admin_id = "8338869162";

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
