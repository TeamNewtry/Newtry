import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import Product from './store/Product';
import Nutrition from './store/Nutrition';

const functions = firebase.app().functions('europe-west1');

function getProductByGTIN({gtin}) {
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
    return new Product(
      info.code,
      info.product_name,
      info.generic_name,
      nutrition,
      info.ingredients_text_de ?? info.ingredients_text,
      null,
      (info.nutriscore_data || {}).grade ?? null,
      [info.image_url],
    );
  });
}

function searchProducts({gtinOrName}) {
  return callCloudFunction('search', {searchTerm: gtinOrName}, response => {
    const info = response.data;
    return info.map(product => product.id);
  });
}

async function callCloudFunction(functionName, parameters, resolve) {
  return await functions
    .httpsCallable(functionName)(parameters)
    .then(response => {
      if (
        !(response.data instanceof Object) ||
        'httpErrorCode' in response.data
      ) {
        throw response.data;
      }
      return resolve(response);
    })
    .catch(reason => {
      console.error(`error ${functionName} with`, parameters);
      throw reason;
    });
}

export {getProductByGTIN, searchProducts};
