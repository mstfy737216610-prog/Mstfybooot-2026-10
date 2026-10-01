/*
  Command: onRealNumberPurchased
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

try {
  var data = JSON.parse(content);

  if (data && data.phone) {
    // REAL NUMBER ACQUIRED FROM 5SIM!
    User.setProperty("current_active_order_id", data.id);
    User.setProperty("current_active_phone", data.phone);

    var number_text = "✅ *- تم شراء رقم حقيقي بنجاح من المزود الفعلي*\n\n" +
      "☎️ - الرقم : `" + data.phone + "`\n" +
      "💬 - الكود : *قيد الانتظار...*\n" +
      "🌐 - المزود : *5sim.biz*\n" +
      "💸 - السعر : *" + (data.price || 15) + " ₽*\n\n" +
      "⚠️ - قم بإدخال الرقم في التطبيق الآن، ثم اضغط على زر (تحديث الكود ♻️) لوصول كود الـ SMS فورياً!";

    var keyboard = [
      [
        { text: "💬 فتح في WhatsApp مباشرة", title: "💬 فتح في WhatsApp مباشرة", url: "https://wa.me/" + data.phone.replace("+", "") }
      ],
      [
        { text: "♻️ تحديث الكود", title: "♻️ تحديث الكود", callback_data: "check_real_code-" + data.id, command: "check_real_code-" + data.id }
      ],
      [
        { text: "🚫 إلغاء الرقم واسترداد الرصيد", title: "🚫 إلغاء الرقم واسترداد الرصيد", callback_data: "cancel_real_number-" + data.id, command: "cancel_real_number-" + data.id }
      ],
      [
        { text: "- رجوع 🔙", title: "- رجوع 🔙", callback_data: "back", command: "back" }
      ]
    ];

    Api.sendMessage({
      chat_id: target_chat_id,
      text: number_text,
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: keyboard }
    });
  } else {
    var errorMsg = (typeof data === "string") ? data : (data.error || "لا توجد أرقام متوفرة حالياً في المزود أو رصيدك بالموقع يحتاج للشحن");
    Api.sendMessage({
      chat_id: target_chat_id,
      text: "❌ *فشل جلب الرقم من المزود الفعلي:*\n`" + errorMsg + "`\n\nيرجى شحن حسابك في 5sim.biz أو إعادة المحاولة لاحقاً.",
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [ { text: "- رجوع 🔙", title: "- رجوع 🔙", callback_data: "back", command: "back" } ]
        ]
      }
    });
  }
} catch(err) {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: "⚠️ استجابة المزود غير متوقعة: " + content,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [ { text: "- رجوع 🔙", title: "- رجوع 🔙", callback_data: "back", command: "back" } ]
      ]
    }
  });
}
