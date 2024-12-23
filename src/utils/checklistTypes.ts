export type ChecklistStep = {
  id: string;
  description: string;
  explanation: string;
  check: (store: any) => boolean;
  hint: string;
};

export type ChecklistType = 'startup' | 'takeoff';