export default interface User {
  id: number
  email: string
  roles: string[]
  password: string
  name: string
  firstName: string
  billingAddress: string
  isVerified: boolean
  createdAt: string
}
