/* eslint-disable import/no-extraneous-dependencies */
import fetchMock from 'jest-fetch-mock';

global.fetch             = fetchMock;
global.API_EXTERNAL_HOST = '';
global.APP_VERSION       = '0.1.2';

global.matchMedia = global.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener() {
    },
    removeListener() {
    }
  };
};

global.requestAnimationFrame = global.requestAnimationFrame || function requestAnimationFrame(callback) {
  setTimeout(callback, 0);
};
