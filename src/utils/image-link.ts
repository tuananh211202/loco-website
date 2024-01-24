import { BASE_URL } from "./constants"

export const imageLink = (path: string) => {
  return `${BASE_URL}/image/${path}`;
}