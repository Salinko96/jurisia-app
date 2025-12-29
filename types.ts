
export enum View {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  ASSISTANT = 'ASSISTANT',
  DOSSIERS = 'DOSSIERS',
  MODELS = 'MODELS',
  CALCULATOR = 'CALCULATOR',
  ANALYZER = 'ANALYZER',
  REGISTRATION = 'REGISTRATION',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  PROFILE = 'PROFILE'
}

export type UserRole = 'avocat' | 'entreprise' | 'particulier' | 'admin';
export type UserStatus = 'actif' | 'en_attente' | 'suspendu';

export interface User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  role: UserRole;
  joinedDate: Date;
  status: UserStatus;
  avatar?: string;
  firmName?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LegalDocument {
  id: string;
  dossierId: string;
  name: string;
  storagePath: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  createdAt: Date;
  analysisResults?: AnalysisResult[];
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  targetId: string;
  timestamp: Date;
  metadata?: any;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  sources?: GroundingSource[];
  isThinking?: boolean;
}

export interface AnalysisResult {
  id: string;
  documentId: string;
  title?: string;
  summary: string;
  clauses: string[];
  risks: string[];
  recommendations: string[];
  checklist: string[];
  timestamp: Date;
}

export interface CalculationResult {
  id: string;
  label: string;
  startDate: string;
  resultDate: string;
  timestamp: Date;
}

export interface Dossier {
  id: string;
  ownerId: string;
  title: string;
  client: string;
  domain: string;
  status: 'Ouvert' | 'Fermé' | 'Archivé';
  createdAt: Date;
  documents?: LegalDocument[];
  calculationResults?: CalculationResult[];
}

export interface UserRegistration {
  id: string;
  name: string;
  email: string;
  role: 'Avocat' | 'Entreprise' | 'Particulier' | 'Étudiant';
  status: 'Vérifié' | 'En attente' | 'Bloqué';
  date: Date;
  progress: number;
}

export interface LegalModel {
  id: string;
  name: string;
  category: string;
  description: string;
}

export enum LegalDomain {
  TRAVAIL = 'Droit du Travail',
  CIVIL = 'Droit Civil',
  AFFAIRES = 'Droit des Affaires',
  IMMOBILIER = 'Droit Immobilier',
  PENAL = 'Droit Pénal',
  PUBLIC = 'Droit Public'
}
