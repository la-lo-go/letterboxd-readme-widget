import xml2js from "xml2js";

export interface Review {
  title: string;
  score: string;
  link: string;
  coverLink: string;
  rewatch: boolean;
  watchedDate: string;
}

export const ParseRSS = async (url: string): Promise<Review[]> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const clenaedText = text.replace(/&/g, "&amp;");

    const rss = (await xml2js.parseStringPromise(clenaedText, {
      mergeAttrs: true,
    })).rss;

    const reviews = rss.channel[0].item.filter(
      (item: any) => item["letterboxd:rewatch"]
    );

    const reviewsSorted = reviews
      .map((item: any) => {
        const rewatch = item["letterboxd:rewatch"][0] === "Yes";
        const score = extractScore(item.title[0]);
        return {
          title: item.title[0],
          score: score,
          coverLink: extractCoverUrl(item.description[0]),
          rewatch: rewatch,
          watchedDate: item["letterboxd:watchedDate"][0],
        };
      })
      .sort((a: Review, b: Review) => {
        a.watchedDate.localeCompare(b.watchedDate);
      });

    return reviewsSorted;
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
    return [];
  }
};

const extractScore = (title: string): string => {
  const match = title.match(/(★+½?|½)/);
  return match ? match[1] : "";
}

const extractCoverUrl = (description: string): string => {
  const match = description.match(/<img src="([^"]+)"\/>/);
  return match ? match[1] : "";
};
