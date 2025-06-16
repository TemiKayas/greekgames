-- Create game sessions table for individual play records
CREATE TABLE public.game_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE NOT NULL,
  score INTEGER DEFAULT 0,
  duration INTEGER DEFAULT 0, -- in seconds
  completed BOOLEAN DEFAULT false,
  session_data JSONB DEFAULT '{}', -- store moves, answers, mistakes, etc.
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_game_sessions_student_id ON public.game_sessions(student_id);
CREATE INDEX idx_game_sessions_game_id ON public.game_sessions(game_id);
CREATE INDEX idx_game_sessions_started_at ON public.game_sessions(started_at DESC);
CREATE INDEX idx_game_sessions_completed ON public.game_sessions(completed, completed_at DESC);

-- Enable RLS
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;

-- Students can read their own sessions
CREATE POLICY "Students can read own sessions" ON public.game_sessions
  FOR SELECT USING (student_id = auth.uid());

-- Students can insert their own sessions
CREATE POLICY "Students can insert own sessions" ON public.game_sessions
  FOR INSERT WITH CHECK (student_id = auth.uid());

-- Students can update their own sessions
CREATE POLICY "Students can update own sessions" ON public.game_sessions
  FOR UPDATE USING (student_id = auth.uid());

-- Teachers can read their students' sessions (will be enhanced in Phase 2)
CREATE POLICY "Teachers can read student sessions" ON public.game_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()
      AND users.role = 'teacher'
    )
  );
