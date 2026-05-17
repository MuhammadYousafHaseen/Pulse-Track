import 'next-auth';
import { DefaultSession } from 'next-auth';


declare module 'next-auth' {
    interface User{
        _id?:string;
       role?:string;
        name?:string;
    }
    interface Session{
          user:{
            id?:string;
            role?:string;
            name?:string;
          } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        isVerified?: boolean;
        name?: string;
       role?: string;
}
}