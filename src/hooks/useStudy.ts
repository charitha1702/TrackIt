import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface StudySubject {
  id: string;
  exam_name: string;
  subject_name: string;
  target_score: number;
  topics?: StudyTopic[];
}

export interface StudyTopic {
  id: string;
  subject_id: string;
  name: string;
  completed: boolean;
}

export interface StudySession {
  id: string;
  subject_id: string | null;
  date: string;
  duration_minutes: number;
  notes: string;
}

export const useStudy = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<StudySubject[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data: subs } = await supabase
      .from("study_subjects" as any)
      .select("*")
      .eq("user_id", user.id)
      .order("created_at");

    const { data: topics } = await supabase
      .from("study_topics" as any)
      .select("*")
      .eq("user_id", user.id);

    const { data: sess } = await supabase
      .from("study_sessions" as any)
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (subs && topics) {
      const mapped = (subs as any[]).map((s) => ({
        ...s,
        topics: (topics as any[]).filter((t) => t.subject_id === s.id),
      }));
      setSubjects(mapped);
    }
    if (sess) setSessions(sess as any);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const addSubject = async (examName: string, subjectName: string, targetScore: number) => {
    if (!user) return;
    await supabase.from("study_subjects" as any).insert({
      user_id: user.id, exam_name: examName, subject_name: subjectName, target_score: targetScore,
    });
    fetchData();
  };

  const addTopic = async (subjectId: string, name: string) => {
    if (!user) return;
    await supabase.from("study_topics" as any).insert({
      user_id: user.id, subject_id: subjectId, name,
    });
    fetchData();
  };

  const toggleTopic = async (topicId: string, completed: boolean) => {
    await supabase.from("study_topics" as any).update({ completed }).eq("id", topicId);
    fetchData();
  };

  const logSession = async (subjectId: string | null, durationMinutes: number, notes: string) => {
    if (!user) return;
    await supabase.from("study_sessions" as any).insert({
      user_id: user.id, subject_id: subjectId, duration_minutes: durationMinutes, notes,
    });
    fetchData();
  };

  const deleteSubject = async (id: string) => {
    await supabase.from("study_subjects" as any).delete().eq("id", id);
    fetchData();
  };

  const totalStudyMinutes = sessions.reduce((s, ss) => s + ss.duration_minutes, 0);

  return { subjects, sessions, loading, addSubject, addTopic, toggleTopic, logSession, deleteSubject, totalStudyMinutes };
};
