-- Create games table to sync with frontend registry
CREATE TABLE public.games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_key TEXT UNIQUE NOT NULL, -- matches the key in registry.ts
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5) DEFAULT 1,
  max_score INTEGER DEFAULT 100,
  version TEXT DEFAULT '1.0.0',
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}', -- flexible storage for game-specific data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add updated_at trigger
CREATE TRIGGER games_updated_at
  BEFORE UPDATE ON public.games
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- Everyone can read games (public data)
CREATE POLICY "Anyone can read games" ON public.games
  FOR SELECT TO authenticated, anon
  USING (is_active = true);

-- Only admins can modify games
CREATE POLICY "Only admins can modify games" ON public.games
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
