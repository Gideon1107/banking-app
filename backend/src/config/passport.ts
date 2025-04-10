import passport from 'passport';
import bcrypt from 'bcrypt'
import { db } from "../db";
import { eq } from 'drizzle-orm';
import { users,accountDetails} from "../model/schema";
import { Strategy as LocalStrategy } from 'passport-local';


passport.use(new LocalStrategy({
    usernameField: 'acctNumber',
    passwordField: 'password'
   
    },
    ( async(acctNumber, password, done) => {
      
       try {
        const accountNumber = Number(acctNumber);

        if (isNaN(accountNumber)) {
          return done(null, false, { message: 'Invalid account number format' });
        }

        // Check if the account number exists
         let acctInfo= await db.select()
         .from(accountDetails)
         .where(eq(accountDetails.account_number, Number(acctNumber)));

         if(!acctInfo[0]){
            return done(null, false, { message: 'Account number not found' });
         }
        
         // Check if the user exists
         const user = await db.select()
         .from(users)
         .where(eq(users.id, acctInfo[0].user_id));


         if (!user[0]) {
            return done(null, false, { message: 'User not found' });
          }

        // Check if the password is correct
         const matchPassword =  await bcrypt.compare(password, user[0].password);

        if (!matchPassword) {
                return done(null, false, { message: 'Incorrect password' });
        }
        
        // Check if the user Account is active
        if (!user[0].isactive) {
            return done(null, false, { message: 'You need to activate your acount to login' });
        }
         
        //Concatenate userInfo and accountInfo information
        const userWithAccount = {
            ...user[0],
            account: acctInfo[0],
          };
          
          return done(null, userWithAccount);
      
          
       } catch (error) {
         return done(error);
       }


})))


// Serialize  user
passport.serializeUser((user: any, done) => {
    done(null, user.id); 
});

//deserialize user
passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await db.select()
          .from(users)
          .where(eq(users.id, String(id)));

        if (!user[0]) {
            return done(null, false);
        }

        done(null, user[0]);
    } catch (error) {
        done(error);
    }
});
