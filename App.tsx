
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language, VoteData, OptionId, Comment } from './types';
import { TRANSLATIONS, ICONS } from './constants';
import ProgressBar from './components/ProgressBar';

const STORAGE_KEY = 'dovotes_survey_voted';
const MOCK_DATA_KEY = 'dovotes_mock_global_data';
const COMMENTS_KEY = 'dovotes_mock_global_comments';
const IDENTITY_KEY = 'dovotes_user_identity';

const generateUsername = () => {
  const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 9) + 1).join('');
  return `user${digits}`; // user + 8 digits = 12 characters
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [results, setResults] = useState<VoteData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [commentText, setCommentText] = useState('');
  const [userIdentity, setUserIdentity] = useState('');
  
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';
  const commentListRef = useRef<HTMLDivElement>(null);

  // Identity setup
  useEffect(() => {
    let identity = localStorage.getItem(IDENTITY_KEY);
    if (!identity) {
      identity = generateUsername();
      localStorage.setItem(IDENTITY_KEY, identity);
    }
    setUserIdentity(identity);
  }, []);

  // Helper to get global state from "server" (localStorage)
  const getGlobalData = (): VoteData => {
    const stored = localStorage.getItem(MOCK_DATA_KEY);
    if (stored) return JSON.parse(stored);
    const initial: VoteData = {
      yes: 4231,
      no: 8562,
      emergency: 1204,
      undecided: 945,
      total: 14942,
      lastUpdate: new Date().toISOString()
    };
    localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(initial));
    return initial;
  };

  const getGlobalComments = (): Comment[] => {
    const stored = localStorage.getItem(COMMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  // Simulates activity from other users globally
  const simulateGlobalActivity = useCallback(() => {
    const currentData = getGlobalData();
    const options: OptionId[] = ['yes', 'no', 'emergency', 'undecided'];
    const newVotesCount = Math.floor(Math.random() * 3);
    if (newVotesCount > 0) {
      for (let i = 0; i < newVotesCount; i++) {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        currentData[randomOption] += 2;
        currentData.total += 2;
      }
      currentData.lastUpdate = new Date().toISOString();
      localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(currentData));
    }
  }, []);

  const refreshUI = useCallback(() => {
    setResults(getGlobalData());
    setComments(getGlobalComments());
    if (loading) setLoading(false);
  }, [loading]);

  useEffect(() => {
    const voted = localStorage.getItem(STORAGE_KEY);
    if (voted) setHasVoted(true);
    refreshUI();
    const simulationInterval = setInterval(simulateGlobalActivity, 4000);
    const pollingInterval = setInterval(refreshUI, 2000);
    return () => {
      clearInterval(simulationInterval);
      clearInterval(pollingInterval);
    };
  }, [refreshUI, simulateGlobalActivity]);

  const handleVote = (option: OptionId) => {
    if (hasVoted) return;
    const currentData = getGlobalData();
    currentData[option] += 2;
    currentData.total += 2;
    currentData.lastUpdate = new Date().toISOString();
    localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(currentData));
    localStorage.setItem(STORAGE_KEY, 'true');
    setResults({ ...currentData });
    setHasVoted(true);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      username: userIdentity,
      text: commentText.trim(),
      timestamp: new Date().toISOString()
    };

    const allComments = getGlobalComments();
    const updatedComments = [newComment, ...allComments].slice(0, 100); // Keep last 100
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments));
    setComments(updatedComments);
    setCommentText('');
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(t.question);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${t.question}\n\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 font-medium tracking-widest text-xs uppercase">Connecting...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 transition-all duration-300 ${isRtl ? 'font-sans' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="w-full max-w-xl flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-blue-600"></div>
           <h1 className="text-lg font-bold text-gray-900 tracking-tight">{t.title}</h1>
        </div>
        <button 
          onClick={() => setLang(prev => prev === 'en' ? 'fa' : 'en')}
          className="px-3 py-1.5 rounded-md bg-white border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
        >
          {t.switchLang}
        </button>
      </header>

      <main className="w-full max-w-xl flex-1 space-y-6">
        {/* Survey Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            {t.question}
          </h2>

          {!hasVoted ? (
            <div className="grid gap-3">
              {(['yes', 'no', 'emergency', 'undecided'] as OptionId[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleVote(opt)}
                  className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-left ${isRtl ? 'text-right flex-row-reverse' : ''}`}
                >
                  <span className="flex-shrink-0 text-blue-600">{ICONS[opt]}</span>
                  <span className="font-semibold text-gray-800">{t.options[opt]}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-blue-50 text-blue-700 p-4 rounded-xl flex flex-col gap-4 border border-blue-100">
                <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-blue-600 text-white p-1.5 rounded-full flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="text-sm font-bold tracking-tight">{t.stats.votedThankYou}</span>
                </div>
                
                <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <button onClick={handleTelegramShare} className="flex-1 flex items-center justify-center gap-2 bg-[#229ED9] text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95">{ICONS.telegram} <span className="hidden sm:inline">Telegram</span></button>
                  <button onClick={handleWhatsAppShare} className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95">{ICONS.whatsapp} <span className="hidden sm:inline">WhatsApp</span></button>
                  <button onClick={copyToClipboard} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${copied ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}>{copied ? ICONS.check : ICONS.share} <span>{copied ? t.stats.copied : t.stats.share}</span></button>
                </div>
              </div>

              {results && (
                <div>
                  <ProgressBar label={t.options.yes} percentage={(results.yes / results.total) * 100} count={results.yes} icon={ICONS.yes} isRtl={isRtl} />
                  <ProgressBar label={t.options.no} percentage={(results.no / results.total) * 100} count={results.no} icon={ICONS.no} isRtl={isRtl} />
                  <ProgressBar label={t.options.emergency} percentage={(results.emergency / results.total) * 100} count={results.emergency} icon={ICONS.emergency} isRtl={isRtl} />
                  <ProgressBar label={t.options.undecided} percentage={(results.undecided / results.total) * 100} count={results.undecided} icon={ICONS.undecided} isRtl={isRtl} />

                  <div className={`flex justify-between items-center mt-12 pt-6 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-black ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="flex flex-col">
                      <span>{t.stats.totalVotes}</span>
                      <span className="text-gray-900 text-lg mt-0.5 font-bold tabular-nums tracking-tighter">{results.total.toLocaleString()}</span>
                    </div>
                    <div className={`flex flex-col ${isRtl ? 'text-left' : 'text-right'}`}>
                      <span>{t.stats.lastUpdate}</span>
                      <span className="text-gray-900 mt-0.5 font-bold tabular-nums">{new Date(results.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Comments Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            {t.comments.title}
          </h3>

          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className={`mb-3 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider ${isRtl ? 'flex-row-reverse' : ''}`}>
               <span>{t.comments.identity}</span>
               <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{userIdentity}</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={t.comments.placeholder}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                maxLength={200}
              />
              <button 
                type="submit" 
                disabled={!commentText.trim()}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                {t.comments.submit}
              </button>
            </div>
          </form>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar" ref={commentListRef}>
            {comments.length === 0 ? (
              <p className="text-center py-10 text-gray-400 text-sm italic">{t.comments.empty}</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 animate-fadeIn">
                  <div className={`flex justify-between items-start mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{c.username}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                      {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">
                    {c.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="mt-8 px-4">
          <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed text-center max-w-sm mx-auto uppercase tracking-wider">
            {t.disclaimer}
          </p>
        </footer>
      </main>

      <div className="mt-auto pt-10 pb-4">
        <div className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">LIVE DATA FEED ACTIVE (X2 WEIGHT)</span>
        </div>
      </div>
    </div>
  );
};

export default App;
