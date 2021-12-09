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
    return new Product(
      info.code,
      info.product_name,
      info.generic_name,
      nutrition,
      info.ingredients_text,
      null,
      info.nutriscore_data.grade,
      [info.image_url],
    );
  });
}

function searchProducts(gtinOrName) {
  return callCloudFunction('search', {searchTerm: gtinOrName}, response => {
    const info = response.data;
    console.log(info);
    const productIds = info.map(product => product.id);
    console.log(productIds);
    return productIds;
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
      console.error(
        'Code: ',
        reason.code,
        'Message: ',
        reason.message,
        'Details: ',
        reason.details,
      );
    });
}

export {getProductByGTIN, searchProducts};
