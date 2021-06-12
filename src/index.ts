import express from "express";
import { WebClient } from "@slack/web-api";
import { createEventAdapter } from "@slack/events-api";

import CONFIG from "../config/bot.json";
import { REVIEW_INFO, CREW_INFO } from "./constants";
import { groupingCrews, createMessage } from "./service";

const app = express();

const slackEvents = createEventAdapter(CONFIG.SIGNING_SECRET);
const webClient = new WebClient(CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN);

slackEvents.on("message", (event) => {
  console.log(event);

  if (event.text === "!수고하셨습니다") {
    groupingCrews(CREW_INFO).forEach((crewChunk) => {
      REVIEW_INFO.forEach((reviewer) => {
        const msg = createMessage(reviewer, crewChunk);

        webClient.chat.postMessage({
          text: msg,
          channel: event.channel,
        });
      });
    });
  }
});

slackEvents.on("error", (error) => {
  console.log(error.name);
});

app.use("/slack/events", slackEvents.requestListener());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`bot running on ${PORT}`);
});
