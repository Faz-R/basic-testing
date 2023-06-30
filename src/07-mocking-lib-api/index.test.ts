// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    const baseApiUrl = 'https://jsonplaceholder.typicode.com';
    const relativePath = '/posts';
    jest.advanceTimersByTime(5000);
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(createSpy).toHaveBeenCalledWith({ baseURL: baseApiUrl });
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: 'some data' }));
    const relativePath = '/posts';
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    const getRelativePath = getSpy.mock.calls[0]?.[0];
    expect(getRelativePath).toBe(relativePath);
  });

  test('should return response data', async () => {
    const data = { data: 'some data' };
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => data);
    const relativePath = '/posts';
    const result = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(result).toBe('some data');
  });
});
