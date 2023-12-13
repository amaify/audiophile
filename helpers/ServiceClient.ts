interface QueryData<U> {
  query: string;
  variables?: { [key: string]: U };
  cache?: RequestCache;
}

export async function fetchData<T, U = void>({
  query,
  variables,
  cache = "default"
}: QueryData<U>): Promise<{ data: T }> {
  const uri = process.env.HYGRAPH_ENDPOINT;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    }),
    cache
  };

  const response = await fetch(uri ?? "", options);
  return response.json();
}
