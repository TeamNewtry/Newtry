class Nutrition {
  calories: number;
  totalFat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugar: number;
  protein: number;
  salt: number;

  constructor(
    calories: number,
    totalFat: number,
    saturatedFat: number,
    carbohydrates: number,
    sugar: number,
    protein: number,
    salt: number,
  ) {
    this.calories = calories;
    this.totalFat = totalFat;
    this.saturatedFat = saturatedFat;
    this.carbohydrates = carbohydrates;
    this.sugar = sugar;
    this.protein = protein;
    this.salt = salt;
  }
}

export default Nutrition;
