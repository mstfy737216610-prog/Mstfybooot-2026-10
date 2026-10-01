/*
  Command: /start
*/

var first_name = user.first_name || "مكتب الإبداع";
var user_id = "" + (user.telegramid || "8338869162");
var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;
var admin_id = "8338869162";

// Get user balance (default 10.5 ₽ as seen in screenshot)
var user_balance = User.getProperty("balance");
if (user_balance === undefined || user_balance === null) {
  user_balance = (user_id === admin_id) ? "10.5" : "0.0";
}

// Exactly matches the screenshot design
var main_text = "• *القائمة الرئيسية* 🏡\n" +
  "💙 *" + first_name + "* 💙\n\n" +
  "🆔 : `" + user_id + "` •\n" +
  "💷 : *" + user_balance + " ₽* •\n\n" +
  "💙 [قـنـاة الـبـوت](https://t.me/sms_com_bot) 💙\n" +
  "💗 [قـنـاة الـتـفـعـيـلات](https://t.me/pilotoooo) 💗\n" +
  "🇸🇦🇮🇩🇻🇳🇾🇪 *من الدول المتوفرة حالياً* ــ\n" +
  "💡 *شرح استخدام البوت* ــ\n\n" +
  "╰•|_____(PLUS SMS)_____|•╯";

var keyboard = [
  [
    {
      text: "☎️ شراء رقم افتراضي",
      title: "☎️ شراء رقم افتراضي",
      callback_data: "Buynum",
      command: "Buynum"
    }
  ],
  [
    {
      text: "عروض Telegram",
      title: "عروض Telegram",
      callback_data: "offers_tg",
      command: "offers_tg"
    },
    {
      text: "عروض WhatsApp",
      title: "عروض WhatsApp",
      callback_data: "offers_wa",
      command: "offers_wa"
    }
  ],
  [
    {
      text: "السيرفرت الاكثر شراؤها",
      title: "السيرفرت الاكثر شراؤها",
      callback_data: "saavmotamy",
      command: "saavmotamy"
    }
  ],
  [
    {
      text: "•🎲 الأكثر توفراً •",
      title: "•🎲 الأكثر توفراً •",
      callback_data: "worldwide",
      command: "worldwide"
    },
    {
      text: "•🎳 أشحن رصيدك•",
      title: "•🎳 أشحن رصيدك•",
      callback_data: "Payment",
      command: "Payment"
    }
  ],
  [
    {
      text: "•🔭 الرشـ%ـق وشحن الألعاب والبرامج •",
      title: "•🔭 الرشـ%ـق وشحن الألعاب والبرامج •",
      callback_data: "sh",
      command: "sh"
    }
  ],
  [
    {
      text: "•💎 اربح روبل مجاناً ₽ •",
      title: "•💎 اربح روبل مجاناً ₽ •",
      callback_data: "assignment",
      command: "assignment"
    }
  ],
  [
    {
      text: "• تحويل الرصيد 🔄 •",
      title: "• تحويل الرصيد 🔄 •",
      callback_data: "SendCoin",
      command: "SendCoin"
    },
    {
      text: "الدعم ⏰",
      title: "الدعم ⏰",
      callback_data: "super",
      command: "super"
    }
  ],
  [
    {
      text: "• تعليمات للاستخدام ✔️ •",
      title: "• تعليمات للاستخدام ✔️ •",
      callback_data: "to_explain",
      command: "to_explain"
    }
  ],
  [
    {
      text: "حسابي",
      title: "حسابي",
      callback_data: "MyAccount",
      command: "MyAccount"
    }
  ],
  [
    {
      text: "•🛸 خدمات وميزات أخرى •",
      title: "•🛸 خدمات وميزات أخرى •",
      callback_data: "other_services",
      command: "other_services"
    }
  ]
];

// If admin (8338869162), add the direct admin control button at top
if (user_id === admin_id) {
  keyboard.unshift([
    {
      text: "👑 لوحة تحكم الأدمن والمالك ⚙️",
      title: "👑 لوحة تحكم الأدمن والمالك ⚙️",
      callback_data: "admin_panel",
      command: "admin_panel"
    }
  ]);
}

// Send via official Telegram Bot API with both methods for 100% reliability
try {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: main_text,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
} catch(err) {
  Bot.sendInlineKeyboard(keyboard, main_text);
}
