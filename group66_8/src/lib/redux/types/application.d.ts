export interface DecideApplication {
  decision_notes: string;
  id: string;
}

type StepStatus = "completed" | "inprogress" | "incomplete";
export interface ApplicationState {
  profileCompletion: number;
  checklist: {
    profile: StepStatus;
    documents: StepStatus;
    resume: StepStatus;
  };
  formSteps: {
    currentStep: "personal" | "coding" | "essay";
    personal: StepStatus;
    coding: StepStatus;
    essay: StepStatus;
  };
  applicationProgress: {
    submitted: StepStatus;
    interview: StepStatus;
    decision: StepStatus;
  };
}
