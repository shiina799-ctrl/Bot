const path = require("path");
const axios = require("axios");
module.exports.config = {
    name: "cc",
    version: "3.5.0",
    hasPermssion: 0,
    credits: "D-Jukie main Coder, Heo Rừng database writer",
    description: "Inspired from Subnautica series",
    commandCategory: "GAME",
    usages: "[]",
    cooldowns: 2,
    envConfig: {
        APIKEY: ""
    }
};

module.exports.checkPath = function (type, senderID) {
    const pathItem = path.join(__dirname, '003', `item.json`);
    const pathUser = path.join(__dirname, '003', 'datauser', `${senderID}.json`);
    const pathUser_1 = require("./003/datauser/" + senderID + '.json');
    const pathItem_1 = require("./003/item.json");
    if (type == 1) return pathItem
    if (type == 2) return pathItem_1
    if (type == 3) return pathUser
    if (type == 4) return pathUser_1
}

module.exports.onLoad = async () => {
    const fs = require("fs-extra");
    const axios = require("axios");

    const dir = __dirname + `/003/`;
    const dirCache = __dirname + `/003/cache/`;
    const dirData = __dirname + `/003/datauser/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {
        recursive: true
    });
    if (!fs.existsSync(dirData)) fs.mkdirSync(dirData, {
        recursive: true
    });
    if (!fs.existsSync(dirCache)) fs.mkdirSync(dirCache, {
        recursive: true
    });
    if (!fs.existsSync(dir + "item.json")) (await axios({
        url: " https://raw.githubusercontent.com/Luoibieng/okk/main/data.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "data.json"));

    if (!fs.existsSync(dir + "item.json")) (await axios({
        url: " https://raw.githubusercontent.com/Luoibieng/okk/main/item.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "item.json"));
    return;
}

module.exports.run = async function ({
    api,
    event,
    args,
    Users,
    Currencies
}) {
    const {
        threadID,
        messageID,
        senderID
    } = event;
    const {
        readFileSync,
        writeFileSync,
        existsSync,
        createReadStream,
        readdirSync
    } = require("fs-extra")
    const axios = require("axios")
    const pathData = path.join(__dirname, '003', 'datauser', `${senderID}.json`);
    switch (args[0]) {
    case 'r':
    case '-r': {
        const nDate = new Date().toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        if (!existsSync(pathData)) {
            var obj = {};
            obj.name = (await Users.getData(senderID)).name;
            obj.ID = senderID;
            obj.mainROD = null,
                obj.GPS = {};
            obj.GPS.locate = null,
                obj.GPS.area = null,
                obj.fishBag = [];
            obj.item = [];
            obj.point = [];
            obj.timeRegister = nDate
            obj.fishBag.push({
                ID: 0,
                name: 'Đừng bán con cá này ko là lỗi tao đéo chịu trách nhiệm đâu',
                category: 'Unnamed',
                size: 999999,
                sell: 0
            });
            obj.point.push({
                ID: 0,
                name: 'Đừng bán con cá này ko là lỗi tao đéo chịu trách nhiệm đâu',
                category: 'Unnamed',
                size: 999999,
                sell: 0
            });
            writeFileSync(pathData, JSON.stringify(obj, null, 4));
            var msg = {body: " (🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴)\n⚔️ Đăɴɢ ᴋʏ́ ᴄᴀ̂ᴜ ᴄᴀ́ ᴛʜấᴛ ʙạɪ -499k 😝😝😝", attachment: await this.subnautica()}
            return api.sendMessage(msg, threadID, messageID);
        } else return api.sendMessage({body: "==[ 🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 ]==\n⚔️ ʙạɴ đᴀ̃ ᴄᴏ́ ᴛʀᴏɴɢ ᴄơ sở ᴅữ ʟɪệᴜ⚔️", attachment: await this.subnautica()}, threadID, messageID);
    }
    case 's':
    case '-s': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "( 🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 )\n⚔️ ᴍᴀᴜ ʀᴜ́ᴛ ʀᴀ 500ᴋ ʀᴀ Đăɴɢ ᴋʏ́ Đɪ", attachment: await this.subnautica()}, threadID, messageID);
        }
        return api.sendMessage({body: " =====[SHOP]=====\n-----------------------\n1. Mᴜᴀ SᴇxTᴏʏ\n2. Bᴀ́ɴ ᴠậᴛ ᴘʜẩᴍ ᴄᴀ̂ᴜ đượᴄ\n3. Nᴀ̂ɴɢ ᴄấᴘ/Sửᴀ ᴄʜửᴀ ᴘʜᴏ́ɴɢ ʟᴀᴏ\n-----------------------\n<Rᴇᴘʟʏ ᴛɪɴ ɴʜắɴ ɴᴀ̀ʏ ᴠớɪ ʟựᴀ ᴄʜọɴ ᴄủᴀ ʙạɴ>", attachment: await this.subnautica()}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "shop"
            })
        }, messageID);
    }
    case '-baggggggg':
    case '-b': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "<(🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 )>\n⚔️ ᴠᴜɪ ʟᴏ̀ɴɢ ɴʜậᴘ /ᴄᴄ ʀ !\nđể đăɴɢ ᴋɪ́  ⚔️", attachment: await this.subnautica()}, threadID, messageID);
        }
        var data = this.checkPath(4, senderID)

        return api.sendMessage({body: `<(🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 )>\n-----------------------\n1. Cá (SL: ${data.fishBag.length})\n2. Cần câu (SL: ${data.item.length})\nVui lòng reply vật phẩm cần xem!`, attachment: await this.subnautica()}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "choosebag"
            })
        }, messageID);
    }
    case 'x':
    case '-c': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "<(🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 )>\n⚔️ ᴠᴜɪ ʟᴏ̀ɴɢ ɴʜậᴘ /ᴄᴄ ʀ !\nđể đăɴɢ ᴋɪ ́ ⚔️", attachment: await this.subnautica()}, threadID, messageID);
        }
        if (args[1] == 'vukhi') {
            var data = this.checkPath(4, senderID)
            var listItem = '--<(•🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 •)>--\n',
                number = 1;
            for (let i of data.item) {
                listItem += `➤${number++}: ${i.name} - Cooldown: ${i.countdown}s - Durability: ${i.durability}\n`
            }
            listItem += 'Vui lòng reply để chọn cần vũ khí chính của bạn!'
            return api.sendMessage(listItem, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "rodMain",
                    data: data,
                    item: data.item
                })
            }, messageID);
        }
        if (args[1] == 'map') {
            return api.sendMessage({body: "==[ LOCATION ]==\n1. Saver Anime\n2. Saver TD🌏️\n3. Saver Riêng\n-------------------\n>Reply kèm STT để chọn khu vực", attachment: await this.subnautica()}, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "location"
                })
            }, messageID); 
        }
    }
    case 'help': {
            return api.sendMessage({body: "==[🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 ]==\n-----------------\n- 1: /cc r\n- 2: /cc s\n- 3: /cc x vukhi\n- 4: /cc x map\n- 5: /cc\n=====『𝕽𝖊𝖒』 ✎=====", attachment: await this.subnautica()}, threadID, messageID);
        }
    case 'rank': {
        var data = this.checkPath(4, senderID)
        var dataRank = this.checkPath(4, senderID).point;
            if (data.length == 0) return api.sendMessage('No Information!', threadID, messageID);
        var Common = dataRank.filter(i => i.category == 'Common')
        var Uncommon = dataRank.filter(i => i.category == 'Uncommon')
        var Rare = dataRank.filter(i => i.category == 'Rare')
        var Epic = dataRank.filter(i => i.category == 'Epic')
        var Legendary = dataRank.filter(i => i.category == 'Legendary')
        var Mythical = dataRank.filter(i => i.category == 'Mythical')
        var Spectral = dataRank.filter(i => i.category == 'Spectral')
        var Etherial = dataRank.filter(i => i.category == 'Etherial')
        var Unknown = dataRank.filter(i => i.category == 'Unknown')
        const exp = Math.floor(Common.length + 2 * Uncommon.length + 4 * Rare.length + 8 * Epic.length + 16 * Legendary.length + 80 * Mythical.length + 800 * Spectral.length + 8000 * Etherial.length + 16000 * Unknown.length)
        var rank = "";
            if(exp >= 1) rank = "Iron I";
            if(exp >= 10) rank = "Iron II";
            if(exp >= 50) rank = "Iron III";
            if(exp >= 100) rank = "Iron IV";
            if(exp >= 200) rank = "Iron V";
            if(exp >= 500) rank = "Bronze I";
            if(exp >= 1000) rank = "Bronze II";
            if(exp >= 2000) rank = "Bronze III";
            if(exp >= 5000) rank = "Silver I";
            if(exp >= 10000) rank = "Silver II";
            if(exp >= 20000) rank = "Silver III";
            if(exp >= 50000) rank = "Gold I";
            if(exp >= 100000) rank = "Gold II";
            if(exp >= 200000) rank = "Gold III";
            if(exp >= 500000) rank = "Platinum I";
            if(exp >= 1000000) rank = "Platinum II";
            if(exp >= 2000000) rank = "Platinum III";
            if(exp >= 5000000) rank = "Diamond I";
            if(exp >= 10000000) rank = "Diamond II";
            if(exp >= 20000000) rank = "Diamond III";
            if(exp >= 50000000) rank = "Elite I";
            if(exp >= 100000000) rank = "Elite II";
            if(exp >= 200000000) rank = "Elite III";
            if(exp >= 500000000) rank = "Master I";
            if(exp >= 1000000000) rank = "Master II";
            if(exp >= 2000000000) rank = "Master III";
            if(exp >= 5000000000) rank = "General Fisherman";
            if(exp >= 10000000000) rank = "The Demigod Fisherman";
        return api.sendMessage({body: `==[Info User]==\n------------------\n- Name: ${data.name}\n- Rank: ${rank} - ${exp}\n- ID: ${data.ID}\n- Weapon: ${data.mainROD != null ? data.mainROD: "None"}\n- Storage: ${data.fishBag.length != null ? data.fishBag.length: "0"}/100\n- Location: ${data.GPS.locate != null ? data.GPS.locate: "None"} - ${data.GPS.area != null ? data.GPS.area: "None"}\n- Item: ${data.item.length}\n- Total fish: ${data.point.length}\n- Time created: ${data.timeRegister}`, attachment: await this.subnautica()}, threadID, messageID);
            }
    case 'history': {
        var data = this.checkPath(4, senderID).point;
            if (data.length == 0) return api.sendMessage('No Information', threadID, messageID);
        var Common = data.filter(i => i.category == 'Common')
        var Uncommon = data.filter(i => i.category == 'Uncommon')
        var Rare = data.filter(i => i.category == 'Rare')
        var Epic = data.filter(i => i.category == 'Epic')
        var Legendary = data.filter(i => i.category == 'Legendary')
        var Mythical = data.filter(i => i.category == 'Mythical')
        var Spectral = data.filter(i => i.category == 'Spectral')
        var Etherial = data.filter(i => i.category == 'Etherial')
        var Unknown = data.filter(i => i.category == 'Unknown')
            return api.sendMessage({body:`Achievement:\n1. Common - ${Common.length}\n2. Uncommon - ${Uncommon.length}\n3. Rare - ${Rare.length}\n4. Epic - ${Epic.length}\n5. Legendary - ${Legendary.length}\n6. Mythical - ${Mythical.length}\n7. Spectral - ${Spectral.length}\n8. Etherial - ${Etherial.length}\n9. Unknown - ${Unknown.length}\nTổng số cá: ${data.length - 1}\nĐiểm Thành tựu: ${Common.length + 2 * Uncommon.length + 4 * Rare.length + 8 * Epic.length + 16 * Legendary.length + 80 * Mythical.length + 800 * Spectral.length + 8000 * Etherial.length + 16000 * Unknown.length}`, attachment: await this.subnautica()}, threadID, messageID);
        }
          case 'top': {
            if (!existsSync(pathData)) {
                return api.sendMessage({body: "<(🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 )>\n⚔️ᴠᴜɪ ʟᴏ̀ɴɢ ɴʜậᴘ /ᴄᴄ ʀ !\nđể đăɴɢ ᴋɪ ́ ⚔️", attachment: await this.image('https://i.pinimg.com/originals/b6/f1/1f/b6f11fb474e1e6058489fb3c6357039a.gif')}, threadID, messageID);
            }
            try {
              const data = readdirSync(__dirname + `/003/datauser`);
            if(data.length < 3) return api.sendMessage(`Cần ít nhất có 3 người chơi trên server để xem top`, threadID, messageID);
            var p = []
            for (let i of data) { 
                var o = require(`./003/datauser/${i}`);
                p.push(o)
                msg += `${number++}. ${o.name} - ${o.point.length} con\n`
            }
            p.sort((a, b) => b.point.length - a.point.length);
            var msg = '===TOP 3 NGƯỜI CHƠI CÂU NHIỀU CÁ NHẤT===\n'
            for(var i = 0; i < 3; i++) {
                msg += `${i+1}. ${p[i].name} với ${p[i].point.length} con\n`
            }
            return api.sendMessage(msg, threadID, messageID);
            } catch (e) {
              console.log(e);
              return api.sendMessage({
                bdoy: e
              }, threadID, messageID);
            }
        }
    default: {
        async function checkTime(cooldown, dataTime) {
            if (cooldown - (Date.now() - dataTime) > 0) {

                var time = cooldown - (Date.now() - dataTime),
                    minutes = Math.floor(time / 60000),
                    seconds = ((time % 60000) / 1000).toFixed(0);
                return api.sendMessage(`⏰ You can buy better harpoons in the shop to shorten the cooldown time\n⌚Time remaining: ${minutes}:${seconds}!`, threadID, messageID);
            }
        }
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "<(🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 )>\n⚔️ᴠᴜɪ ʟᴏ̀ɴɢ ɴʜậᴘ /ᴄᴄ ʀ !\nđể đăɴɢ ᴋɪ ́ ⚔️", attachment: await this.subnautica()}, threadID, messageID);
        }
        var data = this.checkPath(4, senderID)
        if (data.item.length == 0) return api.sendMessage(`You don't have harpoon, please go to the shop to get one`, threadID, messageID);
        if (data.fishBag.length >= 10000000000) return api.sendMessage(`Storage Overloaded, sell them all or blow 'em all`, threadID, messageID);
        if (data.mainROD == null) return api.sendMessage('ɴạᴘ ᴄᴀʀᴅ ᴍᴜᴀ ᴠũ ᴋʜɪ́ đɪ ᴛʜằɴɢ ɴɢʜᴇ̀ᴏ 😤\ɴʜậᴘ`/cc x vukhi `', threadID, messageID);
        if (data.GPS.locate == null || data.GPS.area == null) return api.sendMessage('ɴạᴘ ᴄᴀʀᴅ ᴍᴜᴀ ʙảɴ đồ đɪ ᴛʜằɴɢ ɴɢʜᴇ̀ᴏ\n ɴʜậᴘ `/cc x map `', threadID, messageID);
        var rod = data.mainROD
        var location = data.GPS.locate
        var area = data.GPS.area
        var type = this.getFish()
        var findRod = data.item.find(i => i.name == rod)
        if (findRod.durability <= 0) return api.sendMessage('đồ nhà nghèo sài vũ khí lỏ,sửᴀ ᴄʜữᴀ ʜᴏặᴄ ᴍᴜᴀ ᴠũ ᴋʜɪ́ ᴍớɪ đɪ', threadID, messageID);
        await checkTime(findRod.countdown * 1000, findRod.countdownData)
        findRod.countdownData = Date.now();
        findRod.durability = findRod.durability - 10;
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        if (type == false) return api.sendMessage('𝖈𝖍𝖚́𝖈 𝖒ừ𝖓𝖌 𝖇ạ𝖓 🎉🥳🎉 𝖇ạ𝖓 𝖈𝖆̂𝖚 đượ𝖈 𝖖𝖚ầ𝖓 𝖈𝖍𝖎𝖕 𝖈ủ𝖆 𝖇𝖆̀ 𝖌𝖎𝖆̀ 𝖐𝖎̀𝖆 😝😝😝 ', threadID, messageID);
        var fil = (await this.dataFish(location, area)).filter(i => i.category == type)
        if (fil.length == 0) return api.sendMessage('ᴄʜᴜ́ᴄ ᴍừɴɢ ʙạɴ 🎉🥳🎉 ʙạɴ ᴄᴀ̂ᴜ đượᴄ ϙᴜầɴ ᴄʜɪᴘ ᴄủᴀ ʙᴇ́ ʟᴏʟɪ ᴋɪ̀ᴀ 😝😝😝 ', threadID, messageID);
        var getData = fil[Math.floor(Math.random() * fil.length)];
        var IDF = ((this.checkPath(4, senderID)).fishBag)[parseInt(((this.checkPath(4, senderID)).fishBag).length - 1)].ID + 1;
        (this.checkPath(4, senderID)).fishBag.push({
            ID: IDF,
            name: getData.name,
            category: getData.category,
            size: getData.size,
            sell: getData.sell,
            image: getData.image
        });
        (this.checkPath(4, senderID)).point.push({
            ID: IDF,
            name: getData.name,
            category: getData.category,
            size: getData.size,
            weight: getData.weight,
            sell: getData.sell,
            image: getData.image
        });
        if (findRod.durability < 5) return api.sendMessage('ᴄảɴʜ ʙᴀ́ᴏ !!!\nᴛʜằɴɢ ɴʜᴀ̀ ɴɢʜᴇ̀ᴏ ơɪ! ᴠũ ᴋʜɪ́ sấᴘ ɢᴀ̃ʏ ᴋɪ̀ᴀ', threadID, messageID);
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        var msg = {body: `|-<(🇹 🇭 🇴 ̂🇳 🇬  🇧 🇦 ́🇴 )>-|\nChúc mừng bạn vừa đựu sấp chết 1 con\n-----------------------\n➤TÊN: ${getData.name}\n➤GIÁ: ${getData.sell}$\n➤Độ Hiếm: ${getData.category}\n➤Size: ${getData.size}kg`, attachment: await this.image(getData.image)}
        return api.sendMessage(msg, threadID, messageID);
     }
    }
}

