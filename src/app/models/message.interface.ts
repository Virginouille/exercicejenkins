import User from "./user.interface"

export default interface Message {
  id: number
  createdAt: string
  receiver: User
  sender: User
  content: string
}
