
import { supabase } from './supabase';
import { Dossier, LegalDocument, AnalysisResult } from '../types';

export const StorageService = {
  async getDossiers(userId: string): Promise<Dossier[]> {
    const { data, error } = await supabase
      .from('dossiers')
      .select(`
        *,
        documents (
          *,
          analysis_results (*)
        )
      `)
      .eq('owner_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map((d: any) => ({
      ...d,
      createdAt: new Date(d.created_at),
      documents: d.documents.map((doc: any) => ({
        ...doc,
        createdAt: new Date(doc.created_at),
        analysisResults: doc.analysis_results.map((ana: any) => ({
          ...ana,
          timestamp: new Date(ana.timestamp)
        }))
      }))
    }));
  },

  async addDossier(userId: string, dossier: Partial<Dossier>): Promise<Dossier> {
    const { data, error } = await supabase
      .from('dossiers')
      .insert([{
        owner_id: userId,
        title: dossier.title,
        client: dossier.client,
        domain: dossier.domain,
        status: 'Ouvert'
      }])
      .select()
      .single();

    if (error) throw error;
    return { ...data, createdAt: new Date(data.created_at) };
  },

  async uploadFile(userId: string, dossierId: string, file: File): Promise<string> {
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const path = `${userId}/${dossierId}/${timestamp}_${cleanName}`;
    
    const { error } = await supabase.storage
      .from('jurisia-docs')
      .upload(path, file);

    if (error) throw error;
    return path;
  },

  async addDocument(userId: string, dossierId: string, doc: { name: string, fileSize: number, fileType: string, path: string }): Promise<LegalDocument> {
    const { data, error } = await supabase
      .from('documents')
      .insert([{
        dossier_id: dossierId,
        uploaded_by: userId,
        name: doc.name,
        storage_path: doc.path,
        file_type: doc.fileType,
        file_size: doc.fileSize
      }])
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      createdAt: new Date(data.created_at)
    };
  },

  async saveAnalysis(userId: string, documentId: string, analysis: any): Promise<AnalysisResult> {
    const { data, error } = await supabase
      .from('analysis_results')
      .insert([{
        document_id: documentId,
        summary: analysis.summary,
        clauses: analysis.clauses || [],
        risks: analysis.risks || [],
        recommendations: analysis.recommendations || [],
        checklist: analysis.checklist || [],
      }])
      .select()
      .single();

    if (error) throw error;
    return {
        ...data,
        timestamp: new Date(data.timestamp)
    };
  }
};
