/// <reference types="vite/client" />

interface userInfoType {
  username: string;
  picture: string;
  email: string;
  savedCodes: Array<string>;
}

interface loginCredentialsType{
    userId: string; password: string
}