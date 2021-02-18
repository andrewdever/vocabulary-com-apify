// Import Apify SDK. For more information, see https://sdk.apify.com/
const Apify = require('apify');
const cheerio = require('cheerio');
const select = require('cheerio-select');

Apify.main(async () => {
    // Get input of the actor.
    // If you'd like to have your input checked and have Apify display
    // a user interface for it, add INPUT_SCHEMA.json file to your actor.
    // For more information, see https://apify.com/docs/actor/input-schema
    const input = await Apify.getInput();
    console.log('Actor input:');
    console.dir(input);

    // Fetch a HTML of a web page.
    const baseUrl = 'https://www.vocabulary.com/dictionary/';
    const url = baseUrl.concat(input.word);
    const { body } = await Apify.utils.requestAsBrowser({ url });

    // Parse the HTML
    const $ = cheerio.load(body);
    // const yo = select.select()
    // const pageTitle = $('title').text();
    // const caption = $('h1').text();
    // const description = $('description').text()
    // const description = $('div.word-area').children('p.short').text();
    const shortDesc = $('.short').text();
    const longDesc = $('.long').text();

    // @todo loop definitions into a string!
    const definition = $('.word-definitions').children('ol').text();

    // @todo loop
    const examples = $('.results').children('ul').text();

    // Save the actor output.
    const output = {
        shortDesc,
        longDesc,
        definition,
        examples,
        // pageTitle,
        // caption,
        // crawledAt: new Date(),
        // body,
    };
    console.log('Actor output:');
    console.dir(output);
    await Apify.setValue('OUTPUT', output);
});