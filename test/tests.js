const expect = require(`chai`).expect;
const ReviewCrawler = require(`../driver.js`);
const scraper = require(`../scripts/scraper`);
const counter = require(`../scripts/counter.js`);

// Full functionality tests
describe(`ReviewCrawler.getMostPositiveReviews()`, function () {
	it(`should return three reviews when called`, function () {

		// Setup
		let rc = new ReviewCrawler();

		// Execute
		rc.getMostPositiveReviews(1, false)
			.then(function (result) {

				// Analyze
				expect(result).to.have.lengthOf(3);
			});
	});
});

describe(`ReviewCrawler.getMostPositiveReviews()`, function () {
	it(`should return the same reviews when called with the same arguments`, function () {

		// Setup
		let rc = new ReviewCrawler();

		// Execute
		rc.getMostPositiveReviews(1, false)
			.then(function (firstResult) {

				rc.getMostPositiveReviews(1, false)
			    .then(function (secondResult) {

						// Analyze
						expect(firstResult[0].title).to.equal(secondResult[0].title);
						expect(firstResult[1].title).to.equal(secondResult[1].title);
						expect(firstResult[2].title).to.equal(secondResult[2].title);
					});
			});
	});
});

// Scraper tests
describe(`scraper.scrapeReviews()`, function () {
	it(`should return title and content of reviews when called`, function () {

		// Setup
		// Execute
		scraper.scrapeReviews(1)
			.then(function (result) {

				// Analyze
				expect(result[0]).to.have.property(`title`);
				expect(result[0]).to.have.property(`content`);
				expect(result[0].title).to.be.a(`string`);
				expect(result[0].content).to.be.a(`string`);
			});
	});
});

describe(`scraper.scrapeReviews()`, function () {
	it(`should return an empty array when called with no page numbers`, function () {

		// Setup
		// Execute
		scraper.scrapeReviews()
			.then(function (result) {

				// Analyze
				expect(result).to.be.an(`array`).that.is.empty;
			});
	});
});

// Ranker tests
describe(`counter.countExclamations()`, function () {
	it(`should return an empty array when called with an empty array`, function () {

		// Skip setup, Execute
		let result = counter.countExclamations([])

    // Analyze
    expect(result).to.be.an(`array`).that.is.empty;	
	});
});

describe(`counter.countExclamations()`, function () {
	it(`should return an array on numbers representing the number of !'s in each string`, function () {

		// Skip setup, Execute
		let result = counter.countExclamations([{ content: `!some!random!words!here!` }, { content: `!   !      !` }, { content: `!` }, { content: ` ` }]);

    // Analyze
    expect(result[0]).to.equal(5);			
    expect(result[1]).to.equal(3);			
    expect(result[2]).to.equal(1);			
    expect(result[3]).to.equal(0);			
	});
});