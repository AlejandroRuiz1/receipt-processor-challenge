// TODO
function hasAlphanumeric(receipt) {
  let retailer = receipt.retailer;
}

// TODO
function isTotalRoundAmount(receipt) {
  let total = receipt.total;
}

// TODO
function isTotalMultiple(receipt) {
  let total = receipt.total;
}

// TODO
function pairOfItems(receipt) {
  let items = receipt.items;
}

// TODO
function itemDescription(receipt) {
  let items = receipt.items;
}

function isDateOdd(receipt) {
  let date = receipt.purchaseDate.split("-");
  let day = date[date.length - 1];
  return Number(day) % 2 !== 0 ? 6 : 0;
}

// TODO
function timeOfPurchase(receipt) {
  let time = receipt.purchaseTime;
}

// TODO
function calculatePoints(receipt) {
  let points = 0;
  console.log(receipt);

  // One point for every alphanumeric character in the retailer name.
  // points += hasAlphanumeric(receipt);

  // 6 points if the day in the purchase date is odd.
  points += isDateOdd(receipt);

  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  // points += timeOfPurchase(receipt);

  // 5 points for every two items on the receipt.
  // points += pairOfItems(receipt);

  /*  If the trimmed length of the item description is a multiple
   *  of 3, multiply the price by 0.2 and round up to the nearest integer.
   *  The result is the number of points earned.
   */
  // points += itemDescription(receipt);

  // 50 points if the total is a round dollar amount with no cents.
  // points += isTotalRoundAmount(receipt);

  // 25 points if the total is a multiple of 0.25.
  // points += isTotalMultiple(receipt);

  return points;
}

export default calculatePoints;
