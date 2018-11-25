let moment = require("moment");
class Blog {
    constructor(rawJson, contentAsHtml, url){
        this.title = rawJson.title || 'PLACEHOLDER TITLE';
        this.imgUrl = rawJson.imgUrl || '/img/placeholder.jpg';
        this.date = moment(rawJson.date || '2019-01-10');
        this.dateAsString = this.date.format("MMM Do YYYY");
        this.content = contentAsHtml;
        this.url = url;
        }
}
module.exports = Blog;