describe('App', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual("Angular 2 Rezi Authentication");
  });

  it('should have <header>', function () {
    expect(element(by.css('app header')).isPresent()).toEqual(true);
  });

  it('should have <main>', function () {
    expect(element(by.css('app main')).isPresent()).toEqual(true);
  });

  it('should have <nav>', function () {
    expect(element(by.css('app nav')).isPresent()).toEqual(true);
  });

});
