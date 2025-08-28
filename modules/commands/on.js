module.exports.config = {
  name: "on",
  version: "2.0.2",
  hasPermssion: 2,
  credits: "Mirai Team",
  description: "Khởi động lai bot!",
  commandCategory: "Admin",
  usages: "restart",
  cooldowns: 5,
  dependencies: { }
}

module.exports.run = async function({ api, args, Users, event}) {
const { threadID, messageID } = event;
const axios = global.nodemodule["axios"];

const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
  var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
  var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
const fs = require("fs");
  let name = await Users.getNameUser(event.senderID)
if (event.senderID != 61550301337372) return api.sendMessage(`⚠️ Xin lỗi lệnh này chỉ dành cho admin`, event.threadID, event.messageID)
if(args.length == 0) api.sendMessage(`🌸 Xin chào admin ${name}\n⏳ Bot sẽ tiến hành khởi động lại vui lòng chờ nhé!`,event.threadID, () =>process.exit(1))
else{    
let time = args.join(" ");
setTimeout(() =>
api.sendMessage(`⚡ Bot sẽ tự động khởi động sau giờ mà admin đã đặt\n⏱️ Hiện tại là: ${gio}:${phut}:${giay} `, threadID), 0)
setTimeout(() =>
api.sendMessage("⌛ Tiến hành khởi động bot, vui lòng chờ nhé!",event.threadID, () =>process.exit(1)), 1000*`${time}`);
}
}