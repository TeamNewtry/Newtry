import React from 'react';
import renderer from 'react-test-renderer';
import ProductView from '../src/navigation/ProductView';
import * as CloudFunctionsWrapper from '../src/CloudFunctionsWrapper';

jest.mock(
  'react-native-table-component',
  () => 'Row, Rows, Table, TableWrapper',
);
const getProduct = jest.spyOn(CloudFunctionsWrapper, 'getProductByGTIN');
getProduct.mockImplementation(gtin => ({
  gtin: '0000080135876',
}));
test('renders correctly', () => {
  const route = {
    isAccessibilityModeOn: false,
    params: {
      gtin: '0000080135876',
    },
  };
  const navigate = jest.fn();
  const tree = renderer
    .create(<ProductView route={route} navigation={{navigate}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
