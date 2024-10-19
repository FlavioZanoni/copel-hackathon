import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateExample, Example } from "./types"

export const getExample = async ({
  offset,
  limit,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Example>>({
    method: "get",
    url: `example?offset=${offset}&limit=${limit}${filter || ""}`,
  })
}

export const getExamplePaginationless = async (): Promise<
  Example
> => {
  return await makeApiRequest({
    method: "get",
    url: `example/list`,
  })
}

export const getExampleById = async (id: number) => {
  return makeApiRequest<Example>({
    method: "get",
    url: `example/${id}`,
  })
}

export const mutateExample = async ({
  id,
  data,
}: {
  id?: number
  data: MutateExample
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `example/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `example`,
    data: data,
  })
}
