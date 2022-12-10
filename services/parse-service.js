import unirest from "unirest";
import cheerio from "cheerio";

/********************************************************************************
 getAuthorProfileData
 * 
 * sends a request on google scholar to get the page;
 * parses it getting all the articles for current user and his personal info
 * 
 * returns an array of articles with current user info or error occured during request (parsing)
 * 
*********************************************************************************/
export const getAuthorProfileData = async(userId) => {
    try {
        const url = 'https://scholar.google.com/citations?hl=en&user=' + userId;
        //send get request by current url to receive the current page info
        return unirest.get(url)
        .headers({
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        })
        .then((response) => {
            //setting the parse library configuration
            const $ = cheerio.load(response.body, {
                xml: {
                  xmlMode: true,
                  decodeEntities: true
                }
            });

            //result array of articles for author with current userId
            let author_articles_results = {};

            author_articles_results.author_name = $("#gsc_prf_in").text();
            author_articles_results.articles = [];

            $(".gsc_a_tr").each((id, el) => {
                //create an article object with name, reposts and year fields
                let article = {
                    article_name: $(".gsc_a_at", el).text(),
                    reposts_count: $(".gsc_a_ac", el).text(),
                    publishing_year: $(".gsc_a_h", el).text()
                };
                //fill in the array of articles
                author_articles_results.articles.push(article);
            });

            return author_articles_results;
        });
    } catch (e) {
        console.log(e);
    }
};