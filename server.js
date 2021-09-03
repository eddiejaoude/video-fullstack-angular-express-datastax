const express = require("express");
const { createClient } = require("@astrajs/collections");

const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ name: "hello world" });
});

app.get("/events", async (req, res) => {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });

  const eventsCollection = astraClient
    .namespace("angularvideo")
    .collection("events");

  events = await eventsCollection.find({});

  res.send(
    Object.keys(events).map((key) => {
      return {
        id: key,
        ...events[key],
      };
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
