import User  from "./user.interface"

export default interface Reservation {
  id: number
  startDate: string
  endDate: string
  status: string
  totalAmount: string
  created_at: string
  client: User
}

