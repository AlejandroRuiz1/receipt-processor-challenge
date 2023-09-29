/*
 * Removes non-alphanumeric characters from retailer name
 *  by replacing characters with empty string.
 */
function hasAlphanumeric(receipt) {
  return receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length;
}

function isTotalRoundAmount(receipt) {
  let total = parseFloat(receipt.total);
  return total % 1 === 0 ? 50 : 0;
}

function isTotalMultiple(receipt) {
  let total = parseFloat(receipt.total);
  if (total === 0) return 0;
  return total % 0.25 === 0 ? 25 : 0;
}

function pairOfItems(receipt) {
  let items = receipt.items;
  if (items.length === 0) return 0;
  return Math.floor(items.length / 2) * 5;
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
  points += hasAlphanumeric(receipt);

  // 50 points if the total is a round dollar amount with no cents.
  points += isTotalRoundAmount(receipt);

  // 25 points if the total is a multiple of 0.25.
  points += isTotalMultiple(receipt);

  // 6 points if the day in the purchase date is odd.
  points += isDateOdd(receipt);

  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  // points += timeOfPurchase(receipt);

  // 5 points for every two items on the receipt.
  points += pairOfItems(receipt);

  /*  If the trimmed length of the item description is a multiple
   *  of 3, multiply the price by 0.2 and round up to the nearest integer.
   *  The result is the number of points earned.
   */
  // points += itemDescription(receipt);

  return points;
}

module.exports = calculatePoints;
