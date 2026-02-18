
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { User, Project, Task, DailyReport, UserRole } from './types';
import { MOCK_USERS, MOCK_PROJECTS, MOCK_TASKS, MOCK_REPORTS } from './mockData';
import Layout from './components/Layout';
import { LogIn, ChevronRight, User as UserIcon, ShieldCheck, Construction, HardHat, Info } from 'lucide-react';
import { loadData, saveData } from './storageService';

const LazyDashboard = lazy(() => import('./components/Dashboard'));
const LazyProjectDetail = lazy(() => import('./components/ProjectDetail'));
const LazyEngineerPortal = lazy(() => import('./components/EngineerPortal'));

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => loadData('users', MOCK_USERS));
  const [projects, setProjects] = useState<Project[]>(() => loadData('projects', MOCK_PROJECTS));
  const [tasks, setTasks] = useState<Task[]>(() => loadData('tasks', MOCK_TASKS));
  const [reports, setReports] = useState<DailyReport[]>(() => loadData('reports', MOCK_REPORTS));

  const [user, setUser] = useState<User | null>(() => loadData('currentUser', null));
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [showLoginPrompt, setShowLoginPrompt] = useState(true);
  const [loginUserId, setLoginUserId] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => { saveData('users', users); }, [users]);
  useEffect(() => { saveData('projects', projects); }, [projects]);
  useEffect(() => { saveData('tasks', tasks); }, [tasks]);
  useEffect(() => { saveData('reports', reports); }, [reports]);

  useEffect(() => {
    saveData('currentUser', user);
    if (user) {
      setShowLoginPrompt(false);
      setActiveView(user.role === UserRole.OWNER ? 'dashboard' : 'engineer-dashboard');
    } else {
      setShowLoginPrompt(true);
      setLoginUserId('');
    }
  }, [user]);

  const handleLoginAttempt = (customId?: string) => {
    const idToUse = (customId || loginUserId).toLowerCase().trim();
    const foundUser = users.find(u => u.username === idToUse); 
    if (foundUser) {
      setUser(foundUser);
      setLoginError('');
    } else {
      setLoginError('Authentication failed. Check your username and try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-900/20 rounded-full blur-[120px]" />
        
        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-xl shadow-emerald-900/20">
              <Construction className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              MATRIX <span className="text-emerald-500">CONST</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium uppercase tracking-[0.2em] text-[10px]">Infrastructure Management</p>
          </div>

          {showLoginPrompt ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="group w-full bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-emerald-500/50 transition-all text-left flex items-center gap-6"
              >
                <div className="p-4 rounded-2xl bg-emerald-600 text-white group-hover:scale-110 transition-transform">
                  <ShieldCheck size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">Access Portal</h3>
                  <p className="text-sm text-slate-400">Authorized personnel only</p>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-emerald-500" />
              </button>

              <div className="bg-slate-800/30 border border-white/5 rounded-3xl p-6 mt-8">
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-4">
                   <Info size={14} /> Quick Demo Access
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <button 
                    onClick={() => handleLoginAttempt('jane.smith')}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-slate-300 font-bold flex flex-col items-center gap-2 transition-colors"
                   >
                     <UserIcon size={16} className="text-blue-400" />
                     Owner View
                   </button>
                   <button 
                    onClick={() => handleLoginAttempt('amit.s')}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-slate-300 font-bold flex flex-col items-center gap-2 transition-colors"
                   >
                     <HardHat size={16} className="text-amber-400" />
                     Engineer View
                   </button>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-8">
                <span className="h-[1px] w-8 bg-slate-800" />
                Safety First • Quality Always
                <span className="h-[1px] w-8 bg-slate-800" />
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <UserIcon className="text-emerald-500" size={20} />
                <h2 className="text-lg font-bold text-white">Personnel Login</h2>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                <input
                  type="text"
                  autoFocus
                  value={loginUserId}
                  onChange={(e) => {
                    setLoginUserId(e.target.value);
                    setLoginError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleLoginAttempt()}
                  placeholder="e.g. john.doe"
                  className="w-full p-4 bg-slate-900/50 border border-white/5 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all placeholder:text-slate-600"
                />
                {loginError && <p className="text-red-400 text-xs mt-3 flex items-center gap-1"><ShieldCheck size={12} /> {loginError}</p>}
              </div>

              <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                <p className="text-[10px] text-emerald-400/80 leading-relaxed italic">
                  *By logging in, you confirm you are currently on-site or authorized for remote reporting.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLoginPrompt(true)}
                  className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => handleLoginAttempt()}
                  className="flex-[2] bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn size={18} /> Enter Site
                </button>
              </div>
            </div>
          )}
          
          <p className="text-center text-slate-600 text-[10px] mt-12 font-medium tracking-widest uppercase">
            Matrix Constructions © 2024 Portal v2.0
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    setSelectedProjectId(null);
  };

  const handleSubmitReport = (newReport: Partial<DailyReport>) => {
    const report = { ...newReport, id: `r${reports.length + 1}` } as DailyReport;
    setReports([report, ...reports]);
  };

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const renderContent = () => {
    if (selectedProjectId) {
      const proj = projects.find(p => p.id === selectedProjectId)!;
      return (
        <div>
          <button onClick={() => setSelectedProjectId(null)} className="mb-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:shadow-sm transition-all flex items-center gap-2 font-medium">
            ← Return to Dashboard
          </button>
          <LazyProjectDetail project={proj} tasks={tasks} reports={reports} user={user} onAddTask={handleAddTask} />
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <LazyDashboard projects={projects} reports={reports} tasks={tasks} users={users} />;
      case 'projects':
      case 'engineer-dashboard':
        const filteredProjects = user.role === UserRole.OWNER 
          ? projects 
          : projects.filter(p => p.engineerIds.includes(user.id));
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(p => (
              <div 
                key={p.id} 
                onClick={() => setSelectedProjectId(p.id)}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/30 cursor-pointer transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-emerald-100" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Construction size={20} />
                     </div>
                     <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase tracking-widest">{p.location.split(',')[0]}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      <span>Deadline: {new Date(p.targetEndDate).toLocaleDateString()}</span>
                      <span className="text-emerald-600">{p.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'daily-update':
        const engProjects = projects.filter(p => p.engineerIds.includes(user.id));
        return <LazyEngineerPortal user={user} projects={engProjects} tasks={tasks} onSubmitReport={handleSubmitReport} />;
      case 'attendance':
        return (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                   <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Engineer</th>
                   <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Last Report</th>
                   <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                   <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Location</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {users.filter(u => u.role === UserRole.ENGINEER).map((eng, idx) => {
                    const latestReport = reports.find(r => r.engineerId === eng.id);
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{eng.name.charAt(0)}</div>
                            <span className="font-bold text-slate-900">{eng.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-500">{latestReport?.date || 'Never'}</td>
                        <td className="px-8 py-5">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${latestReport?.present ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                             {latestReport?.present ? 'ON SITE' : 'OFF SITE'}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                          {projects.find(p => p.id === latestReport?.projectId)?.location || 'Unassigned'}
                        </td>
                      </tr>
                    )
                 })}
               </tbody>
             </table>
          </div>
        );
      case 'reports':
        return (
          <div className="grid grid-cols-1 gap-6">
            {reports.map((report, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{projects.find(p => p.id === report.projectId)?.name}</h3>
                      <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <HardHat size={14} /> Reported by {users.find(u => u.id === report.engineerId)?.name} • {report.date}
                      </p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${report.present ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {report.present ? 'PRESENT' : 'ABSENT'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <p className="text-slate-700 text-sm leading-relaxed">{report.notes}</p>
                  </div>
                </div>
                {report.photos.length > 0 && (
                  <div className="md:w-64 flex gap-3 overflow-x-auto md:grid md:grid-cols-2">
                    {report.photos.map((ph, i) => (
                      <img key={i} src={ph} className="w-32 h-32 md:w-full md:h-28 rounded-xl object-cover border border-white shadow-sm ring-1 ring-slate-100" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'my-timeline':
        const engineerProjects = projects.filter(p => p.engineerIds.includes(user.id));
        if (engineerProjects.length === 0) return <div className="py-20 text-center text-slate-400 font-medium">No projects assigned to your profile.</div>;
        return <LazyProjectDetail project={engineerProjects[0]} tasks={tasks} reports={reports} user={user} onAddTask={handleAddTask} />;
      default:
        return <div className="text-slate-400">Section under development.</div>;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} activeView={activeView} setActiveView={(v) => { setSelectedProjectId(null); setActiveView(v); }}>
      <Suspense fallback={<div className="h-[60vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin" /></div>}>
        {renderContent()}
      </Suspense>
    </Layout>
  );
};

export default App;
