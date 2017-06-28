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
  api.use([
    'meteor-base',
    'ecmascript',
    'react-meteor-data@0.2.9',
    'tmeasday:check-npm-versions@0.3.1'
  ]);

  api.mainModule('lib/main.js', 'client');
});