'use strict';

describe('Service: messageCraftService', function () {

  // load the service's module
  beforeEach(module('messageCraftApp'));

  // instantiate service
  var messageCraftService;
  beforeEach(inject(function (_messageCraftService_) {
    messageCraftService = _messageCraftService_;
  }));

  it('should do something', function () {
    expect(!!messageCraftService).toBe(true);
  });

});
