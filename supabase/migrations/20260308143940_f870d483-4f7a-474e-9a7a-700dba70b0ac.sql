
CREATE TABLE public.goal_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.goal_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own goal_tasks" ON public.goal_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goal_tasks" ON public.goal_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goal_tasks" ON public.goal_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goal_tasks" ON public.goal_tasks FOR DELETE USING (auth.uid() = user_id);
