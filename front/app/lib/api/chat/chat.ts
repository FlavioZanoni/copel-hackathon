import { makeApiRequest } from "../makeApiRequest"
import { MutateChat, Chat } from "./types"

export const mutateChat = async ({
  data,
}: {
  data: MutateChat
}) => {

  return makeApiRequest<Chat>({
    method: "post",
    url: `chat`,
    data: data,
  })
}
