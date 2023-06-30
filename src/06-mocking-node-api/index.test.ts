// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import promiseFS from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const timer = 5000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    jest.advanceTimersByTime(timer);
    expect(callback).toHaveBeenCalledTimes(timer / timeout);
    setIntervalSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinMocked = jest.spyOn(path, 'join');
    const pathToFile = '/path/to/file.txt';
    await readFileAsynchronously(pathToFile);

    expect(joinMocked).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = '/path/to/file.txt';
    const file = await readFileAsynchronously(pathToFile);
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(file).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = '/path/to/file.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(promiseFS, 'readFile').mockImplementation(() => {
      const fileContent = Buffer.from('file content');
      return Promise.resolve(fileContent);
    });
    const file = await readFileAsynchronously(pathToFile);
    expect(file).toBe('file content');
  });
});
