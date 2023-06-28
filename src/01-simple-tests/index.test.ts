// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(4);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Subtract })).toBe(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Multiply })).toBe(9);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 20, b: 4, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Exponentiate })).toBe(
      16,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: 'sum' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '9', b: 'hi', action: Action.Add })).toBe(
      null,
    );
  });
});
