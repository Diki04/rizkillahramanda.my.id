import { supabase, isSupabaseConfigured } from './client';
import { mockProjects } from '@/services/data/mock-projects';
import { mockAchievements } from '@/services/data/mock-achievements';
import { Project, Achievement, ChatMessage } from '@/types';

// In-memory messages store when database is offline or not configured (defaults to 100% empty)
const localMessages: ChatMessage[] = [];

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

  // Guestbook Messages (100% authentic data, zero mock seeds)
  async getMessages(): Promise<ChatMessage[]> {
    if (!isSupabaseConfigured || !supabase) {
      return [...localMessages];
    }

    try {
      const { data, error } = await supabase
        .from('guestbook_messages')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(50);

      if (error || !data) {
        return [];
      }

      return data as ChatMessage[];
    } catch {
      return [];
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
      localMessages.unshift(newMsg);
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
      const idx = localMessages.findIndex((m) => m.id === id);
      if (idx !== -1) {
        localMessages.splice(idx, 1);
      }
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
