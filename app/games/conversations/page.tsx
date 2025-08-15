"use client";

import { AdInGame } from "@/app/components/ads";
import { getAdSlot } from "@/app/utils/ads/config";
import {
    CONVERSATION_SCENARIOS,
    ConversationScenario
} from "@/app/utils/games/data/conversations/conversationData";
import { ArrowLeft, BookOpen, Clock, Home, Trophy, Volume2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Category, ConversationGameState, Difficulty } from "./types";
import {
    calculateAccuracy,
    getCategoryDisplayName,
    getDialogueOptions,
    getDifficultyDisplayName,
    getEnglishPhrase,
    getGreekPhrase,
    getScenarioEstimatedTime,
    getSpeakerDisplayName,
    getSpeakerIcon,
    isCorrectAnswer
} from "./utils";

export default function ConversationsPage() {
  const [gameState, setGameState] = useState<ConversationGameState>({
    currentScenario: null,
    currentDialogueIndex: 0,
    totalDialogues: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    isGameComplete: false,
    showResults: false,
    accuracy: 0,
    selectedAnswers: {},
    showExplanation: false,
    showVocabulary: false,
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [gameStarted, setGameStarted] = useState(false);
  const [showScenarioInfo, setShowScenarioInfo] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario | null>(null);

  const availableScenarios = CONVERSATION_SCENARIOS.filter(scenario => {
    const difficultyMatch = selectedDifficulty === 'all' || scenario.difficulty === selectedDifficulty;
    const categoryMatch = selectedCategory === 'all' || scenario.category === selectedCategory;
    return difficultyMatch && categoryMatch;
  });

    const startScenario = (scenario: ConversationScenario) => {
    // Find the first interactive dialogue
    const firstInteractiveIndex = scenario.dialogues.findIndex(d => d.options);
    
    setGameState({
      currentScenario: scenario,
      currentDialogueIndex: firstInteractiveIndex >= 0 ? firstInteractiveIndex : 0,
      totalDialogues: scenario.dialogues.length,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      isGameComplete: false,
      showResults: false,
      accuracy: 0,
      selectedAnswers: {},
      showExplanation: false,
      showVocabulary: false,
    });
    setGameStarted(true);
  };

  const handleAnswer = (selectedOptionId: string) => {
    if (!gameState.currentScenario) return;

    const currentDialogue = gameState.currentScenario.dialogues[gameState.currentDialogueIndex];
    const isCorrect = isCorrectAnswer(currentDialogue, selectedOptionId);

    const newCorrectAnswers = gameState.correctAnswers + (isCorrect ? 1 : 0);
    const newWrongAnswers = gameState.wrongAnswers + (isCorrect ? 0 : 1);

    setGameState(prev => ({
      ...prev,
      correctAnswers: newCorrectAnswers,
      wrongAnswers: newWrongAnswers,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [currentDialogue.id]: selectedOptionId
      },
      showExplanation: true,
    }));
  };

  const nextDialogue = () => {
    if (!gameState.currentScenario) return;

    const interactiveDialogues = gameState.currentScenario.dialogues.filter(d => d.options);
    const currentInteractiveIndex = interactiveDialogues.findIndex(d => d.id === gameState.currentScenario!.dialogues[gameState.currentDialogueIndex].id);
    const nextInteractiveIndex = currentInteractiveIndex + 1;

    if (nextInteractiveIndex >= interactiveDialogues.length) {
      // Game complete
      setGameState(prev => ({
        ...prev,
        isGameComplete: true,
        showResults: true,
        accuracy: calculateAccuracy(prev.correctAnswers, interactiveDialogues.length),
      }));
    } else {
      // Find next interactive dialogue
      const nextInteractiveDialogue = interactiveDialogues[nextInteractiveIndex];
      const nextDialogueIndex = gameState.currentScenario.dialogues.findIndex(d => d.id === nextInteractiveDialogue.id);

      setGameState(prev => ({
        ...prev,
        currentDialogueIndex: nextDialogueIndex,
        showExplanation: false,
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      currentScenario: null,
      currentDialogueIndex: 0,
      totalDialogues: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      isGameComplete: false,
      showResults: false,
      accuracy: 0,
      selectedAnswers: {},
      showExplanation: false,
      showVocabulary: false,
    });
    setGameStarted(false);
  };

  const toggleVocabulary = () => {
    setGameState(prev => ({
      ...prev,
      showVocabulary: !prev.showVocabulary,
    }));
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link
                href="/games"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Games</span>
              </Link>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Greek Conversations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practice real-world Greek conversations in common scenarios. Learn cultural context and improve your speaking skills.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'all')}
              className="px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              className="px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
            >
              <option value="all">All Categories</option>
              <option value="restaurant">Restaurant</option>
              <option value="market">Market</option>
              <option value="travel">Travel</option>
              <option value="social">Social</option>
              <option value="health">Health</option>
            </select>
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableScenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="group bg-gradient-to-br from-surface to-surface/80 border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => {
                  setSelectedScenario(scenario);
                  setShowScenarioInfo(true);
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary group-hover:text-primary/80 transition-colors">
                      {scenario.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{scenario.englishTitle}</p>
                  </div>
                  <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                    {scenario.category === 'restaurant' ? '🍽️' : 
                     scenario.category === 'market' ? '🛒' : 
                     scenario.category === 'travel' ? '✈️' : 
                     scenario.category === 'social' ? '👥' : '🏥'}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">{scenario.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {getDifficultyDisplayName(scenario.difficulty)}
                  </span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                    {getCategoryDisplayName(scenario.category)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{getScenarioEstimatedTime(scenario)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{scenario.dialogues.filter(d => d.options).length} questions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {availableScenarios.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No scenarios match your current filters.</p>
            </div>
          )}
        </div>

        {/* Scenario Info Modal */}
        {showScenarioInfo && selectedScenario && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">{selectedScenario.title}</h2>
                <button
                  onClick={() => setShowScenarioInfo(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <p className="text-muted-foreground mb-4">{selectedScenario.description}</p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Context:</h3>
                <p className="text-sm text-muted-foreground">{selectedScenario.context}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Cultural Background:</h3>
                <p className="text-sm text-muted-foreground">{selectedScenario.culturalBackground}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowScenarioInfo(false);
                    startScenario(selectedScenario);
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Start Conversation
                </button>
                <button
                  onClick={() => setShowScenarioInfo(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!gameState.currentScenario) {
    return <div>Loading...</div>;
  }

  const currentDialogue = gameState.currentScenario.dialogues[gameState.currentDialogueIndex];
  const interactiveDialogues = gameState.currentScenario.dialogues.filter(d => d.options);
  const currentInteractiveIndex = interactiveDialogues.findIndex(d => d.id === currentDialogue.id);
  const totalInteractiveDialogues = interactiveDialogues.length;

  if (gameState.showResults) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/games"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Games</span>
            </Link>
          </div>

          {/* Results */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-primary mb-4">Conversation Complete!</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {gameState.currentScenario.englishTitle}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{gameState.correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{gameState.accuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold text-primary mb-2">
                  {getGreekPhrase(gameState.correctAnswers, gameState.totalDialogues)}
                </p>
                <p className="text-muted-foreground">
                  {getEnglishPhrase(gameState.correctAnswers, gameState.totalDialogues)}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={resetGame}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Practice Again
                </button>
                <button
                  onClick={() => {
                    resetGame();
                    setGameStarted(false);
                  }}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Choose Another Scenario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={resetGame}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Scenarios</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleVocabulary}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span>Vocabulary</span>
            </button>
            <div className="text-sm text-muted-foreground">
              {currentInteractiveIndex + 1} / {totalInteractiveDialogues}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentInteractiveIndex + 1) / totalInteractiveDialogues) * 100}%` }}
            />
          </div>
        </div>

        {/* Vocabulary Panel */}
        {gameState.showVocabulary && (
          <div className="mb-8 bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Key Vocabulary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameState.currentScenario.vocabulary.map((word, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="text-lg font-semibold text-primary">{word.greek}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{word.english}</div>
                    <div className="text-xs text-muted-foreground">{word.pronunciation}</div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dialogue */}
        <div className="max-w-4xl mx-auto">
          {/* Show conversation context - previous staff messages */}
          {gameState.currentScenario.dialogues
            .slice(0, gameState.currentDialogueIndex)
            .filter(d => d.speaker === 'waiter' || d.speaker === 'vendor' || d.speaker === 'staff' || d.speaker === 'receptionist')
            .map((dialogue, index) => (
              <div key={`context-${index}`} className="mb-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getSpeakerIcon('waiter')}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-primary">{getSpeakerDisplayName('waiter')}</span>
                      <span className="text-sm text-muted-foreground">• {dialogue.explanation}</span>
                    </div>
                                      <div className="bg-gradient-to-r from-surface to-surface/80 border border-border rounded-xl p-4 shadow-sm">
                    <p className="text-lg font-medium mb-2 text-primary">{dialogue.greek}</p>
                    <p className="text-muted-foreground text-sm">{dialogue.english}</p>
                  </div>
                    {dialogue.culturalContext && (
                      <div className="mt-2 text-sm text-muted-foreground bg-muted/50 rounded p-2">
                        💡 {dialogue.culturalContext}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {/* Current Interactive Dialogue */}
          {(currentDialogue.speaker === 'customer' || currentDialogue.speaker === 'guest') && currentDialogue.options && (
            <div className="mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getSpeakerIcon('customer')}</div>
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="font-semibold text-primary">{getSpeakerDisplayName('customer')}</span>
                    <p className="text-muted-foreground">Choose your response:</p>
                  </div>

                  <div className="space-y-3">
                    {getDialogueOptions(currentDialogue).map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(option.id)}
                        disabled={gameState.showExplanation}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                          gameState.showExplanation
                            ? option.isCorrect
                              ? 'bg-green-50 border-green-300 text-green-800 shadow-lg'
                              : option.id === gameState.selectedAnswers[currentDialogue.id]
                              ? 'bg-red-50 border-red-300 text-red-800 shadow-lg'
                              : 'bg-muted border-border text-muted-foreground'
                            : 'bg-surface border-border hover:bg-muted hover:border-primary hover:shadow-md'
                        }`}
                      >
                        <p className="text-lg font-medium mb-1">{option.greek}</p>
                        <p className="text-muted-foreground text-sm">{option.english}</p>
                      </button>
                    ))}
                  </div>

                  {/* Explanation */}
                  {gameState.showExplanation && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800 mb-2">
                        <strong>Explanation:</strong> {currentDialogue.options.find(opt => opt.id === gameState.selectedAnswers[currentDialogue.id])?.explanation}
                      </p>
                      <p className="text-blue-700 text-sm">
                        <strong>Cultural Note:</strong> {currentDialogue.options.find(opt => opt.id === gameState.selectedAnswers[currentDialogue.id])?.culturalNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {gameState.showExplanation && (
            <div className="text-center">
              <button
                onClick={nextDialogue}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Continue Conversation
              </button>
            </div>
          )}
        </div>

        {/* Ad */}
        <div className="mt-8">
          <AdInGame slot={getAdSlot("conversation-game")} />
        </div>
      </div>
    </div>
  );
}
