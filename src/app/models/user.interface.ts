export default interface User {
  readonly id: number
  email: string
  roles: string[]
  password: string
  name: string
  firstName: string
  billingAddress: string
  isVerified: boolean
  createdAt: string
}
