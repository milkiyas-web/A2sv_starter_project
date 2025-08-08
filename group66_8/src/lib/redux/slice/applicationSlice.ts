import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState } from "../types/application";

const initialState: ApplicationState = {
  profileCompletion: 0,
  checklist: {
    profile: "incomplete",
    documents: "incomplete",
    resume: "incomplete",
  },
  formSteps: {
    currentStep: "personal",
    personal: "inprogress",
    coding: "incomplete",
    essay: "incomplete",
  },
  applicationProgress: {
    submitted: "incomplete",
    interview: "incomplete",
    decision: "incomplete",
  },
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateProfileCompletion(state, action: PayloadAction<number>) {
      state.profileCompletion = action.payload;
    },
    completeChecklistItem(
      state,
      action: PayloadAction<keyof ApplicationState["checklist"]>
    ) {
      state.checklist[action.payload] = "completed";
    },
    goToNextFormStep(state) {
      const steps = ["personal", "coding", "essay"] as const;
      const currentIndex = steps.indexOf(state.formSteps.currentStep);
      if (currentIndex < steps.length - 1) {
        const currentStep = steps[currentIndex];
        const nextStep = steps[currentIndex + 1];
        state.formSteps[currentStep] = "completed";
        state.formSteps[nextStep] = "inprogress";
        state.formSteps.currentStep = nextStep;
      }
    },
    setFormStepStatus(
      state,
      action: PayloadAction<{
        step: "personal" | "coding" | "essay";
        status: "completed" | "inprogress" | "incomplete";
      }>
    ) {
      state.formSteps[action.payload.step] = action.payload.status;
    },
    setApplicationProgress(
      state,
      action: PayloadAction<Partial<ApplicationState["applicationProgress"]>>
    ) {
      state.applicationProgress = {
        ...state.applicationProgress,
        ...action.payload,
      };
    },
  },
});

export const {
  updateProfileCompletion,
  completeChecklistItem,
  goToNextFormStep,
  setFormStepStatus,
  setApplicationProgress,
} = applicationSlice.actions;

export default applicationSlice.reducer;
