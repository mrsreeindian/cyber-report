'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { submitSurvey } from '@/actions/survey';

const questions = [
  {
    id: 'q1',
    text: 'How familiar are you with the term "Cyberbullying"?',
    type: 'radio',
    options: ['Very familiar', 'Somewhat familiar', "Heard of it, but don't know much", 'Never heard of it before']
  },
  {
    id: 'q2',
    text: 'Have you ever experienced cyberbullying?',
    type: 'radio',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'q3',
    text: 'Have you ever witnessed someone being cyberbullied online?',
    type: 'radio',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'q4',
    text: 'If you witnessed cyberbullying, what did you do?',
    type: 'radio',
    options: ['Supported the victim', 'Reported it to someone', 'Ignored it', 'Joined the bullying', 'I have never witnessed cyberbullying']
  },
  {
    id: 'q5',
    text: 'Which of the following do you think can be considered cyberbullying? (Select all that apply.)',
    type: 'checkbox',
    options: ['Sending abusive or threatening messages', 'Spreading rumours online', "Sharing someone's photos/videos without permission", 'Creating fake accounts to target someone', 'Posting insulting memes repeatedly', "I'm not sure"]
  },
  {
    id: 'q6',
    text: 'Do you think jokes or memes can sometimes cross the line and become cyberbullying?',
    type: 'radio',
    options: ['Yes', 'No', 'Depends on the situation']
  },
  {
    id: 'q7',
    text: 'What do you think are the possible effects of cyberbullying? (Select all that apply.)',
    type: 'checkbox',
    options: ['Stress or anxiety', 'Loss of self-confidence', 'Depression or loneliness', 'Poor academic performance', 'Social isolation', "I don't know"]
  },
  {
    id: 'q8',
    text: 'Are you aware that cyberbullying can have legal consequences in India?',
    type: 'radio',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'q9',
    text: 'Have you ever blocked, muted, or reported someone because of online harassment?',
    type: 'radio',
    options: ['Yes', 'No', 'Prefer not to say']
  },
  {
    id: 'q10',
    text: 'In your opinion, what can colleges do to reduce cyberbullying? (Select all that apply.)',
    type: 'checkbox',
    options: ['Conduct awareness sessions', 'Introduce anonymous reporting systems', 'Take stricter disciplinary action', 'Provide counselling and victim support', 'Organize digital safety workshops', 'Other']
  },
  {
    id: 'q11',
    text: 'Women & Online Harassment: Which forms of online harassment do you think women are most vulnerable to? (Select all that apply.)',
    type: 'checkbox',
    options: ['Unwanted messages or sexual comments', 'Fake social media profiles', 'Sharing personal photos without consent', 'Cyberstalking', 'Threats or intimidation', "I'm not sure"]
  },
  {
    id: 'q12',
    text: "Are you aware of image-based abuse (sharing someone's private photos/videos without their consent)?",
    type: 'radio',
    options: ['Yes', "I've heard about it but don't know much", 'No']
  },
  {
    id: 'q13',
    text: 'If someone you know became a victim of online harassment or image-based abuse, what would you most likely do?',
    type: 'radio',
    options: ['Support them emotionally', 'Encourage them to report it', 'Help collect evidence (screenshots/messages)', 'Inform a trusted adult/college authority', "I wouldn't know what to do"]
  },
  {
    id: 'q14',
    text: 'Do you think enough awareness is provided in colleges about cyberstalking, online harassment, and image-based abuse?',
    type: 'radio',
    options: ['Yes', 'Somewhat', 'No', 'Not sure']
  },
  {
    id: 'q15',
    text: 'Which of the following measures would be most effective in reducing online harassment, especially against women?',
    type: 'radio',
    options: ['Stronger legal action', 'Digital safety awareness programs', 'Faster reporting and action by social media platforms', 'Encouraging friends and bystanders to intervene', 'Better privacy and security practices', 'All of the above']
  }
];

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [otherText, setOtherText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [error, setError] = useState('');

  const currentQ = questions[currentStep];

  const handleOptionChange = (option: string) => {
    if (currentQ.type === 'radio') {
      setAnswers({ ...answers, [currentQ.id]: option });
    } else {
      const currentAnswers = (answers[currentQ.id] as string[]) || [];
      if (currentAnswers.includes(option)) {
        setAnswers({ ...answers, [currentQ.id]: currentAnswers.filter(a => a !== option) });
      } else {
        setAnswers({ ...answers, [currentQ.id]: [...currentAnswers, option] });
      }
    }
  };

  const handleNext = async () => {
    // Save "Other" text if applicable
    if (currentQ.id === 'q10' && (answers['q10'] as string[])?.includes('Other') && otherText) {
      setAnswers(prev => ({ ...prev, 'q10_other': otherText }));
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      setError('');
      try {
        const result = await submitSurvey(answers);
        if (result.success && result.trackingCode) {
          setTrackingCode(result.trackingCode);
          setIsSuccess(true);
        } else {
          setError(result.error || 'Failed to submit survey.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const canProceed = () => {
    const ans = answers[currentQ.id];
    if (currentQ.type === 'radio') return !!ans;
    return Array.isArray(ans) && ans.length > 0;
  };

  if (isSuccess) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <CheckCircle2 size={64} color="var(--success)" style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}>Thank You</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2rem' }}>
          Your responses have been securely recorded. Your voice helps us create a safer digital environment.
        </p>
        <div className="tracking-code-box animate-fade-in delay-200">
          {trackingCode}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '3rem' }}>
          Please save this tracking code if you need to reference your response.
        </p>
        <Link href="/" className="btn btn-secondary">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '4px', background: 'rgba(0,0,0,0.05)', position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ 
            height: '100%', 
            background: 'var(--primary)', 
            width: `${((currentStep) / questions.length) * 100}%`,
            transition: 'width 0.4s ease'
          }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '2.5rem', lineHeight: 1.4 }}>
          {currentQ.text}
        </h2>

        {error && (
          <div style={{ padding: '1rem', backgroundColor: 'rgba(248, 113, 113, 0.1)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {currentQ.options.map(option => {
            const isSelected = currentQ.type === 'radio' 
              ? answers[currentQ.id] === option 
              : ((answers[currentQ.id] as string[]) || []).includes(option);

            return (
              <label 
                key={option} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1.25rem 1.5rem',
                  background: isSelected ? 'var(--surface-hover)' : 'var(--surface)',
                  border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--glass-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: currentQ.type === 'radio' ? '50%' : '4px',
                  border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--text-secondary)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isSelected ? 'var(--primary)' : 'transparent'
                }}>
                  {isSelected && currentQ.type === 'checkbox' && <CheckCircle2 size={14} color="white" />}
                  {isSelected && currentQ.type === 'radio' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
                </div>
                <span style={{ fontSize: '1.05rem', fontWeight: isSelected ? 500 : 400 }}>{option}</span>
              </label>
            );
          })}
          
          {currentQ.id === 'q10' && ((answers['q10'] as string[]) || []).includes('Other') && (
            <input 
              type="text" 
              className="form-input" 
              placeholder="Please specify..." 
              value={otherText}
              onChange={e => setOtherText(e.target.value)}
              autoFocus
              style={{ marginTop: '0.5rem' }}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0 || isSubmitting}
            style={{ opacity: currentStep === 0 ? 0 : 1, pointerEvents: currentStep === 0 ? 'none' : 'auto' }}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : currentStep === questions.length - 1 ? 'Submit Survey' : (
              <>Next <ChevronRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
