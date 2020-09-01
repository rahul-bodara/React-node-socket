describe('test react App for flight', () => {
    it('My Test Case', () => {
      expect(true).toEqual(true);

      //This test case with correct API Id
      const input = [
        { id: 1, url: `http://localhost:5000/` }];

      const output = [{ id: 1, data: `http://localhost:5000/` }];

      expect((input)).toEqual(output);
    });
  });


