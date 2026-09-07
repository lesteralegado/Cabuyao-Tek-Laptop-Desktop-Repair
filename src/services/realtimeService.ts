import { supabase } from '../lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();
  private statusCallback: ((status: 'connected' | 'disconnected' | 'connecting') => void) | null = null;

  async subscribeToRepairs(callback: (payload: any) => void) {
    const channelKey = 'repairs-all';
    if (this.channels.has(channelKey)) return;

    const channel = supabase
      .channel(channelKey)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'repair_requests',
        },
        (payload) => callback(payload)
      )
      .subscribe((status) => {
        this.handleStatusChange(status);
      });

    this.channels.set(channelKey, channel);
    return channel;
  }

  async subscribeToRepairDetails(
    repairId: string,
    callbacks: {
      onRepair: (payload: any) => void;
      onHistory: (payload: any) => void;
      onNotes: (payload: any) => void;
    }
  ) {
    const channelKey = `repair-${repairId}`;
    if (this.channels.has(channelKey)) return;

    const channel = supabase
      .channel(channelKey)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'repair_requests',
          filter: `id=eq.${repairId}`,
        },
        (payload) => callbacks.onRepair(payload)
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'repair_history',
          filter: `repair_request_id=eq.${repairId}`,
        },
        (payload) => callbacks.onHistory(payload)
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'repair_notes',
          filter: `repair_request_id=eq.${repairId}`,
        },
        (payload) => callbacks.onNotes(payload)
      )
      .subscribe();

    this.channels.set(channelKey, channel);
    return channel;
  }

  unsubscribe(channelKey: string) {
    const channel = this.channels.get(channelKey);
    if (channel) {
      supabase.removeChannel(channel);
      this.channels.delete(channelKey);
    }
  }

  setOnStatusChange(callback: (status: 'connected' | 'disconnected' | 'connecting') => void) {
    this.statusCallback = callback;
  }

  private handleStatusChange(status: any) {
    let normalizedStatus: 'connected' | 'disconnected' | 'connecting' = 'connecting';

    if (status === 'SUBSCRIBED') normalizedStatus = 'connected';
    else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') normalizedStatus = 'disconnected';
    else normalizedStatus = 'connecting';

    if (this.statusCallback) {
      this.statusCallback(normalizedStatus);
    }
  }
}

export const realtimeService = new RealtimeService();
