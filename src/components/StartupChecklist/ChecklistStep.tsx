import React, { useState } from 'react';
import { css } from 'glamor';
import { Check, X, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import type { ChecklistStep as ChecklistStepType } from '../../utils/checklistTypes';
import { store } from '../../stores';

const styles = {
  step: css({
    marginBottom: '20px',
    borderBottom: '1px solid #444',
    paddingBottom: '15px',
    '&:last-child': {
      borderBottom: 'none'
    }
  }),
  stepHeader: css({
    marginBottom: '8px'
  }),
  stepContent: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: '#2a2a2a'
    }
  }),
  stepLeft: css({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1
  }),
  stepRight: css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: '40px',
    justifyContent: 'flex-end'
  }),
  completed: css({
    color: '#34D399'
  }),
  pending: css({
    color: '#FCD34D'
  }),
  hint: css({
    fontSize: '12px',
    color: '#FCD34D',
    marginTop: '4px',
    marginLeft: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }),
  explanation: css({
    fontSize: '14px',
    color: '#94A3B8',
    marginTop: '8px',
    marginLeft: '24px',
    lineHeight: '1.4',
    padding: '8px',
    backgroundColor: '#1E293B',
    borderRadius: '4px',
    border: '1px solid #334155'
  })
};

interface ChecklistStepProps {
  step: ChecklistStepType;
  isCompleted: boolean;
}

export const ChecklistStep = ({ step, isCompleted }: ChecklistStepProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div {...styles.step}>
      <div {...styles.stepHeader}>
        <div {...styles.stepContent} onClick={() => setIsExpanded(!isExpanded)}>
          <div {...styles.stepLeft}>
            {isCompleted ? (
              <Check size={16} {...styles.completed} />
            ) : (
              <X size={16} {...styles.pending} />
            )}
            <span>{step.description}</span>
          </div>
          <div {...styles.stepRight}>
            <Info size={12} />
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div {...styles.explanation}>
          {step.explanation}
        </div>
      )}

      {!isCompleted && (
        <div {...styles.hint}>
          <AlertCircle size={12} />
          {step.hint}
        </div>
      )}
    </div>
  );
};