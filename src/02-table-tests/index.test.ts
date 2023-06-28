// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 20, b: 4, action: Action.Divide, expected: 5 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 2, action: 'sum', expected: null },
  { a: '2', b: 'hi', action: 'sum', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('table as a variable', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });
});
