import React from 'react';
import renderer from 'react-test-renderer';
import ProductView from '../src/navigation/ProductView';
import * as MockCloudFunctionsWrapper from '../src/CloudFunctionsWrapper';

jest.mock(
  '../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter',
);
jest.mock(
  'react-native-table-component',
  () => 'Row, Rows, Table, TableWrapper',
);
jest.mock('../src/CloudFunctionsWrapper');
MockCloudFunctionsWrapper.getProductByGTIN.mockImplementation(gtin =>
  Promise.resolve({data: {gtin: gtin}}),
);

test('renders ingredients', () => {
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
