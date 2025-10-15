import supabase from "./supabaseClient";

class Envelope {
  async createEnvelope (
    user_id: string,
    envelope_title: string,
    description: string,
    allocated_amount: number,
    category: string,
    spent_amount: number
  ) {
    try {
      if (!user_id) {
        throw new Error("User ID not found at createEnvelope");
      }

      const user = await supabase.auth.getUser()

      if (!user) {
        throw new Error("User not found at createEnvelope");
      }

      const { data, error } = await supabase
      .from('envelopes')
      .insert({ 
        user_id,
        envelope_title,
        description,
        allocated_amount,
        category,
        spent_amount,
      })
      . select();

      if (error) {
        console.log("Error creating Envelope, ", error)
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getEnvelopes (
    user_id: string
  ) {
    try {
      const { data, error } = await supabase
      .from('envelopes')
      .select('*')
      .eq('user_id', user_id);

      if (error) {
        console.log("Error getting Envelopes, ", error)
        throw error;
      }

      return {error, data};
    } catch (error) {
      console.log("Error getting Envelopes, ", error)
      throw error;
    }
  }

}

const envelope = new Envelope();
export default envelope;

