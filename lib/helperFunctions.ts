export const getHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
