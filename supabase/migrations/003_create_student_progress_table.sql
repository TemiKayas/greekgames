-- Create student progress table
CREATE TABLE public.student_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE NOT NULL,
  current_level INTEGER DEFAULT 1,
  total_score INTEGER DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  times_played INTEGER DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0, -- in seconds
  last_played_at TIMESTAMP WITH TIME ZONE,
  progress_data JSONB DEFAULT '{}', -- game-specific progress tracking
  completion_percentage DECIMAL(5,2) DEFAULT 0.00 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one progress record per student per game
  UNIQUE(student_id, game_id)
);

-- Add updated_at trigger
CREATE TRIGGER student_progress_updated_at
  BEFORE UPDATE ON public.student_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_student_progress_student_id ON public.student_progress(student_id);
CREATE INDEX idx_student_progress_game_id ON public.student_progress(game_id);
CREATE INDEX idx_student_progress_last_played ON public.student_progress(last_played_at DESC);

-- Enable RLS
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- Students can read their own progress
CREATE POLICY "Students can read own progress" ON public.student_progress
  FOR SELECT USING (student_id = auth.uid());

-- Students can update their own progress
CREATE POLICY "Students can update own progress" ON public.student_progress
  FOR UPDATE USING (student_id = auth.uid());

-- Students can insert their own progress
CREATE POLICY "Students can insert own progress" ON public.student_progress
  FOR INSERT WITH CHECK (student_id = auth.uid());

-- Teachers can read their students' progress (will be enhanced in Phase 2)
CREATE POLICY "Teachers can read student progress" ON public.student_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()
      AND users.role = 'teacher'
    )
  );
