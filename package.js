Package.describe({
  name: 'ferencrocks:meteor-reactive-data',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'https://github.com/ferencrocks/meteor-reactive-data',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.use('react-meteor-data');
  api.export(['ReactiveData']);
  api.mainModule('lib/meteor-reactive-data.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ferencrocks:meteor-reactive-data');
  api.mainModule('meteor-reactive-data-tests.js');
});
