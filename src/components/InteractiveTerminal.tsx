import { useEffect, useMemo, useRef, useState } from 'react';
import { TerminalSquare } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { profile } from '@/data/siteData';
import type { TerminalResponseLine } from '@/types';

type TerminalProps = {
  resumeAvailable: boolean;
  resumeHref: string;
};

type HistoryItem = {
  id: number;
  kind: 'command' | 'response' | 'system';
  text?: string;
  lines?: TerminalResponseLine[];
};

const quickCommands = ['about', 'skills', 'projects', 'learning', 'github', 'contact'];
const supportedCommands = ['help', ...quickCommands, 'clear'];

function buildResponse(command: string): TerminalResponseLine[] {
  switch (command) {
    case 'help':
      return [
        { type: 'text', text: 'Available actions:' },
        { type: 'bullet', text: quickCommands.join(', ') },
      ];
    case 'about':
      return [
        { type: 'text', text: profile.name },
        { type: 'bullet', text: profile.degree },
        { type: 'bullet', text: `Graduating ${profile.graduation}` },
        { type: 'bullet', text: 'Interested in DevOps and Cloud internships' },
      ];
    case 'skills':
      return [
        { type: 'text', text: 'Practiced: Python, Linux, Git, GitHub, Docker' },
        { type: 'bullet', text: 'Working knowledge: Jenkins and AWS fundamentals' },
        { type: 'bullet', text: 'Currently learning: AWS and Terraform basics' },
      ];
    case 'projects':
      return [
        { type: 'text', text: 'CI/CD Pipeline Project' },
        { type: 'bullet', text: 'GitHub, Docker, Jenkins, and Linux' },
        { type: 'link', text: 'Open project repository', href: 'https://github.com/sowmiiiiyaa/task' },
      ];
    case 'learning':
      return [
        { type: 'text', text: 'Currently learning:' },
        { type: 'bullet', text: 'AWS cloud fundamentals' },
        { type: 'bullet', text: 'Terraform basics' },
      ];
    case 'github':
      return [{ type: 'link', text: 'Open GitHub profile', href: profile.github }];
    case 'contact':
      return [
        { type: 'link', text: `Email: ${profile.email}`, href: `mailto:${profile.email}` },
        { type: 'link', text: 'LinkedIn profile', href: profile.linkedin },
      ];
    default:
      return [{ type: 'text', text: "Command not found. Type 'help' to see available actions." }];
  }
}

