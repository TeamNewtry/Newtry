import 'react-native';
import React from 'react';
import data from '../__mocks__/productMock';
import IngredientList from '../src/components/IngredientList';
import renderer from 'react-test-renderer';

describe('testing ingredients list', () => {
  it('renders empty view when no data is passed', () => {
    const tree = renderer.create(<IngredientList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders list for passed data', () => {
    const tree = renderer
      .create(<IngredientList data={data.ingredients} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
