import { Firecrawl } from "firecrawl";
import { ValidationError } from "../types/app-error.js";

const client = new Firecrawl({
    apiKey: process.env.FIRECRAWL_API_KEY
});

export async function scrapeWebsite(url: string) {
    const scrapeData = await client.scrape(url, {
        formats: ["markdown"]
    });
    const markdown = scrapeData.markdown?.trim();
    if (!markdown) throw new ValidationError("Website didn't scraped");

    return {
        markdown,
        title: scrapeData.metadata?.title,
        sourceUrl: scrapeData.metadata?.sourceURL
    }
}
