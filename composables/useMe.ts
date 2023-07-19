export default function useMe() {
  const authApi = useAuthApi();
  const { data: me, error, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await authApi.value.getMe();
    },
  });
  return { me, error, isLoading };
}
