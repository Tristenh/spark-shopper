export default function StarDisplay(ratingAverage) {
  //number of full stars with round off. ratingAverage is the rating,e.g. 4 for 4.3 average rating
  const fullStars = Math.floor(ratingAverage);
  const arrStarFill = [];
  //  adds  1  full star
  for (let i = 1; i <= fullStars; i++) {
    arrStarFill.push(1);
  }
  if (ratingAverage < 5) {
    // partial value left in average e.g. 0.3 in 4.3 average
    const partialStar = ratingAverage - fullStars;
    //   add partial star to array with full stars
    arrStarFill.push(partialStar);

    const noStars = 5 - arrStarFill.length;
    //  adds 0s to the array for not showing stars
    for (let i = 1; i <= noStars; i++) {
      arrStarFill.push(0);
    }
  }
  return arrStarFill;
}
