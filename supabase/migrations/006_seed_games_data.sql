-- Seed games data from existing registry
-- This populates the games table with your current games

-- Greek Alphabet Master (Memory Game)
SELECT public.sync_game_registry(
  'memory',
  'Greek Alphabet Master',
  'Master the Greek alphabet through an engaging memory card game. Match uppercase and lowercase letters while learning their pronunciation and usage.',
  'alphabet',
  2,
  240, -- 24 pairs * 10 points each
  '1.0.0',
  '{
    "pairs": 24,
    "timeLimit": 300,
    "maxMoves": 48,
    "difficulty": "intermediate"
  }'::jsonb
);

-- Greek Writing Practice
SELECT public.sync_game_registry(
  'writing',
  'Greek Writing Practice',
  'Practice writing in Greek through interactive fill-in-the-blank exercises. Build your vocabulary and grammar skills.',
  'writing',
  3,
  100, -- 10 exercises * 10 points each
  '1.0.0',
  '{
    "exerciseCount": 10,
    "categories": ["grammar", "vocabulary", "sentence_structure"],
    "difficulty": "intermediate"
  }'::jsonb
);

-- Everyday Greek Words (Vocabulary Game)
SELECT public.sync_game_registry(
  'vocabulary',
  'Everyday Greek Words',
  'Learn essential Greek vocabulary through interactive drag-and-drop matching. Connect Greek words with their English meanings and visual representations.',
  'vocabulary',
  2,
  150, -- 15 words * 10 points each
  '1.0.0',
  '{
    "wordCount": 15,
    "categories": ["everyday", "food", "family", "colors"],
    "interactionTypes": ["drag_drop", "click_match"],
    "difficulty": "beginner"
  }'::jsonb
);

-- Create a view for easy game data access
CREATE OR REPLACE VIEW public.games_with_stats AS
SELECT
  g.*,
  COUNT(DISTINCT sp.student_id) as total_players,
  AVG(sp.completion_percentage) as avg_completion,
  MAX(sp.best_score) as highest_score,
  COUNT(gs.id) as total_sessions
FROM public.games g
LEFT JOIN public.student_progress sp ON g.id = sp.game_id
LEFT JOIN public.game_sessions gs ON g.id = gs.game_id
WHERE g.is_active = true
GROUP BY g.id;

-- Grant necessary permissions
GRANT SELECT ON public.games_with_stats TO authenticated, anon;
