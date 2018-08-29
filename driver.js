const scraper = require(`./scripts/scraper`);
const counter = require(`./scripts/counter`);

class ReviewCrawler {

	// This is the 'driver' function which will bring together all the separate pieces of functionality
	getMostPositiveReviews(numberOfPages, printToConsole) {

		let counts = [];
		return scraper.scrapeReviews(numberOfPages)
			.then(result => {
				counts = counter.countExclamations(result);
				let orderedCounts = counts.slice().sort().reverse();
                
				// We splice after getting each value to prevent duplicates
				let firstIndex = counts.indexOf(orderedCounts[0]);
				counts.splice(firstIndex, 1, 0);
				let secondIndex = counts.indexOf(orderedCounts[1]);
				counts.splice(secondIndex, 1, 0);
				let thirdIndex = counts.indexOf(orderedCounts[2]);
				counts.splice(thirdIndex, 1, 0);
                
				// Alright, time to prepare the results
				let firstPlace = {}, 
					secondPlace = {}, 
					thirdPlace = {};
				firstPlace.title = result[firstIndex].title; 
				firstPlace.offendingReview = result[firstIndex].content;
				secondPlace.title = result[secondIndex].title;
				secondPlace.offendingReview = result[secondIndex].content;
				thirdPlace.title = result[thirdIndex].title; 
				thirdPlace.offendingReview = result[thirdIndex].content;

				if (printToConsole){
					console.log(
						`THE MOST PERJURIOUSLY POSITIVE REVIEWS ARE AS FOLLOWS
                        \n===================================================
                        \nMOST FLAGRANTLY FAVORABLE
                        \nTITLE: ` + firstPlace.title + `
                        \nREVIEW: ` + firstPlace.offendingReview + `
                        \n---------------------------------------------------
                        \nSECOND MOST AGGRESIVELY ADULATORY
                        \nTITLE: ` + secondPlace.title + `
                        \nREVIEW: ` + secondPlace.offendingReview + `
                        \n---------------------------------------------------
                        \nTHIRD MOST UNACCEPTABLY UPBEAT
                        \nTITLE: ` + thirdPlace.title + `
                        \nREVIEW: ` + thirdPlace.offendingReview + `
                        \n---------------------------------------------------`
					);
				}
				
				let worstReviews = [];
				worstReviews.push(firstPlace);
				worstReviews.push(secondPlace);
				worstReviews.push(thirdPlace);

				return worstReviews;
			})
			.catch(err => {
				throw err;
			});
	}
}

// This is here just to represent exporting this functionality out to whatever system is using it
module.exports = ReviewCrawler;