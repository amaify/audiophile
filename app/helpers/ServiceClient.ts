interface QueryData<U> {
  query: string;
  variables?: { [key: string]: U };
}

export async function fetchDataFromAdmin<T, U = void>({ query, variables }: QueryData<U>): Promise<{ data: T }> {
  const uri = "http://localhost:8000/api/graphql";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  };

  const response = await fetch(uri, options);
  return response.json();
}
