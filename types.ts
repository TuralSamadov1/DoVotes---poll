
export type Language = 'en' | 'fa';

export interface VoteData {
  yes: number;
  no: number;
  emergency: number;
  undecided: number;
  total: number;
  lastUpdate: string;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface TranslationStrings {
  title: string;
  question: string;
  options: {
    yes: string;
    no: string;
    emergency: string;
    undecided: string;
  };
  stats: {
    title: string;
    totalVotes: string;
    lastUpdate: string;
    votedThankYou: string;
    share: string;
    copied: string;
  };
  comments: {
    title: string;
    placeholder: string;
    submit: string;
    empty: string;
    identity: string;
  };
  disclaimer: string;
  switchLang: string;
}

export type OptionId = 'yes' | 'no' | 'emergency' | 'undecided';
