import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

// Envelope interface representing a budget envelope
export interface Envelope {
  envelope_id: string;
  envelope_title: string;
  category: string;
  description: string;
  allocated_amount: number;
  spent_amount: number;
}

//  State interface for envelope slice
interface EnvelopeState {
  envelopes: Envelope[];
  loading: boolean;
  error: string | null;
}

// Initial state for envelope slice
const initialState: EnvelopeState = {
  envelopes: [],
  loading: false,
  error: null
};

// Validates an envelope object
const isValidEnvelope = (envelope: any): envelope is Envelope => {
  return (
    envelope &&
    typeof envelope.envelope_id === "string" &&
    envelope.envelope_id.trim() !== "" &&
    typeof envelope.envelope_title === "string" &&
    envelope.envelope_title.trim() !== "" &&
    typeof envelope.category === "string" &&
    typeof envelope.description === "string" &&
    typeof envelope.allocated_amount === "number" &&
    envelope.allocated_amount >= 0 &&
    typeof envelope.spent_amount === "number" &&
    envelope.spent_amount >= 0
  );
};

const envelopeSlice = createSlice({
  name: "envelope",
  initialState,
  reducers: {
    /**
     * Sets the entire envelopes array
     * @param state - Current state
     * @param action - Payload containing array of envelopes
     */
    setEnvelopes: (state, action: PayloadAction<Envelope[]>) => {
      const validEnvelopes = action.payload.filter(isValidEnvelope);
      state.envelopes = validEnvelopes;
      state.error = null;
    },

    /**
     * Removes an envelope by ID
     * @param state - Current state
     * @param action - Payload containing envelope ID to remove
     */
    removeEnvelope: (state, action: PayloadAction<string>) => {
      const envelopeId = action.payload?.trim();
      if (!envelopeId) {
        state.error = "Invalid envelope ID";
        return;
      }

      const initialLength = state.envelopes.length;
      state.envelopes = state.envelopes.filter(
        envelope => envelope.envelope_id !== envelopeId
      );

      if (state.envelopes.length === initialLength) {
        state.error = "Envelope not found";
      } else {
        state.error = null;
      }
    },

    /**
     * Adds a new envelope
     * @param state - Current state
     * @param action - Payload containing new envelope
     */
    addEnvelope: (state, action: PayloadAction<Envelope>) => {
      if (!isValidEnvelope(action.payload)) {
        state.error = "Invalid envelope data";
        return;
      }

      // Check for duplicate ID
      const exists = state.envelopes.some(
        envelope => envelope.envelope_id === action.payload.envelope_id
      );

      if (exists) {
        state.error = "Envelope with this ID already exists";
        return;
      }

      state.envelopes.push(action.payload);
      state.error = null;
    },

    /**
     * Updates an existing envelope
     * @param state - Current state
     * @param action - Payload containing updated envelope
     */
    updateEnvelope: (state, action: PayloadAction<Envelope>) => {
      if (!isValidEnvelope(action.payload)) {
        state.error = "Invalid envelope data";
        return;
      }

      const index = state.envelopes.findIndex(
        envelope => envelope.envelope_id === action.payload.envelope_id
      );

      if (index !== -1) {
        state.envelopes[index] = action.payload;
        state.error = null;
      } else {
        state.error = "Envelope not found";
      }
    },

    /**
     * Updates partial envelope data
     * @param state - Current state
     * @param action - Payload containing envelope ID and partial update
     */
    updateEnvelopePartial: (
      state,
      action: PayloadAction<{ envelope_id: string; updates: Partial<Envelope> }>
    ) => {
      const { envelope_id, updates } = action.payload;
      const index = state.envelopes.findIndex(
        envelope => envelope.envelope_id === envelope_id
      );

      if (index !== -1) {
        state.envelopes[index] = { ...state.envelopes[index], ...updates };
        state.error = null;
      } else {
        state.error = "Envelope not found";
      }
    },

    /**
     * Sets loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * Sets error message
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /**
     * Clears all envelopes
     */
    clearEnvelopes: (state) => {
      state.envelopes = [];
      state.error = null;
    }
  }
});

// Export actions
export const {
  setEnvelopes,
  removeEnvelope,
  addEnvelope,
  updateEnvelope,
  updateEnvelopePartial,
  setLoading,
  setError,
  clearEnvelopes
} = envelopeSlice.actions;

// Selectors
// Assumes RootState has envelope property - adjust based on your store structure
export const selectAllEnvelopes = (state: { envelope: EnvelopeState }) =>
  state.envelope.envelopes;

export const selectEnvelopeById = (state: { envelope: EnvelopeState }, id: string) =>
  state.envelope.envelopes.find(envelope => envelope.envelope_id === id);

export const selectEnvelopesByCategory = createSelector(
  [selectAllEnvelopes, (_state: any, category: string) => category],
  (envelopes, category) =>
    envelopes.filter(envelope => envelope.category === category)
);

export const selectEnvelopeLoading = (state: { envelope: EnvelopeState }) =>
  state.envelope.loading;

export const selectEnvelopeError = (state: { envelope: EnvelopeState }) =>
  state.envelope.error;

export const selectTotalAllocated = createSelector(
  [selectAllEnvelopes],
  (envelopes) =>
    envelopes.reduce((total, envelope) => total + envelope.allocated_amount, 0)
);

export const selectTotalSpent = createSelector(
  [selectAllEnvelopes],
  (envelopes) =>
    envelopes.reduce((total, envelope) => total + envelope.spent_amount, 0)
);

export const selectEnvelopeCategories = createSelector(
  [selectAllEnvelopes],
  (envelopes) => [...new Set(envelopes.map(envelope => envelope.category))]
);

// Export reducer
export default envelopeSlice.reducer;

