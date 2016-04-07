describe('Home', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <home>', function () {
    var home = element(by.css('app p'));
    expect(home.isPresent()).toEqual(true);
    expect(home.getText()).toEqual("Welcome!");
  });

});
