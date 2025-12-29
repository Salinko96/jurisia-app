import { AuditLog } from '../types';

const AUDIT_STORAGE_KEY = 'juris_ia_audit_logs_v4';

export const AuditService = {
  /**
   * Enregistre une action sensible dans le journal d'audit
   */
  async log(userId: string, action: string, targetId: string, metadata?: any): Promise<void> {
    const logs = JSON.parse(localStorage.getItem(AUDIT_STORAGE_KEY) || '[]');
    
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 12).toUpperCase(),
      userId,
      action,
      targetId,
      timestamp: new Date(),
      metadata: {
        ...metadata,
        platform: navigator.platform,
        userAgent: navigator.userAgent
      }
    };

    logs.push(newLog);
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(logs.slice(-2000))); // Garde un historique plus long
    console.debug(`[AUDIT_RELATIONAL] ${action} | User: ${userId} | Target: ${targetId}`);
  },

  async getLogs(userId: string): Promise<AuditLog[]> {
    const logs = JSON.parse(localStorage.getItem(AUDIT_STORAGE_KEY) || '[]');
    return logs
      .filter((l: any) => l.userId === userId)
      .map((l: any) => ({ ...l, timestamp: new Date(l.timestamp) }))
      .sort((a: any, b: any) => b.timestamp.getTime() - a.timestamp.getTime());
  }
};