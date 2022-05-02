import 'react-native';
import React from 'react';
import data from '../__mocks__/productMock';
import NutritionTable from '../src/components/NutritionTable';
import renderer from 'react-test-renderer';

describe('testing Nutrition Table', () => {
  it('renders empty view when no data is passed', () => {
    renderer.create(<NutritionTable />);
  });

  it('renders table for passed data', () => {
    renderer.create(<NutritionTable data={data.nutrition} />);
  });
});
