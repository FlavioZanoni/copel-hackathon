import { makeApiRequest } from "../makeApiRequest"

export const getPdf = async ({
  fileName
}: {
  fileName: string
}) => {
  return makeApiRequest<Blob>({
    method: "get",
    url: `data/${fileName}`,
  })
}
