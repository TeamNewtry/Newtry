// UC0_Hello_world.feature

import 'react-native';
import React from 'react';
import App from '../../App';
import renderer from 'react-test-renderer';
import expect from 'expect';

import {loadFeature, defineFeature} from 'jest-cucumber';

const feature = loadFeature('cucumber/features/UC0_Hello_World.feature');

defineFeature(feature, test => {
  test('Click on button to say "Hello World!"', ({given, when, then}) => {
    const appComponent = renderer.create(<App />).root;
    given('the test text says "Wrong text"', () => {
      expect(
        appComponent.find(el => el.children == ['Wrong text']),
      ).not.toBeNull();
    });

    when('I click on the "Say Hello World" button', () => {
      const button = appComponent.find(
        el => el.type == 'Button' && el.props.title == 'Say Hello World',
      );
      button.onPress();
    });

    then('the test text says "Hello World!"', () => {
      expect(
        appComponent.find(el => el.children == ['Hello World!']),
      ).not.toBeNull();
    });
  });
});
