// Anyone who includes multiple exclamation points in a positive review is obviously suspicious, so let's look for the most egregious offenders
module.exports.countExclamations = function (reviews) {

	let bangCounts = [];

	reviews.forEach(review => {
		let bangCount = review.content.split(`!`).length - 1;
		bangCounts.push(bangCount);
	});

	return bangCounts;
};
