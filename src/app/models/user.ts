export interface User {
  id: string
  username: string
  name: string
  // email: string
  // phoneNumber: string
  // picture: string
  token: string
  type: UserType
  verified: boolean
  // role: Role

}

export interface ChangePassword {
  username: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// export  class UserType{
//   public static Public="Public";
//   public static TawoAdmin="TawoAdmin";
// }

export enum UserType {
  Public = "Public",
  TawoAdmin = "TawoAdmin"
}