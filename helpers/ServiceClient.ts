interface QueryData<U> {
  query: string;
  variables?: { [key: string]: U };
  cache?: RequestCache;
}

export async function fetchHygraphData<T, U = void>({
  query,
  variables,
  cache = "no-cache"
}: QueryData<U>): Promise<{ data: T }> {
  const uri = "https://api-eu-west-2.hygraph.com/v2/clq3jr60y9uqz01uh468vh3q2/master";
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

  const response = await fetch(uri, options);
  return response.json();
}
