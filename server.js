const express = require("express");
const { createClient } = require("@astrajs/collections");

const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

const client = async () => {
  return await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });
};

app.get("/", (req, res) => {
  res.send({ name: "hello world" });
});

app.get("/events", async (req, res) => {
  const astraClient = await client();
  const eventsCollection = astraClient
    .namespace("angularvideo")
    .collection("events");

  if (req.query.search) {
    events = await eventsCollection.find({ name: { $eq: req.query.search } });
  } else {
    events = await eventsCollection.find({});
  }

  res.send(
    Object.keys(events).map((key) => {
      return {
        id: key,
        ...events[key],
      };
    })
  );
});

app.post("/events", async (req, res) => {
  const astraClient = await client();
  const eventsCollection = astraClient
    .namespace("angularvideo")
    .collection("events");

  const event = await eventsCollection.create(req.body);

  res.send({
    id: event.documentId,
    ...req.body,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
