import Nutrition from './Nutrition';

class Product {
  gtin: string;
  name: string;
  description: string;
  nutrition: Nutrition;
  ingredients: string;
  climateRating: number;
  nutriscore: string;
  pictures: [];

  getIngredients() {
    return this.ingredients.join(', ');
  }

  constructor(
    gtin: string,
    name: string,
    description: string,
    nutrition: Nutrition,
    ingredients: string,
    climateRating: number,
    nutriscore: string,
    pictures: [],
  ) {
    this.gtin = gtin;
    this.name = name;
    this.description = description;
    this.nutrition = nutrition;
    this.ingredients = ingredients;
    this.climateRating = climateRating;
    this.nutriscore = nutriscore;
    this.pictures = pictures;
  }
}

export default Product;