export function InteractiveTerminal(_props: TerminalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 1, kind: 'system', text: 'Portfolio Explorer ready.' },
  ]);
  const [command, setCommand] = useState('');
  const [typedCommand, setTypedCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const outputRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<number | null>(null);
  const finishTimer = useRef<number | null>(null);
  const nextId = useRef(2);
  const reducedMotion = useReducedMotion();
  const commandChips = useMemo(() => quickCommands, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const interval = window.setInterval(() => setCursorVisible((current) => !current), 520);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [history, typedCommand]);

  useEffect(() => () => {
    if (typingTimer.current) window.clearInterval(typingTimer.current);
    if (finishTimer.current) window.clearTimeout(finishTimer.current);
  }, []);

  const appendResponse = (normalizedCommand: string) => {
    if (normalizedCommand === 'clear') {
      setHistory([{ id: 1, kind: 'system', text: 'Portfolio Explorer cleared.' }]);
      return;
    }

    setHistory((current) => [
      ...current,
      { id: nextId.current++, kind: 'command', text: normalizedCommand },
      { id: nextId.current++, kind: 'response', lines: buildResponse(normalizedCommand) },
    ]);
  };

  const runCommand = (value: string, animate = false) => {
    const normalizedCommand = value.trim().toLowerCase();
    if (!normalizedCommand || isTyping) return;

    setCommand('');
    setCommandHistory((current) => [...current, normalizedCommand].slice(-20));
    setHistoryIndex(-1);

    if (!animate || reducedMotion) {
      appendResponse(normalizedCommand);
      return;
    }

    setIsTyping(true);
    setTypedCommand('');
    let index = 0;
    typingTimer.current = window.setInterval(() => {
      index += 1;
      setTypedCommand(normalizedCommand.slice(0, index));
      if (index >= normalizedCommand.length) {
        if (typingTimer.current) window.clearInterval(typingTimer.current);
        finishTimer.current = window.setTimeout(() => {
          setTypedCommand('');
          setIsTyping(false);
          appendResponse(normalizedCommand);
        }, 120);
      }
    }, 32);
  };

  const submitCommand = () => {
    if (command.trim()) runCommand(command, false);
  };

  return (
    <section id="terminal" className="section-shell">
      <div className="space-y-4">
        <div className="max-w-3xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Terminal</p>
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Explore the portfolio.</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {commandChips.map((chip) => (
            <button key={chip} type="button" className="chip focus-ring font-mono text-xs uppercase tracking-[0.25em]" onClick={() => runCommand(chip, true)}>
              {chip}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-electric/20 bg-[#050d19] shadow-glow">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-cyanGlow/80">
              <TerminalSquare className="h-4 w-4" aria-hidden="true" />
              portfolio
            </div>
          </div>

          <div ref={outputRef} role="log" aria-live="polite" className="terminal-scrollbar max-h-[22rem] overflow-y-auto px-4 py-4 font-mono text-sm leading-6 text-slate-200 md:px-5">
            {history.map((entry) => entry.kind === 'system' ? (
              <p key={entry.id} className="text-cyanGlow/90">{entry.text}</p>
            ) : entry.kind === 'command' ? (
              <p key={entry.id} className="text-white"><span className="text-cyanGlow">sowmiya@portfolio</span>:<span className="text-sky-300">~</span>$ {entry.text}</p>
            ) : (
              <div key={entry.id} className="mb-4 space-y-1 text-slate-300">
                {entry.lines?.map((line, lineIndex) => line.type === 'link' ? (
                  <a key={`${entry.id}-${lineIndex}`} href={line.href} target="_blank" rel="noreferrer" className="block text-cyanGlow underline decoration-cyanGlow/40 underline-offset-4 transition hover:text-white">{line.text}</a>
                ) : line.type === 'bullet' ? (
                  <p key={`${entry.id}-${lineIndex}`} className="pl-4 text-slate-300"><span className="mr-2 text-cyanGlow">-</span>{line.text}</p>
                ) : (
                  <p key={`${entry.id}-${lineIndex}`}>{line.text}</p>
                ))}
              </div>
            ))}

            <div className="mt-5 flex items-start gap-2 text-white">
              <span className="text-cyanGlow">sowmiya@portfolio</span>:<span className="text-sky-300">~</span>$
              <input
                value={isTyping ? typedCommand : command}
                onChange={(event) => { setCommand(event.target.value); setHistoryIndex(-1); }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    submitCommand();
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    if (commandHistory.length > 0) {
                      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                      setHistoryIndex(nextIndex);
                      setCommand(commandHistory[commandHistory.length - 1 - nextIndex]);
                    }
                  } else if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    if (historyIndex > 0) {
                      const nextIndex = historyIndex - 1;
                      setHistoryIndex(nextIndex);
                      setCommand(commandHistory[commandHistory.length - 1 - nextIndex]);
                    } else {
                      setHistoryIndex(-1);
                      setCommand('');
                    }
                  }
                }}
                placeholder="type an action or click above"
                className="ml-1 w-full border-none bg-transparent text-white placeholder:text-slate-500 focus:ring-0"
                aria-label="Portfolio Explorer command input"
                autoComplete="off"
                readOnly={isTyping}
              />
              <span className={`mt-1 h-4 w-2 bg-cyanGlow transition-opacity ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-400">Available actions: {supportedCommands.join(', ')}</p>
      </div>
    </section>
  );
}
