const useAccessToken = () =>
  useState<string | null>("access-token", () => null);

export default useAccessToken;
