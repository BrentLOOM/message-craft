'use strict';

describe('Service: responseService', function () {

  // load the service's module
  beforeEach(module('messageCraftApp'));

  // instantiate service
  var responseService;
  beforeEach(inject(function (_responseService_) {
    responseService = _responseService_;
  }));

  it('should do something', function () {
    expect(!!responseService).toBe(true);
  });

});
