-- Function to sync games from frontend registry
CREATE OR REPLACE FUNCTION public.sync_game_registry(
  p_game_key TEXT,
  p_name TEXT,
  p_description TEXT DEFAULT NULL,
  p_category TEXT DEFAULT 'general',
  p_difficulty_level INTEGER DEFAULT 1,
  p_max_score INTEGER DEFAULT 100,
  p_version TEXT DEFAULT '1.0.0',
  p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  game_id UUID;
BEGIN
  -- Insert or update game
  INSERT INTO public.games (
    game_key, name, description, category,
    difficulty_level, max_score, version, metadata
  )
  VALUES (
    p_game_key, p_name, p_description, p_category,
    p_difficulty_level, p_max_score, p_version, p_metadata
  )
  ON CONFLICT (game_key)
  DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty_level = EXCLUDED.difficulty_level,
    max_score = EXCLUDED.max_score,
    version = EXCLUDED.version,
    metadata = EXCLUDED.metadata,
    updated_at = NOW()
  RETURNING id INTO game_id;

  RETURN game_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update student progress after a game session
CREATE OR REPLACE FUNCTION public.update_student_progress(
  p_student_id UUID,
  p_game_id UUID,
  p_session_score INTEGER,
  p_session_duration INTEGER,
  p_session_completed BOOLEAN,
  p_session_data JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  progress_id UUID;
  current_best_score INTEGER;
BEGIN
  -- Get current best score
  SELECT COALESCE(best_score, 0) INTO current_best_score
  FROM public.student_progress
  WHERE student_id = p_student_id AND game_id = p_game_id;

  -- Insert or update student progress
  INSERT INTO public.student_progress (
    student_id, game_id, total_score, best_score,
    times_played, total_time_spent, last_played_at,
    progress_data
  )
  VALUES (
    p_student_id, p_game_id, p_session_score, p_session_score,
    1, p_session_duration, NOW(), p_session_data
  )
  ON CONFLICT (student_id, game_id)
  DO UPDATE SET
    total_score = student_progress.total_score + p_session_score,
    best_score = GREATEST(student_progress.best_score, p_session_score),
    times_played = student_progress.times_played + 1,
    total_time_spent = student_progress.total_time_spent + p_session_duration,
    last_played_at = NOW(),
    progress_data = p_session_data,
    updated_at = NOW()
  RETURNING id INTO progress_id;

  RETURN progress_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate completion percentage (can be customized per game)
CREATE OR REPLACE FUNCTION public.calculate_completion_percentage(
  p_student_id UUID,
  p_game_id UUID
)
RETURNS DECIMAL AS $$
DECLARE
  game_max_score INTEGER;
  student_best_score INTEGER;
  completion_pct DECIMAL;
BEGIN
  -- Get game max score
  SELECT max_score INTO game_max_score
  FROM public.games
  WHERE id = p_game_id;

  -- Get student best score
  SELECT COALESCE(best_score, 0) INTO student_best_score
  FROM public.student_progress
  WHERE student_id = p_student_id AND game_id = p_game_id;

  -- Calculate percentage
  IF game_max_score > 0 THEN
    completion_pct := (student_best_score::DECIMAL / game_max_score::DECIMAL) * 100;
  ELSE
    completion_pct := 0;
  END IF;

  -- Update the progress record
  UPDATE public.student_progress
  SET completion_percentage = completion_pct,
      updated_at = NOW()
  WHERE student_id = p_student_id AND game_id = p_game_id;

  RETURN completion_pct;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
