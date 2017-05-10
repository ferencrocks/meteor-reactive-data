// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-reactive-data.js.
import { name as packageName } from "meteor/ferencrocks:meteor-reactive-data";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-reactive-data - example', function (test) {
  test.equal(packageName, "meteor-reactive-data");
});
