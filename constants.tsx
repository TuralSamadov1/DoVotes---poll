
import React from 'react';
import { TranslationStrings } from './types';

export const TRANSLATIONS: Record<'en' | 'fa', TranslationStrings> = {
  en: {
    title: "DoVotes – Public Survey",
    question: "Will Khamenei leave the position of Supreme Leader of Iran this year?",
    options: {
      yes: "Yes, he will step down",
      no: "No, he will remain in office",
      emergency: "Emergency transition (death / extraordinary event)",
      undecided: "Undecided"
    },
    stats: {
      title: "Live Statistics",
      totalVotes: "Total Votes",
      lastUpdate: "Last Update",
      votedThankYou: "Your anonymous vote has been counted.",
      share: "Share Survey",
      copied: "Link copied!"
    },
    comments: {
      title: "Public Discussion",
      placeholder: "Write an anonymous comment...",
      submit: "Post",
      empty: "No comments yet.",
      identity: "Posting as:"
    },
    automation: {
      title: "Channel Automation",
      setup: "Telegram Channel Setup",
      botToken: "Bot Token",
      channelId: "Channel ID (e.g. @mychannel)",
      enable: "Enable Auto-Posting (2x Daily)",
      save: "Save Config",
      statusActive: "Automation Active",
      statusInactive: "Automation Disabled",
      lastPost: "Last Post:",
      postNow: "Post to Channel Now"
    },
    disclaimer: "This platform shares survey results only. No opinions, no analysis, no news. Data shown represents anonymous public opinion.",
    switchLang: "فارسی"
  },
  fa: {
    title: "نظرسنجی عمومی – DoVotes",
    question: "آیا خامنه‌ای در سال جاری از مقام رهبری جمهوری اسلامی ایران کناره‌گیری خواهد کرد؟",
    options: {
      yes: "بله، کناره‌گیری خواهد کرد",
      no: "خیر، در مقام خود باقی خواهد ماند",
      emergency: "انتقال اضطراری (فوت / رویداد فوق‌العاده)",
      undecided: "مردد / نامشخص"
    },
    stats: {
      title: "آمار زنده",
      totalVotes: "مجموع آرا",
      lastUpdate: "آخرین بروزرسانی",
      votedThankYou: "رأی ناشناس شما ثبت شد.",
      share: "اشتراک‌گذاری نظرسنجی",
      copied: "لینک کپی شد!"
    },
    comments: {
      title: "گفتگوی عمومی",
      placeholder: "یک نظر ناشناس بنویسید...",
      submit: "ارسال",
      empty: "هنوز نظری ثبت نشده است.",
      identity: "ارسال به عنوان:"
    },
    automation: {
      title: "اتوماسیون کانال",
      setup: "تنظیمات کانال تلگرام",
      botToken: "توکن ربات",
      channelId: "شناسه کانال (مثلاً @mychannel)",
      enable: "فعال‌سازی ارسال خودکار (۲ بار در روز)",
      save: "ذخیره تنظیمات",
      statusActive: "اتوماسیون فعال",
      statusInactive: "اتوماسیون غیرفعال",
      lastPost: "آخرین ارسال:",
      postNow: "ارسال دستی به کانال"
    },
    disclaimer: "این پلتفرم صرفاً نتایج نظرسنجی را به اشتراک می‌گذارد. بدون تحلیل، بدون خبر. داده‌ها نمایانگر افکار عمومیِ ناشناس است.",
    switchLang: "English"
  }
};

export const ICONS = {
  yes: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  no: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  emergency: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  undecided: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  share: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  telegram: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  ),
  whatsapp: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.01 2.01c-5.52 0-10 4.48-10 10 0 1.77.47 3.43 1.3 4.87L2.01 22l5.3-1.39c1.41.77 3.01 1.2 4.7 1.2 5.52 0 10-4.48 10-10 0-5.52-4.48-10-10-10zm5.95 14.21c-.25.7-1.46 1.36-2.01 1.45-.48.08-1.1.14-1.79-.08-.43-.14-1.02-.33-2.22-.84-2.11-.89-3.48-3.04-3.58-3.18-.1-.14-.85-1.13-.85-2.15s.53-1.53.72-1.73c.19-.2.43-.24.58-.24.14 0 .29 0 .41.01.12.01.29-.04.45.35.17.41.58 1.41.63 1.51.05.1.08.21.01.35-.07.14-.1.24-.21.36-.1.12-.23.27-.33.37-.11.1-.23.21-.1.43.14.22.61 1.01 1.31 1.63.9.8 1.66 1.05 1.89 1.17.23.12.36.1.49-.05.14-.14.58-.67.73-.9.15-.24.3-.2.5-.12.2.08 1.26.59 1.48.7.21.11.36.17.41.25.05.08.05.47-.2.93z"/>
    </svg>
  )
};
