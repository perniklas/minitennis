const thing = require('./sometest.js');

test('words are great', () => {
  expect(thing()).toBe(5);
});

test('Why did my wife leave me', () => {
  //expect(thing()).
  expect('because you play wow').toContain('wow');
});