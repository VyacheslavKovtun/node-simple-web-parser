import unirest from "unirest";
import cheerio from "cheerio";

export const getAuthorProfileData = async(userId) => {
    try {
        const url = 'https://scholar.google.com/citations?hl=en&user=' + userId;
        return unirest.get(url)
        .headers({
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        })
        .then((response) => {
            const $ = cheerio.load(response.body, {
                xml: {
                  xmlMode: true,
                  decodeEntities: true
                }
            });

            let author_articles_results = {};

            author_articles_results.author_name = $("#gsc_prf_in").text();
            author_articles_results.articles = [];

            $(".gsc_a_tr").each((id, el) => {
                let article = {
                    article_name: $(".gsc_a_at", el).text(),
                    reposts_count: $(".gsc_a_ac", el).text(),
                    publishing_year: $(".gsc_a_h", el).text()
                };
                author_articles_results.articles.push(article);
            });

            return author_articles_results;
        });
    } catch (e) {
        console.log(e);
    }
};