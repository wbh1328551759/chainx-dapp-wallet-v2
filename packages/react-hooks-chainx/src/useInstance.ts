
import { useRef } from 'react';

export function isFunction<T>(initial?: T | (() => T)): initial is () => T {
  return typeof initial === 'function';
}

export function useInstance<T extends {}>(initial?: T | (() => T)) {
  const instance = useRef<T>();

  // 初始化
  if (instance.current == null) {
    if (initial) {
      instance.current = isFunction(initial) ? initial() : initial;
    } else {
      instance.current = {} as T;
    }
  }

  return instance.current;
}
