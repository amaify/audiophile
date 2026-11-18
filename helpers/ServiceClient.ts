interface QueryData<U> {
  query: string;
  variables?: { [key: string]: U };
  /** Seconds before cached CMS data is refreshed in the background. `false` caches indefinitely. */
  revalidate?: number | false;
}

/** CMS content changes rarely, so cache it and refresh at most once an hour. */
const DEFAULT_REVALIDATE_SECONDS = 3600;

export async function fetchHygraphData<T, U = void>({
  query,
  variables,
  revalidate = DEFAULT_REVALIDATE_SECONDS
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
    next: { revalidate }
  };

  const response = await fetch(uri, options);
  return response.json();
}
