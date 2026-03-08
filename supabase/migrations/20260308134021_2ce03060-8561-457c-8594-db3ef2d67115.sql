
-- Sleep logs
CREATE TABLE public.sleep_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  bedtime text DEFAULT '',
  wake_time text DEFAULT '',
  hours_slept numeric DEFAULT 0,
  sleep_quality integer DEFAULT 5,
  bad_dreams boolean DEFAULT false,
  dream_notes text DEFAULT '',
  morning_energy integer DEFAULT 5,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Water logs
CREATE TABLE public.water_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  glasses integer DEFAULT 0,
  bottle_size_ml integer DEFAULT 250,
  daily_goal integer DEFAULT 8,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Mood logs
CREATE TABLE public.mood_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  mood text DEFAULT 'neutral',
  stress_level integer DEFAULT 5,
  energy_level integer DEFAULT 5,
  notes text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Study subjects
CREATE TABLE public.study_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  exam_name text NOT NULL DEFAULT '',
  subject_name text NOT NULL DEFAULT '',
  target_score integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Study topics
CREATE TABLE public.study_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject_id uuid NOT NULL REFERENCES public.study_subjects(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  completed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Study sessions
CREATE TABLE public.study_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject_id uuid REFERENCES public.study_subjects(id) ON DELETE SET NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  duration_minutes integer DEFAULT 0,
  notes text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Meditation sessions
CREATE TABLE public.meditation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  duration_minutes integer DEFAULT 0,
  calmness_level integer DEFAULT 5,
  stress_before integer DEFAULT 5,
  reflection text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Personal care logs
CREATE TABLE public.personal_care_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  completed_tasks jsonb DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Screen time logs
CREATE TABLE public.screen_time_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  total_hours numeric DEFAULT 0,
  social_media_hours numeric DEFAULT 0,
  study_hours numeric DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Nutrition logs
CREATE TABLE public.nutrition_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  breakfast boolean DEFAULT false,
  lunch boolean DEFAULT false,
  dinner boolean DEFAULT false,
  fruit_intake boolean DEFAULT false,
  vegetable_intake boolean DEFAULT false,
  healthy_meal boolean DEFAULT false,
  calories integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Menstrual logs
CREATE TABLE public.menstrual_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  period_start date,
  period_end date,
  flow_intensity text DEFAULT 'medium',
  mood text DEFAULT 'neutral',
  symptoms jsonb DEFAULT '[]',
  notes text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS on all tables
ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_care_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menstrual_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for sleep_logs
CREATE POLICY "Users can view own sleep_logs" ON public.sleep_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sleep_logs" ON public.sleep_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sleep_logs" ON public.sleep_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sleep_logs" ON public.sleep_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for water_logs
CREATE POLICY "Users can view own water_logs" ON public.water_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own water_logs" ON public.water_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own water_logs" ON public.water_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own water_logs" ON public.water_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for mood_logs
CREATE POLICY "Users can view own mood_logs" ON public.mood_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own mood_logs" ON public.mood_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own mood_logs" ON public.mood_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own mood_logs" ON public.mood_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for study_subjects
CREATE POLICY "Users can view own study_subjects" ON public.study_subjects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own study_subjects" ON public.study_subjects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own study_subjects" ON public.study_subjects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own study_subjects" ON public.study_subjects FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for study_topics
CREATE POLICY "Users can view own study_topics" ON public.study_topics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own study_topics" ON public.study_topics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own study_topics" ON public.study_topics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own study_topics" ON public.study_topics FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for study_sessions
CREATE POLICY "Users can view own study_sessions" ON public.study_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own study_sessions" ON public.study_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own study_sessions" ON public.study_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own study_sessions" ON public.study_sessions FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for meditation_sessions
CREATE POLICY "Users can view own meditation_sessions" ON public.meditation_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own meditation_sessions" ON public.meditation_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own meditation_sessions" ON public.meditation_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own meditation_sessions" ON public.meditation_sessions FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for personal_care_logs
CREATE POLICY "Users can view own personal_care_logs" ON public.personal_care_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own personal_care_logs" ON public.personal_care_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own personal_care_logs" ON public.personal_care_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own personal_care_logs" ON public.personal_care_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for screen_time_logs
CREATE POLICY "Users can view own screen_time_logs" ON public.screen_time_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own screen_time_logs" ON public.screen_time_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own screen_time_logs" ON public.screen_time_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own screen_time_logs" ON public.screen_time_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for nutrition_logs
CREATE POLICY "Users can view own nutrition_logs" ON public.nutrition_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own nutrition_logs" ON public.nutrition_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own nutrition_logs" ON public.nutrition_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own nutrition_logs" ON public.nutrition_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for menstrual_logs
CREATE POLICY "Users can view own menstrual_logs" ON public.menstrual_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own menstrual_logs" ON public.menstrual_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own menstrual_logs" ON public.menstrual_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own menstrual_logs" ON public.menstrual_logs FOR DELETE USING (auth.uid() = user_id);
