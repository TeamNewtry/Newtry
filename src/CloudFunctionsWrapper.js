import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import Product from './store/Product';
import Nutrition from './store/Nutrition';

const functions = firebase.app().functions('europe-west1');
async function getProductByGTIN(gtin) {
  return await functions
    .httpsCallable('getProduct')({id: gtin})
    .then(response => {
      if (
        typeof response.data !== 'object' ||
        'httpErrorCode' in response.data
      ) {
        console.error('fail getProductByGTIN with', gtin);
        console.error(response.data);
        return;
      }
      const info = response.data.product;
      const nutriInfo = info.nutriments;
      let nutrition = new Nutrition(
        nutriInfo['energy-kcal'],
        nutriInfo.fat,
        nutriInfo['saturated-fat'],
        nutriInfo.carbohydrates,
        nutriInfo.sugars,
        nutriInfo.proteins,
        nutriInfo.salt,
      );
      let product = new Product(
        info.code,
        info.product_name,
        info.generic_name,
        nutrition,
        info.ingredients_text,
        null,
        info.nutriscore_data.grade,
        [info.image_url],
      );
      console.log(JSON.stringify(product));
      return product;
    })
    .catch(reason => {
      console.error('error getProductByGTIN with', gtin);
      console.error(reason);
    });
}

export {getProductByGTIN};
