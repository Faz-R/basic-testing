// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const otherInithialBalance = 200;
  const account = getBankAccount(initialBalance);
  const otherAccount = getBankAccount(otherInithialBalance);
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(200)).toThrowError(
      new InsufficientFundsError(account.getBalance()),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(200, otherAccount)).toThrowError(
      new InsufficientFundsError(account.getBalance()),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(200, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(200).getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(100).getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    expect(account.transfer(50, otherAccount).getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await account.fetchBalance();
    if (result !== null) {
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(333);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(333);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      new SynchronizationFailedError(),
    );
  });
});
