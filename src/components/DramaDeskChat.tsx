"use client";

import { useState, useRef, useEffect } from "react";

interface DramaDeskSource {
  title: string;
  source: string;
  url: string;
}

interface DramaDeskResponse {
  answer: string;
  sources: DramaDeskSource[];
  disclaimer: string;
}

type ChatState = "idle" | "loading" | "success" | "error";

export function DramaDeskChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<DramaDeskResponse | null>(null);
  const [chatState, setChatState] = useState<ChatState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || chatState === "loading") return;

    setResponse(null);
    setChatState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/drama-desk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          setErrorMessage(
            "The Drama Desk needs a coffee break. You've been asking too many questions! Try again in a bit."
          );
        } else {
          setErrorMessage(
            "The Drama Desk spilled its tea (literally). Something went wrong. Try again in a moment."
          );
        }
        setChatState("error");
        return;
      }

      const data: DramaDeskResponse = await res.json();
      setResponse(data);
      setChatState("success");
    } catch {
      setErrorMessage(
        "The Drama Desk lost its signal. Check your connection and try again."
      );
      setChatState("error");
    }
  };

  return (
    <>
      {/* Collapsed: Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 z-50 group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-dr-pink to-dr-purple shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 sm:right-6"
          aria-label="Ask the Drama Desk"
        >
          {/* Radar/sonar SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-white"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" opacity="0.6" />
            <circle cx="12" cy="12" r="2" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>

          {/* Tooltip (desktop only) */}
          <span className="absolute right-16 hidden whitespace-nowrap bg-dr-surface text-dr-text text-sm px-3 py-1.5 rounded-lg sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-dr-purple/30">
            Ask the Drama Desk
          </span>
        </button>
      )}

      {/* Expanded: Chat panel */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full sm:w-[400px] sm:bottom-6 sm:right-6 h-full sm:h-auto sm:max-h-[600px] flex flex-col bg-dr-surface border border-dr-purple/20 sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-dr-purple/20 bg-dr-bg">
            <div className="flex items-center gap-2">
              {/* Small radar animation */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-dr-pink/30 animate-ping" />
                <span className="relative w-3 h-3 rounded-full bg-gradient-to-br from-dr-pink to-dr-purple" />
              </div>
              <h2 className="text-dr-text font-semibold text-base">
                The Drama Desk
              </h2>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setChatState("idle");
                setResponse(null);
                setQuestion("");
                setErrorMessage("");
              }}
              className="text-dr-text-muted hover:text-dr-text transition-colors p-1"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Response area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {chatState === "idle" && (
              <div className="text-center text-dr-text-muted text-sm py-8">
                <p className="mb-1">Got a burning question about the latest drama?</p>
                <p>Type below and hit <span className="text-dr-pink font-medium">Spill</span> to find out.</p>
              </div>
            )}

            {chatState === "loading" && (
              <div className="flex items-center gap-3 py-8 justify-center">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-dr-pink animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-dr-purple animate-pulse [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-dr-pink animate-pulse [animation-delay:300ms]" />
                </div>
                <span className="text-dr-text-muted text-sm animate-pulse">
                  Scanning for drama...
                </span>
              </div>
            )}

            {chatState === "error" && (
              <div className="bg-dr-pink/10 border border-dr-pink/30 rounded-xl p-4 text-sm text-dr-text">
                {errorMessage}
              </div>
            )}

            {chatState === "success" && response && (
              <>
                {/* Speech bubble response */}
                <div className="relative bg-dr-bg border border-dr-purple/20 rounded-xl rounded-tl-sm p-4">
                  <p className="text-dr-text text-sm leading-relaxed whitespace-pre-wrap">
                    {response.answer}
                  </p>
                </div>

                {/* Sources */}
                {response.sources.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-dr-text-muted text-xs font-medium uppercase tracking-wide">
                      Sources
                    </p>
                    <ul className="space-y-1">
                      {response.sources.map((src, i) => (
                        <li key={i}>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-dr-purple hover:text-dr-pink transition-colors flex items-center gap-1"
                          >
                            <span className="truncate">{src.title}</span>
                            <span className="text-dr-text-muted shrink-0">
                              ({src.source})
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Disclaimer */}
                <p className="text-dr-text-muted/60 text-[10px] leading-tight">
                  {response.disclaimer ||
                    "The Drama Desk pulls from recent news. Always check sources for full details."}
                </p>
              </>
            )}
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 border-t border-dr-purple/20 bg-dr-bg"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={question}
                  onChange={(e) =>
                    setQuestion(e.target.value.slice(0, 500))
                  }
                  placeholder="What's the tea on..."
                  className="w-full bg-dr-surface text-dr-text placeholder-dr-text-muted/50 text-sm rounded-lg px-3 py-2.5 pr-12 border border-dr-purple/20 focus:border-dr-pink/50 focus:outline-none transition-colors"
                  disabled={chatState === "loading"}
                  maxLength={500}
                  aria-label="Ask the Drama Desk a question"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-dr-text-muted/40 tabular-nums">
                  {question.length}/500
                </span>
              </div>
              <button
                type="submit"
                disabled={chatState === "loading" || !question.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-dr-pink to-dr-purple text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shrink-0"
                aria-label="Submit question"
              >
                Spill
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
