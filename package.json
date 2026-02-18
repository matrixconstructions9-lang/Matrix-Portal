
import { Project, Task, User, UserRole, TaskStatus, DailyReport } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'john.doe', name: 'John Doe (Admin)', role: UserRole.OWNER, assignedProjectIds: [] },
  { id: 'u4', username: 'jane.smith', name: 'Jane Smith (Owner)', role: UserRole.OWNER, assignedProjectIds: [] },
  { id: 'u2', username: 'amit.s', name: 'Amit Sharma', role: UserRole.ENGINEER, assignedProjectIds: ['p1'] },
  { id: 'u5', username: 'david.l', name: 'David Lee', role: UserRole.ENGINEER, assignedProjectIds: ['p1'] },
  { id: 'u3', username: 'rahul.v', name: 'Rahul Verma', role: UserRole.ENGINEER, assignedProjectIds: ['p2'] },
  { id: 'u6', username: 'emily.c', name: 'Emily Chen', role: UserRole.ENGINEER, assignedProjectIds: ['p2'] },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Skyline Heights Phase 1',
    location: 'Worli, Mumbai',
    startDate: '2024-01-10',
    targetEndDate: '2025-06-30',
    progress: 45,
    engineerIds: ['u2', 'u5'], // Assign u5 to p1
  },
  {
    id: 'p2',
    name: 'Green Valley Villas',
    location: 'Lonavala, Pune',
    startDate: '2024-03-01',
    targetEndDate: '2024-12-15',
    progress: 15,
    engineerIds: ['u3', 'u6'], // Assign u6 to p2
  },
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', projectId: 'p1', name: 'Excavation', milestone: 'Foundation', startDate: '2024-01-10', endDate: '2024-02-15', status: TaskStatus.COMPLETED },
  { id: 't2', projectId: 'p1', name: 'RCC Footing', milestone: 'Foundation', startDate: '2024-02-16', endDate: '2024-03-20', status: TaskStatus.COMPLETED },
  { id: 't3', projectId: 'p1', name: 'Slab Casting - Floor 1', milestone: 'Structure', startDate: '2024-04-01', endDate: '2024-05-10', status: TaskStatus.IN_PROGRESS, dependsOn: ['t2'] },
  { id: 't4', projectId: 'p1', name: 'Brickwork - Floor 1', milestone: 'Finishing', startDate: '2024-05-15', endDate: '2024-06-30', status: TaskStatus.NOT_STARTED, dependsOn: ['t3'] },
  { id: 't5', projectId: 'p2', name: 'Site Clearing', milestone: 'Foundation', startDate: '2024-03-01', endDate: '2024-03-10', status: TaskStatus.COMPLETED },
  { id: 't6', projectId: 'p2', name: 'Leveling', milestone: 'Foundation', startDate: '2024-03-11', endDate: '2024-03-20', status: TaskStatus.IN_PROGRESS, dependsOn: ['t5'] },
];

export const MOCK_REPORTS: DailyReport[] = [
  {
    id: 'r1',
    projectId: 'p1',
    engineerId: 'u2',
    date: '2024-05-14',
    present: true,
    notes: 'Slab reinforcement checking complete. Concreting scheduled for tomorrow.',
    photos: ['https://picsum.photos/seed/const1/400/300'],
    tasksUpdated: ['t3'],
    latitude: 19.0176, // Example coordinates for Mumbai (Worli)
    longitude: 72.8561
  }
];