const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> =>
  fetch(...args).then((res) => res.json() as T);

export default fetcher;
