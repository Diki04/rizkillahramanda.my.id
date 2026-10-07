import { supabase, isSupabaseConfigured } from './client';
import { mockProjects } from '@/services/data/mock-projects';
import { mockAchievements } from '@/services/data/mock-achievements';
import { Project, Achievement, ChatMessage } from '@/types';

export const dataProvider = {
  // Projects
  async getProjects(): Promise<Project[]> {
    if (!isSupabaseConfigured || !supabase) {
      return mockProjects;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error || !data || data.length === 0) {
        return mockProjects;
      }

      return data as Project[];
    } catch {
      return mockProjects;
    }
  },

  async saveProject(project: Project): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('projects')
        .upsert(project, { onConflict: 'id' });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to save project' };
    }
  },

  async deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to delete project' };
    }
  },

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    if (!isSupabaseConfigured || !supabase) {
      return mockAchievements;
    }

    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('issueDate', { ascending: false });

      if (error || !data || data.length === 0) {
        return mockAchievements;
      }

      return data as Achievement[];
    } catch {
      return mockAchievements;
    }
  },

  async saveAchievement(achievement: Achievement): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('achievements')
        .upsert(achievement, { onConflict: 'id' });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to save achievement' };
    }
  },

  async deleteAchievement(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('achievements').delete().eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to delete achievement' };
    }
  },

  // Guestbook Messages
  async getMessages(): Promise<ChatMessage[]> {
    const fallbackMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        name: 'Satria Bahari',
        message: 'Keren banget portofolionya! Keep inspiring bro!',
        createdAt: '2026-10-06T10:30:00Z',
      },
      {
        id: 'msg-2',
        name: 'Teman UNRI',
        message: 'Semangat terus kuliah Teknik Informatikanya!',
        createdAt: '2026-10-05T14:20:00Z',
      },
    ];

    if (!isSupabaseConfigured || !supabase) {
      return fallbackMessages;
    }

    try {
      const { data, error } = await supabase
        .from('guestbook_messages')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(50);

      if (error || !data || data.length === 0) {
        return fallbackMessages;
      }

      return data as ChatMessage[];
    } catch {
      return fallbackMessages;
    }
  },

  async postMessage(msg: Omit<ChatMessage, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: ChatMessage; error?: string }> {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      message: msg.message,
      createdAt: new Date().toISOString(),
    };

    if (!isSupabaseConfigured || !supabase) {
      return { success: true, data: newMsg };
    }

    try {
      const { error } = await supabase
        .from('guestbook_messages')
        .insert([newMsg]);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: newMsg };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  async deleteMessage(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('guestbook_messages')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
