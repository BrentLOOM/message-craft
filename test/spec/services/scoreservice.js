'use strict';

describe('Service: scoreService', function () {

  // load the service's module
  beforeEach(module('messageCraftApp'));

  // instantiate service
  var scoreService;
  beforeEach(inject(function (_scoreService_) {
    scoreService = _scoreService_;
  }));

  it('should do something', function () {
    expect(!!scoreService).toBe(true);
  });

});
