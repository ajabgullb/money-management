import supabase from "./supabaseClient";
import { login } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store/store";

class Auth {
  async createUserProfile (userId: string, email: string, firstName: string, lastName: string) {
    try {
      const payload = {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        created_at: new Date(),
        updated_at: new Date(),
      }

      if (firstName !== undefined && lastName !== undefined) {
        payload.first_name = firstName;
        payload.last_name = lastName;
      }

      const { data, error } = await supabase.from("Users").upsert(payload, {
        onConflict: "id"
      })
      .select()
      .single()

      if (error) {
        console.error('Error upserting user profile:', error);
        return { success: false, error };
      }
  
      return { success: true, data };
    } catch (error) {
      console.error('Exception during profile upsert:', error);
      return { success: false, error };
    }

  }

  async waitlistSignup (email: string) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) throw error;
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async signUpNewUser(email: string, password: string, firstName: string, lastName: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'https://localhost:3000/',
        },
      })
  
      if (error) {
        console.error('Supabase auth signup error:', error);
        throw error;
      }

      if (data.user) {
        // Insert into your users table
        const { error: insertError } = await supabase
          .from('Users')
          .insert({ 
            user_id: data.user.id,
            first_name: firstName,
            last_name: lastName,
            email: data.user.email,
            created_at: new Date().toString(),
            updated_at: new Date().toString(),
          });

        if (insertError) console.error('Insert error:', insertError);
      }
      
      return data;
    } catch (error) {
      throw error;
    }
    
  }

  async signIn(email: string, password: string, dispatch: AppDispatch) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
  
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Sign in successful');

        dispatch(login({
          authStatus: true,
          userData: {
            id: data.user.id,
            email: data.user.email,
          }
        }))
      } 

      return data;
    } catch (error) {
      throw error;
    }
    
  }

  async requestEmailToResetPassword (email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://localhost:3000/auth/reset-password',
      })
    
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.log(`The error from requestEmailToResetPassword: ${error}`)
      throw error;
    }
    
  }

  async resetPassword (password: string, token: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
        data: {
          resetPasswordToken: token,
        },
      })
  
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.log(`The error from resetPassword: ${error}`)
      throw error;
    }
    
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error;
    } catch (error) {
      console.log(`The error from signOut: ${error}`)
      throw error;
    }
    
  }

}

const auth = new Auth();
export default auth
