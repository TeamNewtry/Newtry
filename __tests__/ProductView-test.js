import 'react-native';
import React from 'react';
import {} from '../src/navigation/ProductView';
import App from '../src/App';
import data from '../__mocks__/productMock';
import renderer from 'react-test-renderer';

describe('Testing Nutrition Table', () => {
  it('renders empty view when no data is passed', () => {
    renderer.create(/>);
  });

  it('renders table for passed data', () => {
    renderer.create(
      <App navigation={'ProductView'} route={{gtin: '0000080135876'}} />,
    );
  });
});
