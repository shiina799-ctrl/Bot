module.exports.config = {
	name: "tid",
  version: "1.0.0", 
	hasPermssion: 1,
	credits: "NTKhang",
	description: "Lấy id box", 
	commandCategory: "QTV",
	usages: "",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage(event.threadID, event.threadID);
};
