import React, { useState, useRef, useEffect } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { askAdvisor } from '../services/aiService';
import { executeAction } from '../services/actionEngine';
import { computeProfileMetrics } from '../services/profileEngine';
import { formatINR } from '../utils/formatters';
import type { ChatMessage } from '../types/finance';
import {
  MicIcon,
  SpeakerIcon,
  SendIcon,
  SparkleIcon,
  CheckIcon,
  AlertIcon,
  ChevronDownIcon,
  InfoIcon,
} from '../components/icons';

export const AdvisorChatPage: React.FC = () => {
  const {
    profile,
    categories,
    goals,
    leaks,
    messages,
    activePipelineSnapshot,
    isThinking,
    thinkingStep,
    addMessage,
    setThinking,
    setPipelineSnapshot,
    updateCategoryCap,
    addOrUpdateGoal,
    resolveLeak,
  } = useFinanceStore();

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [expandedReasoningId, setExpandedReasoningId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const metrics = computeProfileMetrics(profile, categories);

  const starterPrompts = [
    'I earn ₹48,000 and can\'t save anything at month-end',
    'Is a SIP safe for me? What if the market drops?',
    'Help me save ₹1,20,000 for a MacBook in 10 months',
    'Why shouldn\'t I just put all my savings into an FD?',
    'Scan my UPI payments for spending leaks',
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Setup Web Speech API (SpeechRecognition)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use text input.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const handleSpeak = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text for speech
    const cleanText = text.replace(/[*_#`₹]/g, '').replace(/p\.a\./g, 'per annum');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-IN';

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (userTextToSend?: string) => {
    const text = (userTextToSend || input).trim();
    if (!text || isThinking) return;

    setInput('');
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    addMessage(userMsg);

    // 2. Start thinking with 3-step pipeline progress
    setThinking(true, 'Initializing conversational engine…');

    try {
      const response = await askAdvisor(
        text,
        {
          profile,
          categories,
          goals,
          previousMessages: messages,
        },
        (step) => {
          setThinking(true, step);
        }
      );

      setThinking(false, '');
      addMessage(response.message);
      if (response.message.pipelineSnapshot) {
        setPipelineSnapshot(response.message.pipelineSnapshot);
      }
    } catch (err) {
      console.error('Advisor error:', err);
      setThinking(false, '');
    }
  };

  const handleExecuteInlineAction = (actionType: string, payload: any) => {
    const res = executeAction(actionType, payload, {
      updateCategoryCap,
      addOrUpdateGoal,
      resolveLeak,
      categories,
      goals,
      leaks,
    });

    setActionFeedback(res.message);
    setTimeout(() => {
      setActionFeedback(null);
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-4.5rem)] flex flex-col">
      {/* Top action feedback toast */}
      {actionFeedback && (
        <div className="fixed top-20 right-6 z-50 bg-pine text-paper px-4 py-3 rounded-card shadow-editorial flex items-center gap-3 text-xs animate-fade-in">
          <CheckIcon size={16} className="text-saffron" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Main Two-Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* LEFT COLUMN: Editorial Conversation Stream (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-paper-elevated rounded-card hairline-all overflow-hidden shadow-editorial">
          {/* Header Bar */}
          <div className="p-4 bg-paper hairline-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-btn bg-pine flex items-center justify-center text-paper">
                <SparkleIcon size={16} />
              </span>
              <div>
                <h2 className="font-serif text-base font-bold text-ink">
                  AlphaSeekers Advisor
                </h2>
                <div className="flex items-center gap-2 text-[11px] font-mono text-ink-muted">
                  <span className="w-2 h-2 rounded-full bg-positive inline-block" />
                  <span>Pipeline Active • Adaptive Plain English</span>
                </div>
              </div>
            </div>

            {/* Mobile Sheet Trigger */}
            <button
              onClick={() => setMobileSheetOpen(true)}
              className="lg:hidden text-xs font-mono px-3 py-1.5 rounded-tag bg-paper-surface hairline-all text-pine flex items-center gap-1.5"
            >
              <InfoIcon size={14} />
              <span>Pipeline Telemetry</span>
            </button>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isReasoningOpen = expandedReasoningId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender metadata */}
                  <div className="flex items-center gap-2 mb-1.5 text-[11px] font-mono text-ink-muted">
                    <span>{isUser ? 'You' : 'Advisor'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleSpeak(msg.content, msg.id)}
                        className="hover:text-pine ml-1 transition-colors p-1"
                        title="Read message aloud"
                      >
                        <SpeakerIcon
                          size={13}
                          className={speakingMessageId === msg.id ? 'text-saffron' : ''}
                        />
                      </button>
                    )}
                  </div>

                  {/* Message Body */}
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] rounded-card p-4 sm:p-5 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-paper-surface hairline-all text-ink rounded-tr-none'
                        : 'bg-paper hairline-all text-ink rounded-tl-none shadow-sm'
                    }`}
                  >
                    {/* Typeset Content */}
                    <div className="space-y-3 whitespace-pre-line font-normal">
                      {msg.content}
                    </div>

                    {/* INLINE CARD 1: Budget Breakdown Card */}
                    {msg.inlineCard?.type === 'budget_breakdown' && msg.inlineCard.budget && (
                      <div className="mt-4 pt-3 hairline-t bg-paper-surface/60 rounded-btn p-3.5 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-semibold text-pine">50/30/20 Suggested Target</span>
                          <span className="text-ink-muted">₹48,000 monthly in-hand</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="bg-paper p-2 rounded-tag hairline-all">
                            <span className="text-[10px] text-ink-muted block">Needs (50%)</span>
                            <span className="font-mono font-semibold text-pine">
                              {formatINR(msg.inlineCard.budget.needs)}
                            </span>
                          </div>
                          <div className="bg-paper p-2 rounded-tag hairline-all">
                            <span className="text-[10px] text-ink-muted block">Wants (30%)</span>
                            <span className="font-mono font-semibold text-warning">
                              {formatINR(msg.inlineCard.budget.wants)}
                            </span>
                          </div>
                          <div className="bg-paper p-2 rounded-tag hairline-all">
                            <span className="text-[10px] text-ink-muted block">Savings (20%)</span>
                            <span className="font-mono font-semibold text-positive">
                              {formatINR(msg.inlineCard.budget.savings)}
                            </span>
                          </div>
                        </div>

                        {/* Proposed Caps list */}
                        <div className="space-y-1.5 pt-1 text-xs">
                          {msg.inlineCard.budget.caps.map((cap, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between py-1 px-2 bg-paper rounded-tag text-xs"
                            >
                              <span>{cap.name}</span>
                              <span className="font-mono font-semibold text-pine">
                                {formatINR(cap.amount)}/mo
                              </span>
                            </div>
                          ))}
                        </div>

                        {msg.inlineCard.action && (
                          <button
                            onClick={() =>
                              handleExecuteInlineAction(
                                msg.inlineCard!.action!.type,
                                msg.inlineCard!.action!.payload
                              )
                            }
                            className="w-full py-2 bg-pine text-paper rounded-btn text-xs font-semibold hover:bg-pine-hover transition-colors flex items-center justify-center gap-1.5"
                          >
                            <CheckIcon size={14} />
                            <span>{msg.inlineCard.action.label}</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* INLINE CARD 2: Goal Progress Card */}
                    {msg.inlineCard?.type === 'goal_card' && msg.inlineCard.goal && (
                      <div className="mt-4 pt-3 hairline-t bg-paper-surface/60 rounded-btn p-3.5 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-semibold text-pine">{msg.inlineCard.goal.title}</span>
                          <span className="text-positive font-bold">
                            {formatINR(msg.inlineCard.goal.target)} Target
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-ink-muted">Monthly Contribution Needed:</span>
                          <span className="font-mono font-semibold text-pine">
                            {formatINR(msg.inlineCard.goal.monthly)}/mo
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-ink-muted">
                          <span>Estimated Time Horizon:</span>
                          <span className="font-mono">{msg.inlineCard.goal.monthsToGoal} months</span>
                        </div>

                        {msg.inlineCard.action && (
                          <button
                            onClick={() =>
                              handleExecuteInlineAction(
                                msg.inlineCard!.action!.type,
                                msg.inlineCard!.action!.payload
                              )
                            }
                            className="w-full py-2 bg-pine text-paper rounded-btn text-xs font-semibold hover:bg-pine-hover transition-colors flex items-center justify-center gap-1.5"
                          >
                            <CheckIcon size={14} />
                            <span>{msg.inlineCard.action.label}</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* INLINE CARD 3: Comparison Table (FD vs RD vs SIP) */}
                    {msg.inlineCard?.type === 'comparison_table' && msg.inlineCard.comparisons && (
                      <div className="mt-4 pt-3 hairline-t space-y-2">
                        <div className="text-xs font-mono font-semibold text-pine mb-1">
                          Instrument Risk & Post-Tax Comparison
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs bg-paper-surface/50 rounded-btn overflow-hidden">
                            <thead>
                              <tr className="hairline-b text-[10px] font-mono text-ink-muted uppercase">
                                <th className="p-2">Instrument</th>
                                <th className="p-2">Expected Yield</th>
                                <th className="p-2">Risk Level</th>
                                <th className="p-2">Verdict</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-paper-border text-[11px]">
                              {msg.inlineCard.comparisons.map((c, i) => (
                                <tr key={i} className="hover:bg-paper-surface">
                                  <td className="p-2 font-semibold text-ink">{c.instrument}</td>
                                  <td className="p-2 font-mono text-pine">{c.expectedReturn}</td>
                                  <td className="p-2">
                                    <span
                                      className={`px-1.5 py-0.5 rounded-tag text-[10px] font-mono ${
                                        c.riskLevel === 'Zero Risk'
                                          ? 'bg-positive/10 text-positive'
                                          : 'bg-warning/10 text-warning'
                                      }`}
                                    >
                                      {c.riskLevel}
                                    </span>
                                  </td>
                                  <td className="p-2 text-ink-muted">{c.verdictForYou}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* INLINE CARD 4: Action Prompt */}
                    {msg.inlineCard?.type === 'action_prompt' && msg.inlineCard.action && (
                      <div className="mt-4 pt-3 hairline-t">
                        <button
                          onClick={() =>
                            handleExecuteInlineAction(
                              msg.inlineCard!.action!.type,
                              msg.inlineCard!.action!.payload
                            )
                          }
                          className="w-full py-2.5 bg-pine text-paper rounded-btn text-xs font-semibold hover:bg-pine-hover transition-colors flex items-center justify-center gap-1.5"
                        >
                          <CheckIcon size={14} />
                          <span>{msg.inlineCard.action.label}</span>
                        </button>
                      </div>
                    )}

                    {/* "Why this advice?" Expandable Reasoning */}
                    {msg.reasoning && (
                      <div className="mt-3 pt-2 hairline-t text-xs">
                        <button
                          onClick={() =>
                            setExpandedReasoningId(isReasoningOpen ? null : msg.id)
                          }
                          className="flex items-center gap-1.5 text-pine font-mono text-[11px] font-semibold hover:text-pine-hover"
                        >
                          <ChevronDownIcon
                            size={12}
                            className={`transform transition-transform ${
                              isReasoningOpen ? 'rotate-180' : ''
                            }`}
                          />
                          <span>
                            {isReasoningOpen ? 'Hide reasoning' : 'Why this advice? (Transparent math)'}
                          </span>
                        </button>

                        {isReasoningOpen && (
                          <div className="mt-2 p-3 bg-paper-surface/70 rounded-btn space-y-2 text-xs text-ink leading-relaxed font-sans">
                            <div>
                              <strong className="font-mono text-[10px] text-ink-muted uppercase block">
                                Mathematical Logic:
                              </strong>
                              <span>{msg.reasoning.mathExplanation}</span>
                            </div>
                            <div>
                              <strong className="font-mono text-[10px] text-ink-muted uppercase block">
                                Trade-offs Considered:
                              </strong>
                              <ul className="list-disc list-inside space-y-1 text-ink-muted">
                                {msg.reasoning.tradeoffsConsidered.map((t, i) => (
                                  <li key={i}>{t}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex items-start gap-1.5 text-ink-muted text-[11px] pt-1">
                              <AlertIcon size={13} className="text-warning shrink-0 mt-0.5" />
                              <span>{msg.reasoning.riskFlag}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Pipeline Thinking State */}
            {isThinking && (
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-mono text-ink-muted">
                  <SparkleIcon size={13} className="text-saffron animate-spin" />
                  <span>Advisor Engine Thinking…</span>
                </div>
                <div className="bg-paper hairline-all rounded-card p-4 max-w-sm shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-pine">
                    <span className="w-2 h-2 rounded-full bg-saffron animate-ping" />
                    <span>{thinkingStep}</span>
                  </div>
                  <div className="w-full bg-paper-surface h-1 rounded-full overflow-hidden">
                    <div className="bg-pine h-full rounded-full animate-pulse" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Prompts Carousel */}
          <div className="px-4 py-2 bg-paper/50 hairline-t overflow-x-auto whitespace-nowrap space-x-2">
            <span className="text-[11px] font-mono text-ink-muted mr-1">Suggestions:</span>
            {starterPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isThinking}
                className="inline-block text-[11px] px-2.5 py-1 rounded-tag bg-paper hover:bg-paper-surface hairline-all text-ink transition-colors disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Bar with Voice & Waveform */}
          <div className="p-4 bg-paper hairline-t">
            {isListening ? (
              <div className="flex items-center justify-between p-3 bg-pine-light rounded-btn hairline-all">
                <div className="flex items-center gap-3">
                  {/* Waveform Visualization */}
                  <div className="flex items-center gap-1 h-6">
                    <div className="w-1 bg-pine rounded-full wave-bar" />
                    <div className="w-1 bg-pine rounded-full wave-bar" />
                    <div className="w-1 bg-pine rounded-full wave-bar" />
                    <div className="w-1 bg-pine rounded-full wave-bar" />
                    <div className="w-1 bg-pine rounded-full wave-bar" />
                    <div className="w-1 bg-pine rounded-full wave-bar" />
                    <div className="w-1 bg-pine rounded-full wave-bar" />
                  </div>
                  <span className="text-xs font-mono text-pine font-medium animate-pulse">
                    Listening to your voice… speak in plain English
                  </span>
                </div>
                <button
                  onClick={handleVoiceToggle}
                  className="px-3 py-1 bg-negative text-paper rounded-btn text-xs font-mono"
                >
                  Stop Mic
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                {/* Voice Mic Button */}
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className="p-2.5 rounded-btn hairline-all text-ink hover:text-pine hover:bg-paper-surface transition-colors"
                  title="Speak your money situation (Web Speech API)"
                  aria-label="Activate voice microphone"
                >
                  <MicIcon size={18} />
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. I earn ₹48k and can't save, or why not just FD?..."
                  className="flex-1 px-4 py-2.5 bg-paper-surface/50 rounded-btn hairline-all text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-pine transition-colors font-sans"
                  disabled={isThinking}
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="p-2.5 rounded-btn bg-pine text-paper hover:bg-pine-hover disabled:opacity-40 transition-colors shadow-sm"
                  aria-label="Send message to advisor"
                >
                  <SendIcon size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: "What I Understood" Live Architecture Side Panel (5 Cols) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col bg-paper rounded-card hairline-all shadow-editorial p-5 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between hairline-b pb-3">
            <div>
              <span className="label-subtle">Architecture Pipeline</span>
              <h3 className="font-serif text-lg font-bold text-ink">
                What I Understood
              </h3>
            </div>
            <span className="font-mono text-[11px] text-pine bg-pine-light px-2 py-0.5 rounded-tag font-semibold">
              Live Engine Telemetry
            </span>
          </div>

          {/* 1. Detected Intent */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ink-muted uppercase">01. Detected Intent</span>
              <span className="text-positive font-semibold">
                Confidence: {Math.round((activePipelineSnapshot?.confidence || 0.95) * 100)}%
              </span>
            </div>
            <div className="p-3 bg-paper-surface rounded-btn text-xs font-serif font-bold text-ink">
              {activePipelineSnapshot?.intent || 'Calibrating user context…'}
            </div>
          </div>

          {/* 2. Detected Objection */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ink-muted uppercase">02. Detected Objection</span>
              <span
                className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-tag ${
                  activePipelineSnapshot?.objection?.detected
                    ? 'bg-warning/10 text-warning'
                    : 'bg-positive/10 text-positive'
                }`}
              >
                {activePipelineSnapshot?.objection?.detected
                  ? `Category: ${activePipelineSnapshot.objection.category}`
                  : 'No Friction Detected'}
              </span>
            </div>

            {activePipelineSnapshot?.objection?.detected ? (
              <div className="p-3 bg-warning/5 rounded-btn hairline-all border-warning/30 space-y-2">
                <div className="text-xs text-ink italic">
                  "{activePipelineSnapshot.objection.userConcern}"
                </div>
                <div className="text-[11px] text-ink-muted font-sans border-t border-warning/20 pt-1.5">
                  <strong>Resolution:</strong>{' '}
                  {activePipelineSnapshot.objection.transparentResolution}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-paper-surface/60 rounded-btn text-xs text-ink-muted">
                User is exploring openly. No risk or liquidity objections flagged.
              </div>
            )}
          </div>

          {/* 3. Extracted Financial Profile */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-ink-muted uppercase">
              03. Extracted Profile Context
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-paper-surface rounded-btn">
                <span className="text-[10px] text-ink-muted block">In-Hand Salary</span>
                <span className="font-mono font-bold text-ink">
                  {formatINR(profile.monthlyIncome)}
                </span>
              </div>
              <div className="p-2.5 bg-paper-surface rounded-btn">
                <span className="text-[10px] text-ink-muted block">Fixed Obligations</span>
                <span className="font-mono font-bold text-ink">
                  {formatINR(metrics.totalFixed)}
                </span>
              </div>
              <div className="p-2.5 bg-paper-surface rounded-btn">
                <span className="text-[10px] text-ink-muted block">Emergency Runway</span>
                <span className="font-mono font-bold text-pine">
                  {metrics.emergencyRunwayMonths} months
                </span>
              </div>
              <div className="p-2.5 bg-paper-surface rounded-btn">
                <span className="text-[10px] text-ink-muted block">Safe Daily Spend</span>
                <span className="font-mono font-bold text-pine">
                  {formatINR(metrics.safeToSpendToday)}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Live Market Data Anchor */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ink-muted uppercase">04. Live Financial Anchor</span>
              <span className="text-[10px] text-ink-faint">RBI / Benchmark</span>
            </div>
            <div className="p-3 bg-paper-surface rounded-btn space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-ink">
                  {activePipelineSnapshot?.liveMarketFact.indicator || '1-Yr Bank FD'}
                </span>
                <span className="font-mono font-semibold text-pine">
                  {activePipelineSnapshot?.liveMarketFact.value || '7.15%'}
                </span>
              </div>
              <p className="text-[11px] text-ink-muted">
                {activePipelineSnapshot?.liveMarketFact.relevance ||
                  'Inflation at 5.12% leaves net real gain around 0.54% after 20% slab tax.'}
              </p>
            </div>
          </div>

          {/* 5. Next-Best-Action Engine */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ink-muted uppercase">05. Next-Best-Action</span>
              <span className="text-saffron font-bold text-[10px] uppercase">
                Ready to Commit
              </span>
            </div>
            <div className="p-3.5 bg-pine-light rounded-btn hairline-all border-pine/20 space-y-2">
              <h4 className="font-serif text-xs font-bold text-pine">
                {activePipelineSnapshot?.nextBestAction.title || 'Apply Balanced Budget'}
              </h4>
              <p className="text-[11px] text-ink leading-relaxed">
                {activePipelineSnapshot?.nextBestAction.summary ||
                  'Reclaim leaky food surge delivery fees and fund your MacBook upgrade.'}
              </p>
              <button
                onClick={() =>
                  handleExecuteInlineAction(
                    activePipelineSnapshot?.nextBestAction.type || 'create_budget',
                    activePipelineSnapshot?.nextBestAction.payload || {}
                  )
                }
                className="w-full py-1.5 bg-pine text-paper rounded-btn text-xs font-medium hover:bg-pine-hover transition-colors flex items-center justify-center gap-1"
              >
                <CheckIcon size={13} />
                <span>Execute this Action</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SHEET: What I Understood (Slide-up modal) */}
      {mobileSheetOpen && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex flex-col justify-end lg:hidden">
          <div className="bg-paper rounded-t-card p-5 max-h-[80vh] overflow-y-auto space-y-4 shadow-sheet hairline-t">
            <div className="flex items-center justify-between hairline-b pb-3">
              <h3 className="font-serif text-base font-bold text-ink">
                What I Understood (Pipeline)
              </h3>
              <button
                onClick={() => setMobileSheetOpen(false)}
                className="text-xs font-mono text-ink-muted px-2 py-1"
              >
                Close
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-ink-muted uppercase">Detected Intent</span>
              <div className="p-2.5 bg-paper-surface rounded-btn text-xs font-medium">
                {activePipelineSnapshot?.intent}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-ink-muted uppercase">Detected Objection</span>
              <div className="p-2.5 bg-paper-surface rounded-btn text-xs">
                {activePipelineSnapshot?.objection?.detected
                  ? activePipelineSnapshot.objection.userConcern
                  : 'No objection detected'}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-ink-muted uppercase">Next-Best-Action</span>
              <div className="p-2.5 bg-pine-light rounded-btn text-xs text-pine font-medium">
                {activePipelineSnapshot?.nextBestAction.title}
              </div>
            </div>

            <button
              onClick={() => {
                if (activePipelineSnapshot?.nextBestAction) {
                  handleExecuteInlineAction(
                    activePipelineSnapshot.nextBestAction.type,
                    activePipelineSnapshot.nextBestAction.payload
                  );
                }
                setMobileSheetOpen(false);
              }}
              className="w-full py-2.5 bg-pine text-paper rounded-btn text-xs font-semibold"
            >
              Execute Recommended Action
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
