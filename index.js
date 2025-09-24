const Express = require("express");
const bodyParser = require("body-parser");
const mainRoute = require("./routes.js");

const { firstMessage } = require("./utils/MessageTemplate/SendMessage");
const { sendMessage } = require("./utils/WhatsappAPI/api");

require("dotenv").config();

const app = new Express();
app.use(bodyParser.json());

app.use("/", (req, res, next) => {
  console.log(req.method, "  ", req.url);
  next();
});

app.use("/api/wa", mainRoute);



// Webhook endpoint to receive messages
// app.post("/webhook", (req, res) => {
//   console.log("Incoming message:", JSON.stringify(req.body, null, 2));
//   res.sendStatus(200); // Respond to Meta
// });


// app.get("/send-message", async (req, res) => {
//   let receivedData = req.body;
//   try {
//     const data = firstMessage({
//       to: receivedData?.phone,
//     });
//     let response = await sendMessage(data);

//     res.json(response.data);
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).send(error.response?.data || error.message);
//   }
// });

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
