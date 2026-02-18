
import React, { useState, useEffect } from 'react';
import { Project, Task, DailyReport, User, TaskStatus } from '../types';
import { Camera, Send, CheckCircle, AlertTriangle, X, MapPin, Loader2, RefreshCw } from 'lucide-react'; // Added MapPin, Loader2, RefreshCw

interface EngineerPortalProps {
  user: User;
  projects: Project[];
  tasks: Task[];
  onSubmitReport: (report: Partial<DailyReport>) => void;
}

const EngineerPortal: React.FC<EngineerPortalProps> = ({ user, projects, tasks, onSubmitReport }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [attendance, setAttendance] = useState<boolean>(true);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [updatedTaskIds, setUpdatedTaskIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Geolocation states
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'getting' | 'success' | 'failed'>('idle');

  // Filter tasks for the selected project, excluding already completed ones
  const currentProjectTasks = tasks.filter(t => t.projectId === selectedProjectId && t.status !== TaskStatus.COMPLETED);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('failed');
      console.error('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('getting');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus('success');
      },
      (error) => {
        console.error('Error getting location:', error);
        setCurrentLocation(null); // Clear location on error
        setLocationStatus('failed');
        // Provide more user-friendly error messages based on error.code
        let errorMessage = 'Failed to get location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location access denied. Please enable it in your browser settings.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'The request to get user location timed out.';
        }
        console.error(errorMessage);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    // Attempt to get location when the component mounts
    getLocation();
  }, []); // Empty dependency array means this runs once on mount

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  // Helper to check if all dependencies for a given task are met (completed)
  const areDependenciesMet = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.dependsOn || task.dependsOn.length === 0) {
      return true; // No dependencies, or task not found, so considered met
    }
    return task.dependsOn.every(depId => {
      const depTask = tasks.find(t => t.id === depId);
      return depTask && depTask.status === TaskStatus.COMPLETED;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Include location data if successfully captured
    const reportToSubmit: Partial<DailyReport> = {
      projectId: selectedProjectId,
      engineerId: user.id,
      date: new Date().toISOString().split('T')[0],
      present: attendance,
      notes,
      photos,
      tasksUpdated: updatedTaskIds,
      ...(currentLocation && { latitude: currentLocation.latitude, longitude: currentLocation.longitude })
    };

    setTimeout(() => {
      onSubmitReport(reportToSubmit);
      setSubmitting(false);
      setSuccess(true);
      // Reset form
      setNotes('');
      setPhotos([]);
      setUpdatedTaskIds([]);
      setCurrentLocation(null); // Clear location on successful submission
      setLocationStatus('idle'); // Reset location status
    }, 1500);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Update Submitted!</h2>
        <p className="text-slate-500 mb-6">Your daily log has been sent to the owner for review. Thank you for your hard work.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="w-full bg-emerald-950 text-white font-bold py-3 rounded-xl hover:bg-emerald-900 transition-colors"
        >
          Add Another Log
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-4">Site Engineer Daily Update</h2>
        
        {/* Project Selection */}
        <div>
          <label htmlFor="project-select" className="block text-sm font-semibold text-slate-700 mb-2">Project Site</label>
          <select 
            id="project-select"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name} — {p.location}</option>
            ))}
          </select>
        </div>

        {/* Attendance & Location */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">Attendance Status</p>
              <p className="text-xs text-slate-500">Are you on-site today?</p>
            </div>
            <button
              type="button"
              onClick={() => setAttendance(!attendance)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                attendance ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {attendance ? 'PRESENT' : 'ABSENT'}
            </button>
          </div>
          
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-teal-600" />
              <p className="font-semibold text-slate-800">Current Location</p>
            </div>
            {locationStatus === 'getting' && (
              <p className="text-sm text-blue-600 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Getting location...
              </p>
            )}
            {locationStatus === 'success' && currentLocation && (
              <p className="text-sm text-emerald-600">
                Lat: {currentLocation.latitude.toFixed(4)}, Long: {currentLocation.longitude.toFixed(4)}
                <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">CAPTURED</span>
              </p>
            )}
            {locationStatus === 'failed' && (
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertTriangle size={16} /> Failed to get location.
              </p>
            )}
            <button
              type="button"
              onClick={getLocation}
              disabled={locationStatus === 'getting'}
              className="w-full mt-2 py-2 px-4 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} /> Re-capture Location
            </button>
          </div>
        </div>


        {/* Tasks Checklist */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Work Areas Updated</label>
          <div className="grid grid-cols-1 gap-2">
            {currentProjectTasks.length === 0 ? (
              <p className="text-sm text-slate-500 p-3 bg-slate-50 rounded-lg border border-slate-100">No active tasks for this project.</p>
            ) : (
              currentProjectTasks.map(task => {
                const depsMet = areDependenciesMet(task.id);
                return (
                  <label 
                    key={task.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg border border-slate-100 transition-colors ${
                      depsMet ? 'hover:bg-emerald-50 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={updatedTaskIds.includes(task.id)}
                      onChange={(e) => {
                        if (e.target.checked) setUpdatedTaskIds([...updatedTaskIds, task.id]);
                        else setUpdatedTaskIds(updatedTaskIds.filter(id => id !== task.id));
                      }}
                      disabled={!depsMet}
                      className="w-5 h-5 rounded text-teal-600 border-slate-300 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className={`text-sm font-medium ${depsMet ? 'text-slate-700' : 'text-slate-400'}`}>
                      {task.name} ({task.milestone})
                    </span>
                    {!depsMet && (
                      <span className="ml-auto text-xs text-red-600 flex items-center gap-1">
                        <AlertTriangle size={14} /> Dependencies Pending
                      </span>
                    )}
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Daily Log Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">Work Description / Progress Notes</label>
          <textarea
            id="notes"
            required
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe what was accomplished today, materials received, or any issues encountered..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none h-32"
          />
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Site Photos</label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {photos.map((src, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200">
                <img src={src} className="w-full h-full object-cover" alt={`Site photo ${i + 1}`} />
                <button 
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl hover:bg-emerald-50 hover:border-teal-300 cursor-pointer transition-all">
              <Camera className="text-slate-400 mb-1" size={24} />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Add Photo</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-100 transition-all flex items-center justify-center gap-2"
        >
          {submitting ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={18} />
              Submit Daily Update
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EngineerPortal;