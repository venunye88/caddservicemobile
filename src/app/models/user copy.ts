interface User {
    id: string
    username: string
    name: string
    email: string
    userType: string
    phoneNumber: string
    picture: string
    token: string
    role: Role
    confirmPassword: string,
    password: string
  }

  interface Role {
    id:string
    name: string
    privileges: string[]
    notes: string
  }

  interface LoginParams {
    username: string;
    password: string;
    type: string;
  }
  
  interface ChangePasswordParams {
    currentPassword: string
    newPssword: string
    confirmPassword: string
  }
  
  export interface LoginResponse {
    username: string;
    token: string;
  }
  
  export { User, Role, LoginParams,ChangePasswordParams }
  
  