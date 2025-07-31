import User  from "./user.interface"

export default interface Reservation {
  readonly id: number
  startDate: string
  endDate: string
  status: number // Id du statut
  totalAmount: string
  created_at: string
  client: User

}

