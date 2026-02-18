
import React from 'react';
import { Project, DailyReport, Task, User, AttendanceRecord } from '../types';
import { Users, Construction, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  projects: Project[];
  reports: DailyReport[];
  tasks: Task[];
  users: User[]; // Now receiving users from App.tsx
}

const Dashboard: React.FC<DashboardProps> = ({ projects, reports, tasks, users }) => {
  const totalProjects = projects.length;
  const activeEngineers = users.filter(u => u.role === 'ENGINEER').length;
  const delayedTasks = tasks.filter(t => t.status === 'DELAYED' || (new Date(t.endDate) < new Date() && t.status !== 'COMPLETED')).length;
  
  const completionRate = Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / (totalProjects || 1));

  const chartData = projects.map(p => ({
    name: p.name.split(' ')[0],
    progress: p.progress
  }));

  const COLORS = ['#0d9488', '#2563eb', '#065f46', '#ef4444']; // Teal, Blue, Dark Green, Red

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Construction} label="Total Projects" value={totalProjects} color="blue" />
        <StatCard icon={Users} label="Site Engineers" value={activeEngineers} color="teal" />
        <StatCard icon={AlertTriangle} label="Delayed Tasks" value={delayedTasks} color="red" />
        <StatCard icon={TrendingUp} label="Avg Progress" value={`${completionRate}%`} color="darkGreen" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Project Progress Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="progress" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Recent Activity</h3>
          <div className="space-y-4">
            {reports.slice(0, 5).map((report, idx) => {
              const project = projects.find(p => p.id === report.projectId);
              const engineer = users.find(u => u.id === report.engineerId); // Use `users` prop
              return (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${report.present ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {engineer?.name} updated <span className="text-teal-600">{project?.name}</span>
                    </p>
                    <p className="text-xs text-slate-500 mb-1">{report.date}</p>
                    <p className="text-sm text-slate-600 line-clamp-1">{report.notes}</p>
                  </div>
                  {report.photos[0] && (
                    <img src={report.photos[0]} className="w-12 h-12 rounded object-cover border border-slate-200" alt="Work site" />
                  )}
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-teal-600 font-medium transition-colors">
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600',
    teal: 'bg-teal-50 text-teal-600',
    red: 'bg-red-50 text-red-600',
    darkGreen: 'bg-emerald-50 text-emerald-800',
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;