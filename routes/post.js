const axios = require("axios").default;
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const TelegramBot = require("node-telegram-bot-api");
const { publicPosts } = require("../db");
const message1 = " Welcome To WITS LAB";
string = "";
const token = [
  "5794122299:AAGE_JJ_cDAoBW7tzWvlsKzRjVEl-pDoE48",
  "5673321745:AAHBJgahcFN8ZFb-WnnhG1GgyrdSebtl5CY",
];
const activeBot = (botId) => {
  const bot = new TelegramBot(botId, { polling: true });
  // console.log(bot);
  bot.on("message", async (msg) => {
    const { text } = msg;
    const chatId = msg.chat.id;
    console.log(botId);
    console.log(chatId);
    const findUser = await prisma.tblMessage.findFirst({
      where: {
        botId: botId,
      },
    });
    if (findUser?.isActive === false) {
      const result = await prisma.tblMessage.update({
        where: {
          id: findUser.id,
        },
        data: {
          chatId: chatId.toString(),
          isActive: true,
        },
      });
      console.log(result);
    } else {
      await axios.post(
        "https://api.telegram.org/bot" +
          botId +
          "/sendMessage?text=" +
          "message" +
          "&chat_id=" +
          chatId
      );
      await axios.post(
        "https://api.telegram.org/bot" +
          botId +
          "/sendMessage?text=" +
          "message" +
          "&chat_id=" +
          findUser.chatId
      );
    }
  });
};
function myFunction(item, index) {
  activeBot(item);
}
token.forEach(myFunction);

// const getUserDate = async (userId) => {
//   const res = await bot.getChat(userId);
//   console.log(userId, "userId");
//   console.log(res, "res");
//   return res;
// };

// bot.on("message", async (msg) => {
//   const token_linkk = "hy"
//   const { text } = msg;
//   const res = await getUserDate(msg.from.id);
//   const messgae2 = res.id;
//   const chatId = msg.chat.id;
//   console.log(res.id, "hy");
//   console.log({ res });
//   console.log(msg?.chat?.first_name, "h1");
//   console.log(msg);
//   console.log(text === "/start");

//   const findUser = await prisma.tblMessage.findFirst({
//     where: {
//       messgae2: messgae2.toString(),
//     },
//   });
//   console.log();
//   if (findUser) {
//     return console.log("Message Already exsist");
//   }
//   const post = await prisma.tblMessage.create({
//     data: {
//       chatId: chatId.toString(),
//       messgae2: messgae2.toString(),
//       token_link: token_linkk
//     },
//   });
//   console.log(post, "Created in db");
// });

// const sendMessage = async (userId) => {
//   const user = await getUserDate(userId);
//   console.log("user", user);
//   const { first_name, last_name, username } = user;
//   const message = first_name + " " + last_name;
//   console.log(message);
//   return await axios.post(
//     "https://api.telegram.org/bot" +
//       token +
//       "/sendMessage?text=" +
//       message +
//       "&chat_id=" +
//       "-1001589729231"
//   );
// };

// // router.post("/public/tokenFeed", async (req, res) => {
// //   try {
// //     const data = req.body;
// //     console.log(data, "data");
// //     const post = await prisma.tbltokeken.create({
// //       data: {
// //         token: data.token,
// //       },
// //     });
// //     return console.log(post, "posted");
// //   } catch (error) {
// //     console.log(error);
// //   }
// // });

// router.get("/public/:userId", async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const response = await sendMessage(userId);
//     console.log(response.status, "hyyyyyy");
//     if (response.status === 200) {
//       res.json(message1);
//     } else {
//       return;
//     }
//   } catch (error) {
//     return error;
//   }
// });

module.exports = router;
