// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const account = getBankAccount(initialBalance);
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(200)).toThrowError(
      new InsufficientFundsError(account.getBalance()),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(200, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
  });

  test('should deposit money', () => {
    // Write your test here
  });

  test('should withdraw money', () => {
    // Write your test here
  });

  test('should transfer money', () => {
    // Write your test here
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
