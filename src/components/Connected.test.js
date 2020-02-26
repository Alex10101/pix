import React from 'react';
import { create, act } from 'react-test-renderer';

import { Provider } from 'react-redux';
import store from 'store/store';
import Connected from './Connected';

describe('Void', () => {
  let snapshot;

  const testingObj = {
    Void: 123
  };

  const testingStore = store(testingObj);

  it("' s redux should handle preloaded state", () => {
    // console.log(JSON.stringify(testingStore.getState()));
    // console.log(JSON.stringify(testingObj));
    expect(JSON.stringify(testingStore.getState())).toBe(JSON.stringify(testingObj));
  });

  it('should change redux state', async () => {
    await act(async () => {
      snapshot = create(
        <Provider store={testingStore}>
          <Connected />
        </Provider>
      );
    });

    expect(snapshot.toJSON()).toMatchSnapshot();
    expect(testingStore.getState().Void).toBe(true);
  });
});
