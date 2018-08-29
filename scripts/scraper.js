const cheerio = require(`cheerio`); 
const rp = require(`request-promise`);

// Crawler Logic
module.exports.scrapeReviews = function (pageCount) {
    
	let urls = [],
		responses =[];

	// Setup the urls for the pages we will crawl
	for (var i = 1; i <= pageCount; i++) {
		urls.push(`https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/page` + i + `/?filter=ONLY_POSITIVE#link`);
	}

	// Extract the reviews
	function getReviews (url) {
		let options = {
			uri: url,
			transform: function (body) {
				return cheerio.load(body);
			}
		};
		return rp(options)
			.then($ => {
				let reviewHtml = $(`.review-entry`).toArray();
				let reviews = {
					// Because these calls are asynchronous, we will use the page number further on to make sure the results end up in the same order
					page: url.split(`page`)[1][0],
					reviewSummaries: []
				};
				reviewHtml.forEach(result => {
					var reviewSummary = {};
					reviewSummary.title = $(`.review-wrapper h3`, $(result)).text();
					reviewSummary.content = $(`.review-content`, $(result)).text();
					reviews.reviewSummaries.push(reviewSummary);
				});
				return reviews;
			})
			.catch(err => {
				// Crawling failed or Cheerio choked, error needs to be handled
				throw err;
			});
	}

	// Scrape each requested page
	urls.forEach(function(url){
		responses.push(getReviews(url));
	});

	return Promise.all(responses)
		.then(responses => {
			let sortedReviews = [];
			for (var i = 1; i <= responses.length; i++) {
				responses.forEach(response => {
					if (response.page == i) {
						sortedReviews = sortedReviews.concat(response.reviewSummaries);
					}
				});
			}
			return sortedReviews;
		})
		.catch(err => {
			throw err;
		});
};