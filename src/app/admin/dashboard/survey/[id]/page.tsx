import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Calendar, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

const questions = [
  { id: 'q1', text: 'How familiar are you with the term "Cyberbullying"?' },
  { id: 'q2', text: 'Have you ever experienced cyberbullying?' },
  { id: 'q3', text: 'Have you ever witnessed someone being cyberbullied online?' },
  { id: 'q4', text: 'If you witnessed cyberbullying, what did you do?' },
  { id: 'q5', text: 'Which of the following do you think can be considered cyberbullying?' },
  { id: 'q6', text: 'Do you think jokes or memes can sometimes cross the line and become cyberbullying?' },
  { id: 'q7', text: 'What do you think are the possible effects of cyberbullying?' },
  { id: 'q8', text: 'Are you aware that cyberbullying can have legal consequences in India?' },
  { id: 'q9', text: 'Have you ever blocked, muted, or reported someone because of online harassment?' },
  { id: 'q10', text: 'In your opinion, what can colleges do to reduce cyberbullying?' },
  { id: 'q11', text: 'Women & Online Harassment: Which forms of online harassment do you think women are most vulnerable to?' },
  { id: 'q12', text: "Are you aware of image-based abuse (sharing someone's private photos/videos without their consent)?" },
  { id: 'q13', text: 'If someone you know became a victim of online harassment or image-based abuse, what would you most likely do?' },
  { id: 'q14', text: 'Do you think enough awareness is provided in colleges about cyberstalking, online harassment, and image-based abuse?' },
  { id: 'q15', text: 'Which of the following measures would be most effective in reducing online harassment, especially against women?' }
];

export default async function SurveyResponseDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const response = await prisma.surveyResponse.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!response) {
    notFound();
  }

  const answers = response.answers as Record<string, any>;

  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div>
          <Link href="/admin/dashboard/survey" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            <ArrowLeft size={16} /> Back to Survey Analytics
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText color="var(--primary)" /> Survey Response
          </h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={16} /> Tracking Code
          </h3>
          <p style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>{response.trackingCode}</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} /> Submitted On
          </h3>
          <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>
            {new Date(response.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          Answers
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {questions.map((q, i) => {
            const answer = answers[q.id];
            let displayAnswer = '- No answer provided -';
            
            if (answer) {
              if (Array.isArray(answer)) {
                displayAnswer = answer.length > 0 ? answer.join(', ') : displayAnswer;
              } else {
                displayAnswer = answer;
              }
            }

            // Append "Other" text if applicable
            if (q.id === 'q10' && answers['q10_other']) {
              displayAnswer += ` (Other: ${answers['q10_other']})`;
            }

            return (
              <div key={q.id}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {i + 1}. {q.text}
                </h4>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'var(--surface)', 
                  border: '1px solid var(--border)', 
                  borderRadius: 'var(--radius-sm)',
                  color: answer ? 'var(--text-primary)' : 'var(--text-secondary)',
                  lineHeight: 1.5
                }}>
                  {displayAnswer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
