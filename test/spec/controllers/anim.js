'use strict';

describe('Controller: AnimCtrl', function () {

  // load the controller's module
  beforeEach(module('messageCraftApp'));

  var AnimCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnimCtrl = $controller('AnimCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AnimCtrl.awesomeThings.length).toBe(3);
  });
});
