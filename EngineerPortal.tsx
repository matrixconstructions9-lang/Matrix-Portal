
import React, { useState, useEffect } from 'react';
import { Project, Task, DailyReport, TaskStatus, User, UserRole } from '../types';
import { Calendar, MapPin, Clock, BrainCircuit, CheckCircle2, Circle, Filter, X, PlusCircle } from 'lucide-react';
import { analyzeProjectDelays } from '../geminiService';

interface ProjectDetailProps {
  project: Project;
  tasks: Task[];
  reports: DailyReport[];
  user: User; // Added user prop
  onAddTask: (task: Task) => void; // Added onAddTask prop
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, tasks, reports, user, onAddTask }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'ALL'>('ALL');
  
  const [showAddTaskModal, setShowAddTaskModal] = useState(false); // State for modal visibility
  const [newTask, setNewTask] = useState<Partial<Task>>({
    projectId: project.id,
    status: TaskStatus.NOT_STARTED,
    dependsOn: [],
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const projectReports = reports.filter(r => r.projectId === project.id);

  const handleAIAnalysis = async () => {
    setAnalyzing(true);
    const result = await analyzeProjectDelays(project, projectTasks, projectReports);
    setAiAnalysis(result || "No insights found.");
    setAnalyzing(false);
  };

  const milestones = ['Foundation', 'Structure', 'Finishing', 'Handover'] as const;

  const filters: { label: string; value: TaskStatus | 'ALL' }[] = [
    { label: 'All Tasks', value: 'ALL' },
    { label: 'In Progress', value: TaskStatus.IN_PROGRESS },
    { label: 'Delayed', value: TaskStatus.DELAYED },
    { label: 'Completed', value: TaskStatus.COMPLETED },
    { label: 'Not Started', value: TaskStatus.NOT_STARTED },
  ];

  // Fix: Using e.currentTarget for better type inference in React event handlers.
  // currentTarget is preferred over target as it refers to the element the listener is attached to.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setNewTask(prev => ({ ...prev, [name]: value }));
    setValidationErrors(prev => ({ ...prev, [name]: undefined })); // Clear error on change
  };

  // Fix: Corrected type handling for selectedOptions to avoid 'unknown' or 'any' issues.
  const handleDependencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget;
    const selectedOptions = Array.from(target.selectedOptions).map((option: HTMLOptionElement) => option.value);
    setNewTask(prev => ({ ...prev, dependsOn: selectedOptions }));
  };

  const validateForm = () => {
    const errors: Record<string, string | undefined> = {}; // Use string | undefined here too for local validation
    if (!newTask.name) errors.name = 'Task name is required.';
    if (!newTask.milestone) errors.milestone = 'Milestone is required.';
    if (!newTask.startDate) errors.startDate = 'Start date is required.';
    if (!newTask.endDate) errors.endDate = 'End date is required.';

    if (newTask.startDate && newTask.endDate) {
      const start = new Date(newTask.startDate);
      const end = new Date(newTask.endDate);
      if (start > end) {
        errors.endDate = 'End date cannot be before start date.';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Generate a simple unique ID for mock data
    const newId = `t${tasks.length + 1}`; 
    
    const taskToAdd: Task = {
      ...newTask as Task, // Cast to Task, assuming validation ensures all required fields are present
      id: newId,
      projectId: project.id,
      status: TaskStatus.NOT_STARTED,
      // Ensure dependsOn is an array, even if empty
      dependsOn: newTask.dependsOn && newTask.dependsOn.length > 0 ? newTask.dependsOn : undefined,
    };

    onAddTask(taskToAdd);
    setShowAddTaskModal(false);
    setNewTask({ projectId: project.id, status: TaskStatus.NOT_STARTED, dependsOn: [] }); // Reset form
    setValidationErrors({}); // Clear errors
  };

  const availableDependencyTasks = projectTasks.filter(t => t.id !== (newTask.id || '')); // Cannot depend on self

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Project Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{project.name}</h2>
          <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
            <span className="flex items-center gap-1"><MapPin size={16} /> {project.location}</span>
            <span className="flex items-center gap-1"><Calendar size={16} /> Started: {project.startDate}</span>
            <span className="flex items-center gap-1"><Clock size={16} /> Target: {project.targetEndDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none">
            <div className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">Overall Progress</div>
            <div className="w-full md:w-48 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
          <div className="text-2xl font-bold text-teal-600">{project.progress}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline (Gantt-style) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="text-teal-600" /> Project Timeline
              </h3>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-slate-400 mr-2">
                  <Filter size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Filter by Status:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'ALL')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors cursor-pointer"
                >
                  {filters.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-8">
              {milestones.map((milestone) => {
                const milestoneTasks = projectTasks.filter(t => 
                  t.milestone === milestone && 
                  (statusFilter === 'ALL' || t.status === statusFilter)
                );

                if (milestoneTasks.length === 0) return null;
                
                const isMilestoneDone = projectTasks
                  .filter(t => t.milestone === milestone)
                  .every(t => t.status === TaskStatus.COMPLETED);

                return (
                  <div key={milestone} className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-1.5 rounded-full ${isMilestoneDone ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                        {isMilestoneDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </div>
                      <h4 className="font-bold text-slate-700 uppercase tracking-wide text-xs">{milestone}</h4>
                    </div>
                    
                    <div className="ml-5 pl-8 border-l-2 border-slate-100 space-y-4">
                      {milestoneTasks.map((task) => (
                        <div key={task.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-200">
                          <div className="flex-1"> {/* Added flex-1 for better layout with dependencies */}
                            <p className="font-semibold text-slate-800">{task.name}</p>
                            <p className="text-xs text-slate-500">{task.startDate} — {task.endDate}</p>
                            {task.dependsOn && task.dependsOn.length > 0 && (
                              <div className="mt-2 text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="font-semibold text-slate-700">Depends on:</span>
                                {task.dependsOn.map(depTaskId => {
                                  const depTask = projectTasks.find(t => t.id === depTaskId);
                                  if (!depTask) return null; 
                                  const isDepCompleted = depTask.status === TaskStatus.COMPLETED;
                                  return (
                                    <span key={depTask.id} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${isDepCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                      {isDepCompleted ? <CheckCircle2 size={10} /> : <Clock size={10} />} {depTask.name}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter ${
                            task.status === TaskStatus.COMPLETED ? 'bg-emerald-100 text-emerald-700' :
                            task.status === TaskStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-700' :
                            task.status === TaskStatus.DELAYED ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {task.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Empty state if no tasks match filter */}
              {projectTasks.filter(t => (statusFilter === 'ALL' || t.status === statusFilter)).length === 0 && (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                  <div className="p-4 bg-slate-50 rounded-full mb-4">
                    <X size={24} />
                  </div>
                  <p className="text-sm">
                    No tasks found 
                    {statusFilter !== 'ALL' && ` with the status "${filters.find(f => f.value === statusFilter)?.label}"`}
                    .
                  </p>
                  {statusFilter !== 'ALL' && (
                    <button 
                      onClick={() => setStatusFilter('ALL')}
                      className="mt-4 text-teal-600 text-xs font-bold uppercase hover:underline"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Add new task button (Owner only) */}
          {user.role === UserRole.OWNER && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Manage Tasks</h3>
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <PlusCircle size={18} /> Add New Task
              </button>
            </div>
          )}
        </div>

        {/* AI Analysis Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-950 to-teal-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <BrainCircuit size={80} />
            </div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 relative z-10">
               AI Progress Review
            </h3>
            <p className="text-teal-100/60 text-sm mb-6 relative z-10">Analyze delays and risks using Matrix Gemini Engine.</p>
            
            {aiAnalysis ? (
              <div className="bg-teal-950/40 p-4 rounded-lg text-sm leading-relaxed text-teal-50 border border-teal-800 mb-4 animate-in fade-in slide-in-from-bottom-2">
                {aiAnalysis}
              </div>
            ) : (
              <div className="bg-teal-950/40 p-8 rounded-lg flex flex-col items-center justify-center text-teal-200/20 border border-dashed border-teal-800 mb-4">
                <BrainCircuit size={32} className="mb-2 opacity-20" />
                <p className="text-xs italic">Run analysis to see insights</p>
              </div>
            )}
            
            <button
              onClick={handleAIAnalysis}
              disabled={analyzing}
              className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BrainCircuit size={18} />
                  Run Delay Analysis
                </>
              )}
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-md font-bold mb-4 text-slate-800">Assigned Engineers</h3>
            <div className="flex -space-x-2">
               {[1, 2].map((i) => (
                 <img key={i} src={`https://picsum.photos/seed/${i + 10}/32/32`} className="w-10 h-10 rounded-full border-2 border-white" />
               ))}
               <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-400">+1</div>
            </div>
            <p className="mt-4 text-sm text-slate-500">Amit Sharma (Primary), Rahul Verma</p>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 animate-in fade-in zoom-in-95">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Add New Project Task</h3>
            <form onSubmit={handleAddTaskSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Task Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newTask.name || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="milestone" className="block text-sm font-medium text-slate-700 mb-1">Milestone</label>
                <select
                  id="milestone"
                  name="milestone"
                  value={newTask.milestone || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="">Select Milestone</option>
                  {milestones.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                {validationErrors.milestone && <p className="text-red-500 text-xs mt-1">{validationErrors.milestone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={newTask.startDate || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  {validationErrors.startDate && <p className="text-red-500 text-xs mt-1">{validationErrors.startDate}</p>}
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={newTask.endDate || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  {validationErrors.endDate && <p className="text-red-500 text-xs mt-1">{validationErrors.endDate}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="dependsOn" className="block text-sm font-medium text-slate-700 mb-1">Dependencies (Optional)</label>
                <select
                  id="dependsOn"
                  name="dependsOn"
                  multiple
                  value={newTask.dependsOn || []}
                  onChange={handleDependencyChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none h-24"
                >
                  {availableDependencyTasks.map(task => (
                    <option key={task.id} value={task.id}>{task.name}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">Hold Ctrl/Cmd to select multiple tasks.</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddTaskModal(false);
                    setNewTask({ projectId: project.id, status: TaskStatus.NOT_STARTED, dependsOn: [] }); // Reset form on cancel
                    setValidationErrors({}); // Clear errors on cancel
                  }}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition-colors font-bold"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
