import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import Product from './store/Product';
import Nutrition from './store/Nutrition';

const functions = firebase.app().functions('europe-west1');

function getProductByGTIN(gtin) {
  return callCloudFunction('getProduct', {id: gtin}, response => {
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
    console.log(product);
    return product;
  });
}

async function callCloudFunction(functionName, parameters, resolve) {
  return await functions
    .httpsCallable(functionName)(parameters)
    .then(response => {
      if (
        typeof response.data !== 'object' ||
        'httpErrorCode' in response.data
      ) {
        console.error(`fail ${functionName} with`, parameters);
        console.error(response.data);
        return;
      }
      return resolve(response);
    })
    .catch(reason => {
      console.error(`error ${functionName} with`, parameters);
      console.error(reason);
    });
}

export {getProductByGTIN};