module.exports.dataFish =async function (a, b) {
    const data = require("./003/data.json");
    var loc = data.find(i => i.location == a)
    var are = loc.area.find(i => i.name == b)
    return are.creature
}

module.exports.image = async function(link) {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    var images = [];
    let download = (await axios.get(link, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync( __dirname + `/003/cache/subnautica.png`, Buffer.from(download, "utf-8"));
        images.push(fs.createReadStream(__dirname + `/003/cache/subnautica.png`));
    return images
}
module.exports.subnautica = async function() {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    var images = [];
    let download = (await axios.get('https://files.catbox.moe/8rfoe2.png', { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync( __dirname + `/003/cache/subnauticapage.png`, Buffer.from(download, "utf-8"));
        images.push(fs.createReadStream(__dirname + `/003/cache/subnauticapage.png`));
    return images
}

module.exports.getFish = function () {
    var rate = Math.floor(Math.random() * 1000) + 1
    if (rate <= 10) return false
    if (rate > 10 && rate <= 120) return 'Common';
    if (rate > 120 && rate <= 230) return 'Uncommon';
    if (rate > 230 && rate <= 340) return 'Rare';
    if (rate > 340 && rate <= 450) return 'Epic';
    if (rate > 450 && rate <= 560) return 'Legendary';
    if (rate > 560 && rate <= 670) return 'Mythical';
    if (rate > 670 && rate <= 780) return 'Spectral';
    if (rate > 780 && rate <= 890) return 'Etherial';
    if (rate > 890 && rate <= 1000) return 'Unknown';

}
module.exports.handleReply = async function ({
    event,
    api,
    Currencies,
    handleReply,
    Users
}) {

    const {
        body,
        threadID,
        messageID,
        senderID
    } = event;
    const axios = require("axios")
    const {
        readFileSync,
        writeFileSync,
        existsSync,
        createReadStream,
        unlinkSync,
        writeFile
    } = require("fs-extra")
    const pathItem = this.checkPath(2, senderID);
    async function checkDur(a, b, c) {
        var data = require("./003/item.json");
        var find = data.find(i => i.name == a)
        if (c == 'rate') return (b / find.durability) * 100
        if (c == 'reset') return find.durability
        return `${b}/${find.durability} (${((b/find.durability)*100).toFixed(0)}%)`
    }
    switch (handleReply.type) {
    case 'shop': {
        if (body == 1) {
            api.unsendMessage(handleReply.messageID)
            var listItem = '===[𝖘𝖍𝖔𝖕]===\n',
                number = 1;
            for (let i of pathItem) {
                listItem += `${number++}: ${i.name} (${i.price}$) - Cooldown: ${i.countdown} (Durability: ${i.durability})\n\n`
            }
            return api.sendMessage(listItem + 'Reply tin nhắn này để chọn cần vũ khí cho bạn. Mỗi lần câu trừ 10 độ bền!', threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,////// all
                    author: event.senderID,
                    type: "buyfishingrod"
                })
            }, messageID);
        }
        if (body == 2) {
            api.unsendMessage(handleReply.messageID)
            var data = this.checkPath(4, senderID).fishBag;
            if (data.length == 0) return api.sendMessage('Túi của bạn không có gì cả!', threadID, messageID);
            var Common = data.filter(i => i.category == 'Common')
            var Uncommon = data.filter(i => i.category == 'Uncommon')
            var Rare = data.filter(i => i.category == 'Rare')
            var Epic = data.filter(i => i.category == 'Epic')
            var Legendary = data.filter(i => i.category == 'Legendary')
            var Mythical = data.filter(i => i.category == 'Mythical')
            var Spectral = data.filter(i => i.category == 'Spectral')
            var Etherial = data.filter(i => i.category == 'Etherial')
            var Unknown = data.filter(i => i.category == 'Unknown')
            var listCategory = [Common, Uncommon, Rare, Epic, Legendary, Mythical, Spectral, Etherial, Unknown];
            return api.sendMessage(`Chọn loại cá muốn bán:\n1. Common - ${Common.length}\n2. Uncommon - ${Uncommon.length}\n3. Rare - ${Rare.length}\n4. Epic - ${Epic.length}\n5. Legendary - ${Legendary.length}\n6. Mythical - ${Mythical.length}\n7. Spectral - ${Spectral.length}\n8. Etherial - ${Etherial.length}\n9. Unknown - ${Unknown.length}`, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "chooseFish",
                    listCategory
                })
            }, messageID);
        }
        if (body == 3) {
            api.unsendMessage(handleReply.messageID)
            var data = this.checkPath(4, senderID).item;
            var msg = `=== 〘FISH ITEM〙===\n`,
                number = 1;
            for (let i of data) {
                msg += `${number++}. ${i.name} - Durability: ${await checkDur(i.name, i.durability, 0)}\n`
            }
            return api.sendMessage(msg + "Vui lòng reply vật phẩm muốn sửa!, giá sửa bằng 1/3 giá vật phẩm", threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "fixfishingrod",
                    list: data
                })
            }, messageID);
        } else return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
    }
    case 'choosebag': {
        api.unsendMessage(handleReply.messageID)
        var data = this.checkPath(4, senderID)
        if (body == 1) {
            if (data.fishBag.length == 0) return api.sendMessage('Trong túi của bạn không có cái nịt', threadID, messageID);
            var listFish = `=== INVERTORY ===\n`,
                number = 1;
            for (let i of data.fishBag) {
                listFish += `${number++}. ${i.name} (${i.size}cm) - ${i.category} (${i.sell}$)\n`
            }
            return api.sendMessage(listFish, threadID, messageID);
        }
        if (body == 2) {
            api.unsendMessage(handleReply.messageID)
            if (data.item.length == 0) return api.sendMessage('Trong túi của bạn không có vật phẩm nào', threadID, messageID);
            var listItemm = `=== INVERTORY ===\n`,
                number = 1;
            for (let i of data.item) {
                listItemm += `${number++}. ${i.name} (${i.price}$) - Durability: ${i.durability} (${i.countdown}s)\n`
            }
            return api.sendMessage(listItemm, threadID, messageID);
        } else return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
    }
    case 'rodMain': {
        var data = handleReply.data;
        var item = handleReply.item;
        if (parseInt(body) > item.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        data.mainROD = item[parseInt(body) - 1].name
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(data, null, 2));
        return api.sendMessage(`===МĂĨŃ ŴĔĂРŐŃ===\n- Đặt '${item[parseInt(body) - 1].name}' succesfully `, threadID, messageID);
    }
    case 'location': {
        const data = require("./003/data.json");
        if (body < 1 && body > 3) return api.sendMessage("Lựa chọn không hợp lệ!", threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        var listLoca = '==[ŁØĆΔŦƗØŇ]==\n',
            number = 1;
        for (let i of data[parseInt(body) - 1].area) {
            listLoca += `${number++}. ${i.name}\n`
        };
        (this.checkPath(4, senderID)).GPS.locate = data[parseInt(body) - 1].location
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        if(body == 1) var images = 'https://i.imgur.com/AomhwxN.jpg'
        if(body == 2) var images = 'https://i.imgur.com/9XM6B8H.jpg'
        if(body == 3) var images = 'https://i.imgur.com/A5upq94.jpeg'
        return api.sendMessage({body: listLoca + 'Vui lòng chọn vùng bạn muốn câu!', attachment: await this.image(images)}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "chooseArea",
                area: data[parseInt(body) - 1]
            })
        }, messageID);
    }
    case 'chooseArea': {
        var area = handleReply.area;
        var pathh = this.checkPath(4, senderID)
        var pathhh = this.checkPath(3, senderID)
        if (parseInt(body) > area.area.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        pathh.GPS.area = area.area[parseInt(body) - 1].name
        writeFileSync(pathhh, JSON.stringify(pathh, null, 2));
        return api.sendMessage(`==[ŁØĆΔŦƗØŇ]==\nChuyển tới vùng '${area.location} - ${area.area[parseInt(body) - 1].name}'`, threadID, messageID);
    }
    case 'fixfishingrod': {
        if (parseInt(body) > handleReply.list.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
        var rod = handleReply.list[parseInt(body) - 1]
        if (await checkDur(rod.name, rod.durability, 'rate') > 75) return api.sendMessage('Chỉ sửa được phóng lợn à nhầm phóng lao có độ bền dưới 75%', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        await checkMoney(senderID, parseInt((rod.price * (3 / 4)).toFixed(0)))
        await Currencies.decreaseMoney(senderID, parseInt((rod.price * (3 / 4)).toFixed(0)));
        rod.durability = await checkDur(rod.name, rod.durability, 'reset')
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        return api.sendMessage(`===ŦĨЖ ŴĔĂРŐŃ===\n- Repaired ${rod.name} (${parseInt((rod.price*(3/4)).toFixed(0))}$) Successfully`, threadID, messageID);
    }
    case 'buyfishingrod': {
        if (parseInt(body) > pathItem.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
        var data = pathItem[parseInt(body) - 1]
        var checkM = await checkMoney(senderID, data.price);
        if ((this.checkPath(4, senderID)).item.some(i => i.name == data.name)) return api.sendMessage(' Bạn đã sở hữu vật phẩm này rồi!', threadID, messageID);
        (this.checkPath(4, senderID)).item.push({
            name: data.name,
            price: data.price,
            durability: data.durability,
            countdown: data.countdown,
            countdownData: null,
            image: data.image
        })
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        api.unsendMessage(handleReply.messageID)
        var msg = { body: `ᴍᴜᴀ ᴛʜấᴛ ʙạɪ ${data.name}\nɢɪᴀ́: ${data.price}$\nĐộ ʙềɴ: ${data.durability}\nᴛʜờɪ ɢɪᴀɴ ᴄʜờ: ${data.countdown}s`, attachment: await this.image(data.image)}
        return api.sendMessage(msg, threadID, messageID);
    }
    case 'chooseFish': {
        if (parseInt(body) > handleReply.listCategory.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
        api.unsendMessage(handleReply.messageID);
        if (handleReply.listCategory[parseInt(body) - 1].length == 0) return api.sendMessage('Không có con cá nào hết á, hmmm!', threadID, messageID);
        var fish = "=====ғιsн=====\n",
            number = 1;
        for (let i of handleReply.listCategory[parseInt(body) - 1]) {
            fish += `${number++}. ${i.name} (${i.size}cm) - Loại: ${i.category} - ${i.sell}$\n`
        }
        return api.sendMessage(fish + "Reply số thứ tự để bán (có thể rep nhiều số) hoặc reply 'all' để bán tất cả cá!", threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "sell",
                list: handleReply.listCategory[parseInt(body) - 1]
            })
        }, messageID);
    }
    case 'sell': {
        if ((parseInt(body) > handleReply.list.length || parseInt(body) <= 0) && body.toLowerCase() != 'all') return api.sendMessage('Lựa chọn hong hợp lệ!', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        var bag = (this.checkPath(4, senderID)).fishBag
        var coins = 0;
        if (body.toLowerCase() == 'all') {
            for (let i of handleReply.list) {
                await Currencies.increaseMoney(senderID, parseInt(i.sell));
                coins += parseInt(i.sell)
                console.log(i.ID)
                var index = (this.checkPath(4, senderID)).fishBag.findIndex(item => item.ID == i.ID);
                bag.splice(index, 1);
                writeFileSync(this.checkPath(3, senderID), JSON.stringify((this.checkPath(4, senderID)), null, 2));
            }
            return api.sendMessage(`Sold succesfully ${handleReply.list.length} fish with ${coins}$`, threadID, messageID);
        }
        else {
            var msg = 'Code_By_D-Jukie ' + body
            var chooses = msg.split(" ").map(n => parseInt(n));
            chooses.shift();
            var text = `=====SELL=====\n`,
                number = 1;
            for (let i of chooses) {
                const index = (this.checkPath(4, senderID)).fishBag.findIndex(item => item.ID == handleReply.list[i - 1].ID);
                text += `${number++}. ${bag[index].name} +${bag[index].sell}$\n`
                coins += parseInt(bag[index].sell)
                await Currencies.increaseMoney(senderID, parseInt(bag[index].sell));
                bag.splice(index, 1);
                writeFileSync(this.checkPath(3, senderID), JSON.stringify((this.checkPath(4, senderID)), null, 2));
            }
            return api.sendMessage(text + `\nCollected ${coins}$`, threadID, messageID);
        }
    }
    default: {
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
    }
    }
    async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0
        if (w < parseInt(maxMoney)) return api.sendMessage('đồ ɴʜᴀ̀ ɴɢʜᴇ̀ᴏ! ɢɪᴀᴏ ᴅịᴄʜ ᴛʜấᴛ ʙạɪ ', threadID, messageID);
    }
}// filter
