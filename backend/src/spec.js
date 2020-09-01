describe('My Test Suite app id', () => {
    it('My Test Case', () => {
      expect(true).toEqual(true);

      //This test case with correct API Id
      const input = [
        { id: 1, url: `https://api.openweathermap.org/data/2.5/weather?appid=c7934365959156c498254e7669396409&q=surat` }];

      const output = [{ id: 1, url: `https://api.openweathermap.org/data/2.5/weather?appid=c7934365959156c498254e7669396409&q=surat` }];

      expect((input)).toEqual(output);
    });
  });

describe('My Test not Suite appid', () => {
it('My Test Case', () => {
    expect(true).toEqual(true);
    //This test case with wrong API Id
    const input = [
    { id: 1, url: `https://api.openweathermap.org/data/2.5/weather?appid=c7934365959156c498254e766939640&q=ahmedabad` }];
    const output = [{ id: 1, url: `https://api.openweathermap.org/data/2.5/weather?appid=c7934365959156c498254e7669396409&q=ahmedabad` }];
    expect((input)).toEqual(output);
});
});
