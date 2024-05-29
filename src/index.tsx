import ReactDOMServer from "react-dom/server";
import React from "react";

import { ParseRSS } from "./rss";
import Widget from "./components/widget";

// get the username from the env variable
const username = process.env.LETTERBOXD_USERNAME;

// get the RSS feed URL
const rssUrl = `https://letterboxd.com/${username}/rss/`;

console.log("RSS URL:", rssUrl);

if (!username) {
  throw new Error("Please set the LETTERBOXDUSER environment variable");
}

Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname.endsWith("/") || url.pathname === "") {
      const reviews = await ParseRSS(rssUrl);

      return new Response(ReactDOMServer.renderToString(<Widget reviews={reviews}/>), {
        headers: { "Content-Type": "text/html" },
      });
    }
    
    return new Response("Not found", { status: 404 });
  },
});

console.log("Server running at http://localhost:" + (process.env.PORT || 3000));
