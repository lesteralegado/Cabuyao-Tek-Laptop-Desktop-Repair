import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { addRepairNote, getRepairNotes } from '../../services/repairService';
import { useAuth } from '../../contexts/AuthContext';
import type { RepairNote } from '../../types/repair';

interface StaffNotesProps {
  repairId: string;
  onNotesUpdated: () => void;
}

const StaffNotes: React.FC<StaffNotesProps> = ({ repairId, onNotesUpdated }) => {
  const { profile } = useAuth();
  const [notes, setNotes] = useState<RepairNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const data = await getRepairNotes(repairId);
      setNotes(data);
    } catch (err) {
      setError('Unable to load staff notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [repairId]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !profile?.id) return;

    setSaving(true);
    setError(null);
    try {
      await addRepairNote(repairId, profile.id, newNote.trim());
      setNewNote('');
      await fetchNotes();
      onNotesUpdated();
    } catch (err) {
      setError('Unable to add note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
        <p className="text-sm text-gray-500 mt-2">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <MessageSquare className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Staff Notes</h3>
      </div>

      <form onSubmit={handleAddNote} className="space-y-3">
        <div className="relative">
          <textarea
            className="w-full p-4 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 resize-none"
            placeholder="Add internal note..."
            rows={3}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button
            type="submit"
            disabled={!newNote.trim() || saving}
            className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
        {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
      </form>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500 italic text-center py-4">No staff notes yet.</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Staff Note</span>
                <span className="text-xs text-gray-400">{new Date(note.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{note.note}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StaffNotes;
