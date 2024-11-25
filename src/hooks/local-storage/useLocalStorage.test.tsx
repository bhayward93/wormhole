import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'key';
  const initialValue = 'value';

  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return initial value if no value is stored', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current.value).toBe(initialValue);
  });

  it('should return stored value if value is already stored', () => {
    localStorage.setItem(key, JSON.stringify('newValue'));
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current.value).toBe('newValue');
  });

  it('should update localStorage when setLocalStorageItem is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    act(() => {
      result.current.setItem('newValue2');
    });
    expect(localStorage.getItem(key)).toBe(JSON.stringify('newValue2'));
    expect(result.current.value).toBe('newValue2');
  });

  it('should handle JSON parsing errors', () => {
    localStorage.setItem(key, ':=-@@"');
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current.value).toBe(initialValue);
  });
});
