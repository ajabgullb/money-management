import supabase from "./supabaseClient";

class Auth {

  async signUpNewUser(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'https://localhost:3000/',
        },
      })
  
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.log(`The error from signUpNewUser: ${error}`)
      throw error;
    }
    
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
  
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.log(`The error from signInWithEmail: ${error}`)
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
