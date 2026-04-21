"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Port } from "@/lib/ports";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type PortChatDrawerProps = {
  port: Port | null;
  onClose: () => void;
};

const quickPrompts = [
  "Best half-day plan?",
  "Family-friendly highlights?",
  "How far from the cruise pier?",
  "Accessible options?",
];

const getInitialMessage = (port: Port): ChatMessage => ({
  role: "assistant",
  content: `Ask me about ${port.name}: shore excursion ideas, timing, highlights, transfers, or guest fit.`,
});

export function PortChatDrawer({ port, onClose }: PortChatDrawerProps) {
  const [draft, setDraft] = useState("");
  const [messagesByPort, setMessagesByPort] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [pendingPortName, setPendingPortName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const messages = useMemo(() => {
    if (!port) return [];
    return messagesByPort[port.name] ?? [getInitialMessage(port)];
  }, [messagesByPort, port]);

  const isPending = Boolean(port && pendingPortName === port.name);

  useEffect(() => {
    if (!port) return;

    setDraft("");
    setError("");
    window.setTimeout(() => inputRef.current?.focus(), 80);
  }, [port]);

  useEffect(() => {
    if (!port) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, port]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, port]);

  const sendQuestion = async (question: string) => {
    if (!port || isPending) return;

    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    const portName = port.name;
    const currentMessages = messages;
    const userMessage: ChatMessage = {
      role: "user",
      content: cleanQuestion,
    };
    const nextMessages = [...currentMessages, userMessage];

    setDraft("");
    setError("");
    setPendingPortName(portName);
    setMessagesByPort((current) => ({
      ...current,
      [portName]: nextMessages,
    }));

    try {
      const response = await fetch("/api/port-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portName,
          question: cleanQuestion,
          history: currentMessages
            .filter((message) => message.role !== "assistant" || !message.content.startsWith("Ask me about"))
            .slice(-6),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        answer?: string;
        message?: string;
      } | null;

      const answer = payload?.answer?.trim();

      if (!response.ok || !answer) {
        throw new Error(payload?.message ?? "The port concierge is unavailable.");
      }

      setMessagesByPort((current) => ({
        ...current,
        [portName]: [
          ...(current[portName] ?? nextMessages),
          {
            role: "assistant",
            content: answer,
          },
        ],
      }));
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "The port concierge is unavailable.";

      setError(message);
      setMessagesByPort((current) => ({
        ...current,
        [portName]: current[portName] ?? nextMessages,
      }));
    } finally {
      setPendingPortName((current) => (current === portName ? null : current));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendQuestion(draft);
  };

  if (!port) return null;

  return (
    <div
      aria-labelledby="port-chat-title"
      aria-modal="true"
      className="fixed inset-0 z-50"
      role="dialog"
    >
      <button
        aria-label="Close port chat"
        className="absolute inset-0 bg-[#33305e]/45 backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] min-h-[620px] flex-col overflow-hidden bg-white shadow-2xl shadow-[#33305e]/25 sm:inset-x-auto sm:right-6 sm:top-6 sm:bottom-6 sm:w-[440px] sm:min-h-0">
        <div className="border-b border-[#33305e]/10 bg-[#33305e] px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#96e0d9]">
                <Sparkles className="h-4 w-4" />
                Port Concierge
              </div>
              <h2
                className="font-[var(--font-syne)] text-[28px] font-bold leading-tight"
                id="port-chat-title"
              >
                {port.name}
              </h2>
              <p className="mt-2 text-[14px] font-medium text-white/65">
                {port.region} / {port.category}
              </p>
            </div>
            <Button
              aria-label="Close port chat"
              className="h-10 w-10 border-white/15 bg-white/5 text-white hover:bg-white hover:text-[#33305e]"
              onClick={onClose}
              size="icon"
              type="button"
              variant="outline"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-5 border-l-2 border-[#96e0d9] pl-4 text-[14px] leading-relaxed text-white/80">
            {port.fact}
          </p>
        </div>

        <div
          className="flex-1 space-y-4 overflow-y-auto bg-[#f8f9fa] px-5 py-6"
          ref={scrollRef}
        >
          {messages.map((message, index) => (
            <div
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
              key={`${message.role}-${index}-${message.content.slice(0, 16)}`}
            >
              <div
                className={cn(
                  "max-w-[85%] px-4 py-3 text-[14px] leading-relaxed shadow-sm",
                  message.role === "user"
                    ? "bg-[#51d2c6] text-white"
                    : "border border-[#33305e]/10 bg-white text-[#33305e]",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isPending ? (
            <div className="flex justify-start">
              <div className="flex items-center gap-3 border border-[#33305e]/10 bg-white px-4 py-3 text-[14px] font-semibold text-[#33305e]/70 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-[#51d2c6]" />
                Thinking
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-[#33305e]/10 bg-white p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                className="border border-[#33305e]/10 px-3 py-2 text-left text-[12px] font-bold text-[#33305e] transition-colors hover:border-[#51d2c6] hover:bg-[#96e0d9]/30 disabled:opacity-50"
                disabled={isPending}
                key={prompt}
                onClick={() => void sendQuestion(prompt)}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>

          {error ? (
            <p className="mb-3 border border-red-200 bg-red-50 px-3 py-2 text-[13px] font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <form className="flex items-end gap-3" onSubmit={handleSubmit}>
            <Textarea
              className="max-h-[132px] min-h-[52px] resize-none rounded-none border-[#33305e]/15 bg-white text-[15px] text-[#33305e] shadow-none placeholder:text-[#33305e]/40 focus-visible:border-[#51d2c6] focus-visible:ring-[#51d2c6]/20"
              disabled={isPending}
              maxLength={700}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendQuestion(draft);
                }
              }}
              placeholder={`Ask about ${port.name}`}
              ref={inputRef}
              value={draft}
            />
            <Button
              aria-label="Send question"
              className="h-[52px] w-[52px] bg-[#33305e] text-white hover:bg-[#51d2c6]"
              disabled={isPending || !draft.trim()}
              size="icon"
              type="submit"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </aside>
    </div>
  );
}

export function PortChatButton({
  onClick,
  portName,
}: {
  onClick: () => void;
  portName: string;
}) {
  return (
    <Button
      aria-label={`Ask about ${portName}`}
      className="mt-7 h-11 border-[#33305e]/15 bg-white/80 px-4 text-[13px] font-bold text-[#33305e] transition-all hover:border-[#51d2c6] hover:bg-[#51d2c6] hover:text-white group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white group-hover:hover:bg-[#51d2c6]"
      onClick={onClick}
      type="button"
      variant="outline"
    >
      <MessageCircle className="h-4 w-4" />
      Ask AI
    </Button>
  );
}
