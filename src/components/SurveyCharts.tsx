'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#9b87f5', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa'];

export default function SurveyCharts({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No survey data available yet.</div>;
  }

  // Count responses for Question 1 (Familiarity)
  const q1Counts = data.reduce((acc, curr) => {
    const ans = curr.answers?.q1 || 'Unanswered';
    acc[ans] = (acc[ans] || 0) + 1;
    return acc;
  }, {});
  const q1ChartData = Object.entries(q1Counts).map(([name, value]) => ({ name, value }));

  // Count responses for Question 2 (Experienced)
  const q2Counts = data.reduce((acc, curr) => {
    const ans = curr.answers?.q2 || 'Unanswered';
    acc[ans] = (acc[ans] || 0) + 1;
    return acc;
  }, {});
  const q2ChartData = Object.entries(q2Counts).map(([name, value]) => ({ name, value }));

  // Count multiple choice (Q5 - What can be considered cyberbullying)
  const q5Counts = data.reduce((acc, curr) => {
    const ansArray = curr.answers?.q5 || [];
    if (Array.isArray(ansArray)) {
      ansArray.forEach(ans => {
        acc[ans] = (acc[ans] || 0) + 1;
      });
    }
    return acc;
  }, {});
  const q5ChartData = Object.entries(q5Counts).map(([name, value]) => ({ name, value })).sort((a: any, b: any) => b.value - a.value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Q1 Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Familiarity with Cyberbullying
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <Pie
                  data={q1ChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {q1ChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--glass-border)', borderRadius: 'var(--radius-md)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Q2 Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Have experienced cyberbullying?
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <Pie
                  data={q2ChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {q2ChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--glass-border)', borderRadius: 'var(--radius-md)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Q5 Chart */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          What is considered cyberbullying? (Responses)
        </h3>
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={q5ChartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
              <XAxis type="number" stroke="var(--text-secondary)" />
              <YAxis dataKey="name" type="category" width={190} stroke="var(--text-secondary)" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
