const mineflayer = require('mineflayer')

function startBot() {
    const bot = mineflayer.createBot({
        host: process.env.SERVER_IP,   // IP السيرفر من Render env
        port: 25565,
        username: process.env.BOT_NAME || "AFK_Bot",
        version: false
    })

    bot.on("spawn", () => {
        console.log("✔ البوت دخل السيرفر وواقف AFK")

        // Anti-AFK: يقفز كل دقيقة
        setInterval(() => {
            bot.setControlState("jump", true)
            setTimeout(() => bot.setControlState("jump", false), 250)
        }, 60000)
    })

    bot.on("kicked", reason => {
        console.log("❌ تم كيك البوت:", reason)
        console.log("🔄 إعادة الدخول خلال 5 ثواني...")
        setTimeout(startBot, 5000)
    })

    bot.on("end", () => {
        console.log("🔴 الاتصال انتهى. إعادة التشغيل...")
        setTimeout(startBot, 5000)
    })

    bot.on("error", err => {
        console.log("⚠ خطأ:", err)
    })
}

startBot()
