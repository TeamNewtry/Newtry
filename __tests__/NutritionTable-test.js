import 'react-native';
import React from 'react';
import data from '../__mocks__/productMock';
import NutritionTable from '../src/components/NutritionTable';
import renderer from 'react-test-renderer';

describe('testing Nutrition Table', () => {
  it('renders empty view when no data is passed', () => {
    const tree = renderer.create(<NutritionTable />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders table for passed data', () => {
    const tree = renderer
      .create(<NutritionTable data={data.nutrition} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
