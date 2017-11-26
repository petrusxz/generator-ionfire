'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-ionfire:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'MyApp',
        author: 'Petrus',
        packageName: 'com.dev.app',
        apiKey: 'bgsKey',
        authDomain: 'bgsAuthDomain',
        databaseURL: 'bgsDatabaseURL',
        projectId: 'bgsProjectId',
        storageBucket: 'bgsStorageBucket',
        messagingSenderId: 'bgsMessagingSenderId',
        facebookAppId: 'bgsfacebookAppId',
        facebookAppName: 'bgsFacebookAppName',
        googleReversedId: 'bgsgoogleReversedId',
        googleWebClientId: 'bgsgoogleWebClientId',
        initGit: false
      });
  });

  it('creates files', () => {
    assert.file([
      "./src/app/app.firebase.config.ts",
      "./src/pages/login/login.html",
      "./src/pages/login/login.ts",
      "./src/index.html",
      "./ionic.config.json",
      "./package-lock.json",
      "./package.json",
      "./config.xml"
    ]);
  });

  it('creates firebase config file correctly', () => {
    assert.fileContent([
      ['./src/app/app.firebase.config.ts', /apiKey: \"bgsKey\"/],
      ['./src/app/app.firebase.config.ts', /authDomain: \"bgsAuthDomain\"/],
      ['./src/app/app.firebase.config.ts', /databaseURL: \"bgsDatabaseURL\"/],
      ['./src/app/app.firebase.config.ts', /projectId: \"bgsProjectId\"/],
      ['./src/app/app.firebase.config.ts', /storageBucket: \"bgsStorageBucket\"/],
      ['./src/app/app.firebase.config.ts', /messagingSenderId: \"bgsMessagingSenderId\"/]
    ]);
  });
});