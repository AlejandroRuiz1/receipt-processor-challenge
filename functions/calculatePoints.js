function calculatePoints(receipt) {
  let totalPoints = 0;

  /*
   * Removes non-alphanumeric characters from retailer name
   * by replacing characters with empty string.
   * Gives one point for every alphanumeric character in the retailer name.
   */
  function hasAlphanumeric() {
    let points = 1;
    return receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length * points;
  }

  // Check receipt total in case of unexpected $ char
  if (receipt.total.charAt(0) === "$") {
    receipt.total = receipt.total.substring(1);
  }

  let total = parseFloat(receipt.total);

  // 50 points if the total is a round dollar amount with no cents.
  function isTotalRoundAmount() {
    let points = 50;
    return total % 1 === 0 ? points : 0;
  }

  // 25 points if the total is a multiple of 0.25.
  function isTotalMultiple() {
    let points = 25;
    if (total === 0) return 0;
    return total % 0.25 === 0 ? points : 0;
  }

  // 5 points for every two items on the receipt.
  function pairOfItems() {
    let points = 5;
    let items = receipt.items;
    if (items.length === 0) return 0;
    return Math.floor(items.length / 2) * points;
  }

  /*  If the trimmed length of the item description is a multiple
   *  of 3, multiply the price by 0.2 and round up to the nearest integer.
   *  The result is the number of points earned.
   */
  function itemDescription() {
    let items = receipt.items;
    let result = 0;
    items.forEach((item) => {
      if (item.shortDescription.trim().length % 3 === 0) {
        let price = item.price;
        if (price.charAt(0) === "$") {
          price = price.substring(1);
        }
        result += Math.ceil(parseFloat(price) * 0.2);
      }
    });
    return result;
  }

  // 6 points if the day in the purchase date is odd.
  function isDateOdd() {
    let points = 6;
    let date = receipt.purchaseDate.split("-");
    let day = date[date.length - 1];
    return Number(day) % 2 !== 0 ? points : 0;
  }

  // 10 points if the time of purchase is after 2:00pm(14:00) and before 4:00pm(16:00).
  function timeOfPurchase() {
    let points = 10;
    let [hour, minute] = receipt.purchaseTime.split(":");
    if (hour >= "14" && minute > "00" && hour < "16") {
      return points;
    }
    return 0;
  }

  // Tallies up points based on rules if requirements are met
  totalPoints += hasAlphanumeric();
  totalPoints += isTotalRoundAmount();
  totalPoints += isTotalMultiple();
  totalPoints += isDateOdd();
  totalPoints += pairOfItems();
  totalPoints += itemDescription();
  totalPoints += timeOfPurchase();

  return totalPoints;
}

module.exports = calculatePoints;
