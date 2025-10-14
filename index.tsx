
import { GoogleGenAI, Type } from "@google/genai";

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const counterDisplay = document.getElementById('counter') as HTMLDivElement;
    const counterWrapper = document.querySelector('.counter-wrapper') as HTMLElement;
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
    
    // Top Bar
    const dhikrSelectButton = document.getElementById('dhikr-select-button') as HTMLButtonElement;
    const adhkarButton = document.getElementById('adhkar-button') as HTMLButtonElement;
    const settingsButton = document.getElementById('settings-button') as HTMLButtonElement;
    const statsButton = document.getElementById('stats-button') as HTMLButtonElement;
    const quranButton = document.getElementById('quran-button') as HTMLButtonElement;
    const historyButton = document.getElementById('history-button') as HTMLButtonElement;
    const remindersButton = document.getElementById('reminders-button') as HTMLButtonElement;
    const quranGoalsButton = document.getElementById('quran-goals-button') as HTMLButtonElement;

    // Sidenav Elements
    const menuToggleButton = document.getElementById('menu-toggle-button') as HTMLButtonElement;
    const sideNav = document.getElementById('side-nav') as HTMLElement;
    const sidenavOverlay = document.getElementById('sidenav-overlay') as HTMLDivElement;
    const closeSidenavButton = document.getElementById('close-sidenav-button') as HTMLButtonElement;
    const sidenavDhikrSelectButton = document.getElementById('sidenav-dhikr-select-button') as HTMLButtonElement;
    const sidenavRemindersButton = document.getElementById('sidenav-reminders-button') as HTMLButtonElement;
    const sidenavHistoryButton = document.getElementById('sidenav-history-button') as HTMLButtonElement;
    const sidenavStatsButton = document.getElementById('sidenav-stats-button') as HTMLButtonElement;
    const sidenavQuranButton = document.getElementById('sidenav-quran-button') as HTMLButtonElement;
    const sidenavQuranGoalsButton = document.getElementById('sidenav-quran-goals-button') as HTMLButtonElement;
    const sidenavAdhkarButton = document.getElementById('sidenav-adhkar-button') as HTMLButtonElement;
    const sidenavFortressButton = document.getElementById('sidenav-fortress-button') as HTMLButtonElement;
    const sidenavNoticeButton = document.getElementById('sidenav-notice-button') as HTMLButtonElement;
    const sidenavSettingsButton = document.getElementById('sidenav-settings-button') as HTMLButtonElement;

    // Bottom Bar
    const soundToggleButton = document.getElementById('sound-toggle-button') as HTMLButtonElement;
    const vibrationToggleButton = document.getElementById('vibration-toggle-button') as HTMLButtonElement;

    // Modals & Controls
    const settingsModal = document.getElementById('settings-modal') as HTMLDivElement;
    const closeSettingsButton = document.getElementById('close-settings') as HTMLButtonElement;
    
    const dhikrListModal = document.getElementById('dhikr-list-modal') as HTMLDivElement;
    const closeDhikrListButton = document.getElementById('close-dhikr-list') as HTMLButtonElement;
    const dhikrListContainer = document.getElementById('dhikr-list') as HTMLDivElement;
    const newDhikrInput = document.getElementById('new-dhikr-input') as HTMLInputElement;
    const saveNewDhikrButton = document.getElementById('save-new-dhikr-button') as HTMLButtonElement;

    const goalReachedModal = document.getElementById('goal-reached-modal') as HTMLDivElement;
    const closeGoalModalButton = document.getElementById('close-goal-modal') as HTMLButtonElement;
    
    // Theme
    const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;

    // Goal & Progress
    const goalDisplay = document.getElementById('goal-display') as HTMLDivElement;
    const progressBar = document.getElementById('progress-bar') as HTMLDivElement;
    
    // Set Goal Modal
    const setGoalModal = document.getElementById('set-goal-modal') as HTMLDivElement;
    const closeSetGoalModalButton = document.getElementById('close-set-goal-modal') as HTMLButtonElement;
    const setGoalDhikrNameDisplay = document.getElementById('set-goal-dhikr-name') as HTMLParagraphElement;
    const setGoalInput = document.getElementById('set-goal-input') as HTMLInputElement;
    const setGoalSaveButton = document.getElementById('set-goal-save-button') as HTMLButtonElement;

    // Stats Modal
    const statsModal = document.getElementById('stats-modal') as HTMLDivElement;
    const closeStatsButton = document.getElementById('close-stats') as HTMLButtonElement;
    const statsDhikrSelect = document.getElementById('stats-dhikr-select') as HTMLSelectElement;
    const statsPeriodTabs = document.getElementById('stats-period-tabs') as HTMLDivElement;
    const statsDisplay = document.getElementById('stats-display') as HTMLParagraphElement;
    const statsChartBar = document.getElementById('stats-chart-bar') as HTMLDivElement;
    const statsChartLabel = document.getElementById('stats-chart-label') as HTMLSpanElement;
    const statsGoalDisplay = document.getElementById('stats-goal-display') as HTMLParagraphElement;

    // Adhkar Modal
    const adhkarModal = document.getElementById('adhkar-modal') as HTMLDivElement;
    const adhkarModalTitle = document.getElementById('adhkar-title') as HTMLHeadingElement;
    const closeAdhkarButton = document.getElementById('close-adhkar') as HTMLButtonElement;
    const adhkarListContainer = document.querySelector('#adhkar-modal .adhkar-list') as HTMLDivElement;
    const adhkarSearchInput = document.getElementById('adhkar-search-input') as HTMLInputElement;

    // History Modal
    const historyModal = document.getElementById('history-modal') as HTMLDivElement;
    const closeHistoryButton = document.getElementById('close-history') as HTMLButtonElement;
    const historyContent = document.getElementById('history-content') as HTMLDivElement;
    const clearHistoryButton = document.getElementById('clear-history-button') as HTMLButtonElement;

    // Clear History Confirmation Modal
    const clearHistoryConfirmModal = document.getElementById('clear-history-confirm-modal') as HTMLDivElement;
    const closeClearHistoryModalButton = document.getElementById('close-clear-history-modal') as HTMLButtonElement;
    const clearHistoryYesButton = document.getElementById('clear-history-yes') as HTMLButtonElement;
    const clearHistoryNoButton = document.getElementById('clear-history-no') as HTMLButtonElement;

    // Dhikr Scroller & Background
    const dhikrScrollerContainer = document.getElementById('dhikr-scroller-container') as HTMLDivElement;
    // Fix: Safely cast to SVGTextPathElement by first casting to unknown to resolve TypeScript error.
    const dhikrBackgroundText = document.getElementById('dhikr-background-text') as unknown as SVGTextPathElement;

    // Audio
    const clickSound = document.getElementById('click-sound') as HTMLAudioElement;

    // Vibration Settings
    const setGoalVibrationButton = document.getElementById('set-goal-vibration-button') as HTMLButtonElement;
    const setResetVibrationButton = document.getElementById('set-reset-vibration-button') as HTMLButtonElement;
    
    // Vibration Pattern Modal
    const vibrationPatternModal = document.getElementById('vibration-pattern-modal') as HTMLDivElement;
    const closeVibrationPatternModalButton = document.getElementById('close-vibration-pattern-modal') as HTMLButtonElement;
    const vibrationPatternTitle = document.getElementById('vibration-pattern-title') as HTMLHeadingElement;
    const vibrationPatternInput = document.getElementById('vibration-pattern-input') as HTMLInputElement;
    const testVibrationPatternButton = document.getElementById('test-vibration-pattern-button') as HTMLButtonElement;
    const saveVibrationPatternButton = document.getElementById('save-vibration-pattern-button') as HTMLButtonElement;
    const resetVibrationPatternButton = document.getElementById('reset-vibration-pattern-button') as HTMLButtonElement;

    // Gemini AI Modal
    const aiSuggestButton = document.getElementById('ai-suggest-button') as HTMLButtonElement;
    const geminiModal = document.getElementById('gemini-modal') as HTMLDivElement;
    const geminiModalTitle = document.getElementById('gemini-title') as HTMLHeadingElement;
    const closeGeminiModalButton = document.getElementById('close-gemini-modal') as HTMLButtonElement;
    const geminiPromptInput = document.getElementById('gemini-prompt-input') as HTMLInputElement;
    const geminiGenerateButton = document.getElementById('gemini-generate-button') as HTMLButtonElement;
    const geminiResultsContainer = document.getElementById('gemini-results-container') as HTMLDivElement;
    const geminiButtonText = geminiGenerateButton.querySelector('.button-text') as HTMLSpanElement;
    const geminiLoader = geminiGenerateButton.querySelector('.loader') as HTMLDivElement;

    // Reset Confirmation Modal
    const resetConfirmModal = document.getElementById('reset-confirm-modal') as HTMLDivElement;
    const closeResetConfirmModalButton = document.getElementById('close-reset-confirm-modal') as HTMLButtonElement;
    const resetConfirmYesButton = document.getElementById('reset-confirm-yes') as HTMLButtonElement;
    const resetConfirmNoButton = document.getElementById('reset-confirm-no') as HTMLButtonElement;

    // Delete Dhikr Confirmation Modal
    const deleteDhikrConfirmModal = document.getElementById('delete-dhikr-confirm-modal') as HTMLDivElement;
    const closeDeleteDhikrModalButton = document.getElementById('close-delete-dhikr-modal') as HTMLButtonElement;
    const deleteDhikrYesButton = document.getElementById('delete-dhikr-yes') as HTMLButtonElement;
    const deleteDhikrNoButton = document.getElementById('delete-dhikr-no') as HTMLButtonElement;
    const deleteDhikrNameDisplay = document.getElementById('delete-dhikr-name') as HTMLParagraphElement;

    // Reminders Modal
    const remindersModal = document.getElementById('reminders-modal') as HTMLDivElement;
    const closeRemindersModalButton = document.getElementById('close-reminders-modal') as HTMLButtonElement;
    const remindersList = document.getElementById('reminders-list') as HTMLDivElement;
    const addReminderButton = document.getElementById('add-reminder-button') as HTMLButtonElement;
    const remindersPermissionStatus = document.getElementById('reminders-permission-status') as HTMLParagraphElement;
    const showHowToNotificationsButton = document.getElementById('show-how-to-notifications-button') as HTMLButtonElement;


    // Add Reminder Modal
    const addReminderModal = document.getElementById('add-reminder-modal') as HTMLDivElement;
    const closeAddReminderModalButton = document.getElementById('close-add-reminder-modal') as HTMLButtonElement;
    const reminderDhikrSelect = document.getElementById('reminder-dhikr-select') as HTMLSelectElement;
    const reminderTimeInput = document.getElementById('reminder-time-input') as HTMLInputElement;
    const saveReminderButton = document.getElementById('save-reminder-button') as HTMLButtonElement;

    // How-to Notifications Modal
    const howToNotificationsModal = document.getElementById('how-to-notifications-modal') as HTMLDivElement;
    const closeHowToModalButton = document.getElementById('close-how-to-modal') as HTMLButtonElement;
    const closeHowToNotificationsModalButton = document.getElementById('close-how-to-notifications-modal') as HTMLButtonElement;

    // Delete Reminder Confirmation Modal
    const deleteReminderConfirmModal = document.getElementById('delete-reminder-confirm-modal') as HTMLDivElement;
    const closeDeleteReminderModalButton = document.getElementById('close-delete-reminder-modal') as HTMLButtonElement;
    const deleteReminderYesButton = document.getElementById('delete-reminder-yes') as HTMLButtonElement;
    const deleteReminderNoButton = document.getElementById('delete-reminder-no') as HTMLButtonElement;

    // New Settings Elements
    const notificationSoundSelect = document.getElementById('notification-sound-select') as HTMLSelectElement;
    const vibrationIntensitySlider = document.getElementById('vibration-intensity-slider') as HTMLInputElement;
    const inactivityReminderToggle = document.getElementById('inactivity-reminder-toggle') as HTMLInputElement;
    const inactivityReminderOptions = document.getElementById('inactivity-reminder-options') as HTMLDivElement;
    const inactivityReminderSelect = document.getElementById('inactivity-reminder-select') as HTMLSelectElement;

    // New Audio Elements for Notifications
    const notificationSounds = {
        ding: document.getElementById('notification-sound-ding') as HTMLAudioElement,
        bell: document.getElementById('notification-sound-bell') as HTMLAudioElement,
        subtle: document.getElementById('notification-sound-subtle') as HTMLAudioElement,
    };

    // Adhkar Session View Elements
    const adhkarSessionView = document.getElementById('adhkar-session-view') as HTMLDivElement;
    const adhkarSessionBackButton = document.getElementById('adhkar-session-back-button') as HTMLButtonElement;
    const adhkarSessionTitle = document.getElementById('adhkar-session-title') as HTMLHeadingElement;
    const adhkarSessionProgressBar = document.getElementById('adhkar-session-progress-bar') as HTMLDivElement;
    const adhkarSessionContent = document.getElementById('adhkar-session-content') as HTMLDivElement;
    const adhkarSessionTextDisplay = document.getElementById('adhkar-session-text-display') as HTMLParagraphElement;
    const adhkarSessionCounter = document.getElementById('adhkar-session-counter') as HTMLParagraphElement;
    const adhkarSessionPrevButton = document.getElementById('adhkar-session-prev-button') as HTMLButtonElement;
    const adhkarSessionNextButton = document.getElementById('adhkar-session-next-button') as HTMLButtonElement;

    // Quran Browser View Elements
    const quranBrowserView = document.getElementById('quran-browser-view') as HTMLDivElement;
    const quranBrowserBackButton = document.getElementById('quran-browser-back-button') as HTMLButtonElement;
    const quranIframe = document.getElementById('quran-iframe') as HTMLIFrameElement;

    // Notice Modal Elements
    const noticeModal = document.getElementById('notice-modal') as HTMLDivElement;
    const closeNoticeModalButton = document.getElementById('close-notice-modal') as HTMLButtonElement;
    const closeNoticeModalMainButton = document.getElementById('close-notice-modal-main') as HTMLButtonElement;

    // Quran Goals Elements
    const quranGoalsModal = document.getElementById('quran-goals-modal') as HTMLDivElement;
    const closeQuranGoalsModalButton = document.getElementById('close-quran-goals-modal') as HTMLButtonElement;
    const quranGoalsListContainer = document.getElementById('quran-goals-list') as HTMLDivElement;
    const addNewQuranGoalButton = document.getElementById('add-new-quran-goal-button') as HTMLButtonElement;

    const addQuranGoalModal = document.getElementById('add-quran-goal-modal') as HTMLDivElement;
    const addQuranGoalModalTitle = document.getElementById('add-quran-goal-title') as HTMLHeadingElement;
    const closeAddQuranGoalModalButton = document.getElementById('close-add-quran-goal-modal') as HTMLButtonElement;
    const quranGoalSurahInput = document.getElementById('quran-goal-surah-input') as HTMLInputElement;
    const quranGoalAmountSelect = document.getElementById('quran-goal-amount-select') as HTMLSelectElement;
    const quranGoalCustomRangeContainer = document.getElementById('quran-goal-custom-range-container') as HTMLDivElement;
    const quranGoalPageFromInput = document.getElementById('quran-goal-page-from-input') as HTMLInputElement;
    const quranGoalPageToInput = document.getElementById('quran-goal-page-to-input') as HTMLInputElement;
    const quranGoalPeriodSelect = document.getElementById('quran-goal-period-select') as HTMLSelectElement;
    const saveQuranGoalButton = document.getElementById('save-quran-goal-button') as HTMLButtonElement;
    const quranGoalReminderToggle = document.getElementById('quran-goal-reminder-toggle') as HTMLInputElement;
    const quranGoalReminderTimeContainer = document.getElementById('quran-goal-reminder-time-container') as HTMLDivElement;
    const quranGoalReminderTimeInput = document.getElementById('quran-goal-reminder-time-input') as HTMLInputElement;

    const deleteQuranGoalConfirmModal = document.getElementById('delete-quran-goal-confirm-modal') as HTMLDivElement;
    const closeDeleteQuranGoalModalButton = document.getElementById('close-delete-quran-goal-modal') as HTMLButtonElement;
    const deleteQuranGoalYesButton = document.getElementById('delete-quran-goal-yes') as HTMLButtonElement;
    const deleteQuranGoalNoButton = document.getElementById('delete-quran-goal-no') as HTMLButtonElement;

    const logQuranProgressModal = document.getElementById('log-quran-progress-modal') as HTMLDivElement;
    const closeLogQuranProgressModalButton = document.getElementById('close-log-quran-progress-modal') as HTMLButtonElement;
    const logQuranGoalNameDisplay = document.getElementById('log-quran-goal-name') as HTMLParagraphElement;
    const logQuranPageFromInput = document.getElementById('log-quran-page-from-input') as HTMLInputElement;
    const logQuranPageToInput = document.getElementById('log-quran-page-to-input') as HTMLInputElement;
    const logQuranProgressSaveButton = document.getElementById('log-quran-progress-save') as HTMLButtonElement;
    const logQuranProgressCancelButton = document.getElementById('log-quran-progress-cancel') as HTMLButtonElement;


    // --- SVG Icons ---
    const ICONS = {
        soundOn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L8 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
        soundOff: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51c.63-1.09.98-2.36.98-3.71 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,
        vibrationOn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 15h2V9H0v6zm3 2h2V7H3v10zm19-8v6h2V9h-2zm-3 8h2V7h-2v10zM16.5 3h-9C6.67 3 6 3.67 6 4.5v15c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM16 19H8V5h8v14z"/></svg>`,
        vibrationOff: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.83 5.24 2.56 3.97l1.41-1.41 15.49 15.49-1.41 1.41-2.12-2.12H7.5c-.83 0-1.5-.67-1.5-1.5v-10.2L3.83 5.24zM8 5h8v10.17l-2-2V7h-2v2.17l-2-2V5zm8 14h-8v-1.17l2 2V19h4v-1.17l2 2V19zM0 15h2V9H0v6zm3 2h2V7H3v10zm19-8v6h2V9h-2zm-3 8h2V7h-2v10z"/></svg>`,
        trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
        goal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/></svg>`,
        edit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
        favorite: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
        favoriteBorder: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>`,
        bell: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>`
    };

    // --- Default Dhikr List ---
    const DEFAULT_DHIKR_LIST = [
        'استغفر الله',
        'سبحان الله',
        'الحمد لله',
        'لا اله الا الله',
        'الله اكبر',
        'اللهم صل وسلم وبارك على نبينا محمد',
        'لا اله الا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير',
        'سبحان الله وبحمده سبحان الله العظيم'
    ];

    // --- Fortress of the Muslim Data ---
    const FORTRESS_OF_THE_MUSLIM = [
    {
        title: 'أذكار الصباح',
        items: [
            { text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّْطَانِ الرَّجِيمِ\n﴿اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...﴾ [آية الكرسي]', count: 1 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ هُوَ اللَّهُ أَحَدٌ...﴾ [سورة الإخلاص]', count: 3 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...﴾ [سورة الفلق]', count: 3 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ...﴾ [سورة الناس]', count: 3 },
            { text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيُومِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيُومِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.', count: 1 },
            { text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.', count: 1 },
            { text: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.', count: 1 },
            { text: 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ.', count: 4 },
            { text: 'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.', count: 1 },
            { text: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ.', count: 3 },
            { text: 'حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.', count: 7 },
            { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.', count: 1 },
            { text: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ.', count: 1 },
            { text: 'بِسْمِ اللَّهِ الَّذي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.', count: 3 },
            { text: 'رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيَّاً.', count: 3 },
            { text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.', count: 1 },
            { text: 'أَصْبَحْنَا عَلَى فِطْرَةِ الإِسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صلى الله عليه وسلم، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ.', count: 1 },
            { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.', count: 100 },
            { text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.', count: 10 },
            { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.', count: 3 },
            { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً، وَرِزْقاً طَيِّباً، وَعَمَلاً مُتَقَبَّلاً.', count: 1 },
            { text: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.', count: 100 },
            { text: 'اللَّهُمَّ صَلِّ وَسَلِِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ.', count: 10 }
        ]
    },
    {
        title: 'أذكار المساء',
        items: [
            { text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\n﴿اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...﴾ [آية الكرسي]', count: 1 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ هُوَ اللَّهُ أَحَدٌ...﴾ [سورة الإخلاص]', count: 3 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...﴾ [سورة الفلق]', count: 3 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ...﴾ [سورة الناس]', count: 3 },
            { text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.', count: 1 },
            { text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ.', count: 1 },
            { text: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.', count: 1 },
            { text: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ.', count: 4 },
            { text: 'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.', count: 1 },
            { text: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ.', count: 3 },
            { text: 'حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.', count: 7 },
            { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.', count: 1 },
            { text: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ.', count: 1 },
            { text: 'بِسْمِ اللَّهِ الَّذي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.', count: 3 },
            { text: 'رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيَّاً.', count: 3 },
            { text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.', count: 1 },
            { text: 'أَمْسَيْنَا عَلَى فِطْرَةِ الإِسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صلى الله عليه وسلم، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ.', count: 1 },
            { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.', count: 100 },
            { text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.', count: 10 },
            { text: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.', count: 100 },
            { text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.', count: 3 },
            { text: 'اللَّهُمَّ صَلِّ وَسَلِِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ.', count: 10 }
        ]
    },
    {
        title: 'أذكار الاستيقاظ من النوم',
        items: [
            { text: 'الْحَمْـدُ لِلّهِ الّذي أَحْـيانا بَعْـدَ ما أَماتَـنا وَإليه النُّـشور.', count: 1 },
            { text: 'لا إلهَ إلاّ اللّهُ وَحْـدَهُ لا شَـريكَ له، لهُ المُلـكُ ولهُ الحَمـد، وهوَ على كلّ شيءٍ قدير، سُـبْحانَ اللهِ، والحمْـدُ لله ، ولا إلهَ إلاّ اللهُ، واللهُ أكبَر، وَلا حَولَ وَلا قوّة إلاّ باللّهِ العليّ العظيم، رَبِّ اغْفرْ لي.', count: 1 },
            { text: 'الْحَمْـدُ لِلّهِ الّذي عافاني في جَسَدي وَرَدّ عَليّ روحي وَأَذِنَ لي بِذِكْرِه.', count: 1 }
        ]
    },
    {
        title: 'الدعاء عند لبس الثوب',
        items: [
            { text: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ.', count: 1 }
        ]
    },
    {
        title: 'الدعاء عند لبس ثوب جديد',
        items: [
            { text: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ.', count: 1 }
        ]
    },
    {
        title: 'ما يقول إذا وضع ثوبه',
        items: [
            { text: 'بِسْمِ اللَّهِ.', count: 1 }
        ]
    },
    {
        title: 'دعاء دخول الخلاء',
        items: [
            { text: '[بِسْمِ اللَّهِ] اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الخروج من الخلاء',
        items: [
            { text: 'غُفْرَانَكَ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الخروج من المنزل',
        items: [
            { text: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.', count: 1 },
            { text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ، أَوْ أُضَلَّ، أَوْ أَزِلَّ، أَوْ أُزَلَّ، أَوْ أَظْلِمَ، أَوْ أُظْلَمَ، أَوْ أَجْهَلَ، أَوْ يُجْهَلَ عَلَيَّ.', count: 1 }
        ]
    },
    {
        title: 'دعاء دخول المنزل',
        items: [
            { text: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا، ثُمَّ لِيُسَلِِّمْ عَلَى أَهْلِهِ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الذهاب إلى المسجد',
        items: [
            { text: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ فِي سَمْعِي نُورًا، وَاجْعَلْ فِي بَصَرِي نُورًا، وَاجْعَلْ مِنْ خَلْفِي نُورًا، وَمِنْ أَمَامِي نُورًا، وَاجْعَلْ مِنْ فَوْقِي نُورًا، وَمِنْ تَحْتِي نُورًا، اللَّهُمَّ أَعْطِنِي نُورًا.', count: 1 }
        ]
    },
    {
        title: 'دعاء دخول المسجد',
        items: [
            { text: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. [بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ]. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الخروج من المسجد',
        items: [
            { text: 'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ.', count: 1 }
        ]
    },
    {
        title: 'أذكار الأذان',
        items: [
            { text: 'يَقُولُ مِثْلَ مَا يَقُولُ الْمُؤَذِّنُ إِلَّا فِي "حَيَّ عَلَى الصَّلَاةِ" و "حَيَّ عَلَى الْفَلَاحِ" فَيَقُولُ: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ".', count: 1 },
            { text: 'يَقُولُ: "وَأَنَا أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، رَضِيتُ بِاللَّهِ رَبًّا، وَبِمُحَمَّدٍ رَسُولًا، وَبِالْإِسْلامِ دِينًا" bَعْدَ تَشَهُّدِ الْمُؤَذِّنِ.', count: 1 },
            { text: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الاستفتاح في الصلاة',
        items: [
            { text: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ.', count: 1 },
            { text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الركوع',
        items: [
            { text: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ.', count: 3 },
            { text: 'سُبُّوحٌ قُدُّوسٌ، رَبُّ الْمَلَائِكَةِ وَالرُّوحِ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الرفع من الركوع',
        items: [
            { text: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ.', count: 1 },
            { text: 'رَبَّنَا وَلَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ.', count: 1 }
        ]
    },
    {
        title: 'دعاء السجود',
        items: [
            { text: 'سُبْحَانَ رَبِّيَ الْأَعْلَى.', count: 3 },
            { text: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، dِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الجلوس بين السجدتين',
        items: [
            { text: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي.', count: 1 },
            { text: 'اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَاجْبُرْنِي، وَعَافِنِي، وَارْزُقْنِي، وَارْفَعْنِي.', count: 1 }
        ]
    },
    {
        title: 'دعاء سجود التلاوة',
        items: [
            { text: 'سَجَدَ وَجْهِي لِلَّذِي خَلَقَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ، ﴿فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ﴾.', count: 1 }
        ]
    },
    {
        title: 'التشهد',
        items: [
            { text: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ، وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.', count: 1 }
        ]
    },
    {
        title: 'الصلاة على النبي ﷺ بعد التشهد',
        items: [
            { text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.', count: 1 }
        ]
    },
    {
        title: 'الدعاء بعد التشهد الأخير وقبل السلام',
        items: [
            { text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ.', count: 1 }
        ]
    },
    {
        title: 'الأذكار بعد السلام من الصلاة',
        items: [
            { text: 'أَسْتَغْفِرُ اللَّهَ', count: 3 },
            { text: 'اللَّهُمَّ أَنْتَ السَّلاَمُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.', count: 1 },
            { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.', count: 1 },
            { text: 'سُبْحَانَ اللَّهِ', count: 33 },
            { text: 'الْحَمْدُ لِلَّهِ', count: 33 },
            { text: 'اللَّهُ أَكْبَرُ', count: 33 },
            { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.', count: 1 },
            { text: '﴿اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...﴾ [آية الكرسي]', count: 1 },
            { text: '﴿قُلْ هُوَ اللَّهُ أَحَدٌ...﴾ [سورة الإخلاص]', count: 1 },
            { text: '﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...﴾ [سورة الفلق]', count: 1 },
            { text: '﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ...﴾ [سورة الناس]', count: 1 }
        ]
    },
    {
        title: 'دعاء صلاة الاستخارة',
        items: [
            { text: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ -وَيُسَمِّي حَاجَتَهُ- خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي، ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي بِهِ.', count: 1 }
        ]
    },
    {
        title: 'أذكار النوم',
        items: [
            { text: 'يجمع كفيه ثم ينفث فيهما فيقرأ: ﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾ و ﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ﴾ و ﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ﴾ ثم يمسح بهما ما استطاع من جسده يبدأ بهما على رأسه ووجهه وما أقبل من جسده.', count: 3 },
            { text: '﴿اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...﴾ [آية الكرسي]', count: 1 },
            { text: 'بِاسْمِكَ رَبِّ وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْfَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.', count: 1 },
            { text: 'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ.', count: 1 },
            { text: 'سُبْحَانَ اللَّهِ', count: 33 },
            { text: 'الْحَمْدُ لِلَّهِ', count: 33 },
            { text: 'اللَّهُ أَكْبَرُ', count: 34 }
        ]
    },
    { title: 'الدعاء إذا تقلب ليلاً', items: [{ text: 'لَا إِلَهَ إِلَّا اللَّهُ الْوَاحِدُ الْقَهّارُ، رَبُّ السَّمَوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الْعَزِيزُ الْغَفَّارُ.', count: 1 }] },
    { title: 'دعاء الفزع في النوم', items: [{ text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ.', count: 1 }] },
    { title: 'ما يفعل من رأى رؤيا أو حلماً', items: [{ text: '1. يَنْفُثُ عَنْ يَسَارِهِ (ثَلَاثًا).\n2. يَسْتَعِيذُ بِاللَّهِ مِنَ الشَّيْطَانِ وَمِنْ شَرِّ مَا رَأَى (ثَلَاثَ مَرَّاتٍ).\n3. لَا يُحَدِّثُ بِهَا أَحَدًا.\n4. يَتَحَوَّلُ عَنْ جَنْبِهِ الَّذِي كَانَ عَلَيْهِ.', count: 1 }] },
    { title: 'دعاء قلق في النوم ومن فزع', items: [{ text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ.', count: 1 }] },
    { title: 'الدعاء إذا رأى ما يحب أو يكره في المنام', items: [{ text: 'إِذَا رَأَى مَا يُحِبُّ: يَقُولُ "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ".\nإِذَا رَأَى مَا يَكْرَهُ: يَسْتَعِيذُ بِاللَّهِ مِنْ شَرِّهَا وَمِنْ شَرِّ الشَّيْطَانِ، وَيَنْفُثُ عَنْ يَسَارِهِ ثَلَاثًا، وَلَا يُحَدِّثُ بِهَا أَحَدًا فَإِنَّهَا لَنْ تَضُرَّهُ.', count: 1 }] },
    { title: 'الدعاء عند لبس الحذاء', items: [{ text: 'إذا انتعل أحدكم فليبدأ باليمين، وإذا نزع فليبدأ بالشمال، لتكن اليمنى أولهما تنعل وآخرهما تنزع.\nيقول: بِسْمِ اللَّهِ.', count: 1 }] },
    {
        title: 'دعاء دخول السوق',
        items: [
            { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.', count: 1 }
        ]
    },
    { title: 'الدعاء للمسلم بظهر الغيب', items: [{ text: 'دعوة المرء المسلم لأخيه بظهر الغيب مستجابة، عند رأسه ملك موكل كلما دعا لأخيه بخير، قال الملك الموكل به: آمين ولك بمثل.', count: 1 }] },
    { title: 'الدعاء لمن قال: إني أحبك في الله', items: [{ text: 'أَحَبَّكَ الَّذِي أَحْبَبْتَنِي لَهُ.', count: 1 }] },
    { title: 'الدعاء لمن أهدى هدية أو صنع معروفاً', items: [{ text: 'جَزَاكَ اللَّهُ خَيْرًا.', count: 1 }] },
    { title: 'الدعاء لمن قال: بارك الله فيك', items: [{ text: 'وَفِيكَ بَارَكَ اللَّهُ.', count: 1 }] },
    { title: 'الدعاء لمن لبس ثوباً جديداً', items: [{ text: 'الْبَسْ جَدِيدًا، وَعِشْ حَمِيدًا، وَمُتْ شَهِيدًا.', count: 1 }] },
    { title: 'الدعاء لمن يعزى', items: [{ text: 'إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى، وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى... فَلْتَصْبِرْ وَلْتَحْتَسِبْ.', count: 1 }] },
    { title: 'الدعاء للميت في الصلاة عليه', items: [{ text: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ...', count: 1 }] },
    { title: 'دعاء التعزية', items: [{ text: 'إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى، وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى... فَلْتَصْبِرْ وَلْتَحْتَسِبْ.', count: 1 }] },
    { title: 'الدعاء عند زيارة القبور', items: [{ text: 'السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ، مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، أَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ.', count: 1 }] },
    { title: 'دعاء المريض في عيادته', items: [{ text: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ.', count: 1 }, {text: 'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ.', count: 7}] },
    { title: 'الدعاء عند رؤية مبتلى', items: [{ text: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ، وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلًا.', count: 1 }] },
    {
        title: 'الدعاء عند الكرب',
        items: [
            { text: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.', count: 1 }
        ]
    },
    {
        title: 'دعاء الفرج عند الهم والحزن',
        items: [
            { text: 'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجِلَاءَ حُزْنِي، وَذَهَابَ هَمِّي.', count: 1 },
            { text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ.', count: 1 }
        ]
    },
    { title: 'دعاء لقاء العدو وذي السلطان', items: [{ text: 'اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ.', count: 1 }] },
    { title: 'الدعاء لمن خاف ظلم السلطان', items: [{ text: 'اللَّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ، وَرَبَّ الْعَرْشِ الْعَظِيمِ، كُنْ لِي جَارًا مِنْ فُلَانِ بْنِ فُلَانٍ، وَأَحْزَابِهِ مِنْ خَلَائِقِكَ؛ أَنْ يَفْرُطَ عَلَيَّ أَحَدٌ مِنْهُمْ أَوْ يَطْغَى، عَزَّ جَارُكَ، وَجَلَّ ثَنَاؤُكَ، وَلَا إِلَهَ إِلَّا أَنْتَ.', count: 1 }] },
    { title: 'الدعاء على العدو', items: [{ text: 'اللَّهُمَّ مُنْزِلَ الْكِتَابِ، سَرِيعَ الْحِسَابِ، اهْزِمِ الْأَحْزَابَ، اللَّهُمَّ اهْزِمْهُمْ وَزَلْزِلْهُمْ.', count: 1 }] },
    {
        title: 'دعاء من أصابه وسوسة في الإيمان',
        items: [
            { text: 'يَسْتَعِيذُ بِاللَّهِ وَيَنْتَهِي عَمَّا شَكَّ فِيهِ.', count: 1 },
            { text: 'يَقُولُ: آمَنْتُ بِاللَّهِ وَرُسُلِهِ.', count: 1 }
        ]
    },
    { title: 'الدعاء عند الغضب', items: [{ text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.', count: 1 }] },
    { title: 'الدعاء لمن قال: غفر الله لك', items: [{ text: 'وَلَكَ.', count: 1 }] },
    { title: 'الدعاء لمن ردّ عليك هدية أو صدقة', items: [{ text: 'جَزَاكَ اللَّهُ خَيْرًا فِي أَهْلِكَ وَمَالِكَ.', count: 1 }] },
    { title: 'الدعاء إذا نزل منزلاً', items: [{ text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.', count: 1 }] },
    {
        title: 'دعاء السفر',
        items: [
            { text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، ﴿سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ﴾ اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرِنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ.', count: 1 }
        ]
    },
    {
        title: 'دعاء ركوب الدابة',
        items: [
            { text: 'بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، ﴿سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ﴾ الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.', count: 1 }
        ]
    },
    {
        title: 'دعاء دخول القرية أو المدينة',
        items: [
            { text: 'اللَّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ، وَرَبَّ الْأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ، وَرَبَّ الشَّيَاطِينِ وَمَا أَضْلَلْنَ، وَرَبَّ الرِّيَاحِ وَمَا ذَرَيْنَ، أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا وَخَيْرَ مَا فِيهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا وَشَرِّ مَا فِيهَا.', count: 1 }
        ]
    },
    { title: 'دعاء دخول المنزل أثناء السفر', items: [{ text: 'نفس دعاء دخول المنزل.', count: 1 }] },
    { title: 'دعاء المقيم للمسافر', items: [{ text: 'أَسْتَوْدِعُ اللَّهَ دِينَكَ، وَأَمَانَتَكَ، وَخَوَاتِيمَ عَمَلِكَ.', count: 1 }] },
    { title: 'دعاء المسافر للمقيم', items: [{ text: 'أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لَا تَضِيعُ وَدَائِعُهُ.', count: 1 }] },
    { title: 'التكبير والتسبيح في سير السفر', items: [{ text: 'عند صعود المرتفعات: اللَّهُ أَكْبَرُ.', count: 1 }, { text: 'عند النزول من المنحدرات: سُبْحَانَ اللَّهِ.', count: 1 }] },
    { title: 'دعاء المبيت في السفر', items: [{ text: 'سَمِعَ سَامِعٌ بِحَمْدِ اللَّهِ وَحُسْنِ بَلَائِهِ عَلَيْنَا، رَبَّنَا صَاحِبْنَا وَأَفْضِلْ عَلَيْنَا، عَائِذًا بِاللَّهِ مِنَ النَّارِ.', count: 1 }] },
    { title: 'الدعاء عند الرجوع من السفر', items: [{ text: 'يُكَبِّرُ عَلَى كُلِّ شَرَفٍ ثَلَاثَ تَكْبِيرَاتٍ ثُمَّ يَقُولُ: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ. صَدَقَ اللَّهُ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ.', count: 1 }] },
    { title: 'دعاء ركوب السفينة', items: [{ text: 'بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا إِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ.', count: 1 }] },
    {
        title: 'الدعاء عند نزول المطر',
        items: [
            { text: 'اللَّهُمَّ صَيِّبًا نَافِعًا.', count: 1 }
        ]
    },
    {
        title: 'الدعاء عند سماع الرعد',
        items: [
            { text: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ.', count: 1 }
        ]
    },
    { title: 'الدعاء عند هبوب الريح', items: [{ text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا.', count: 1 }] },
    {
        title: 'الدعاء عند رؤية الهلال',
        items: [
            { text: 'اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، رَبِّي وَرَبُّكَ اللَّهُ.', count: 1 }
        ]
    },
    {
        title: 'الدعاء عند الإفطار للصائم',
        items: [
            { text: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ.', count: 1 }
        ]
    },
    { title: 'الدعاء عند السحور', items: [{ text: 'يُسَمِّي اللَّهَ تَعَالَى وَيَأْكُلُ.', count: 1 }] },
    { title: 'الدعاء عند رؤية باكورة الثمر', items: [{ text: 'اللَّهُمَّ بَارِكْ لَنَا فِي ثَمَرِنَا، وَبَارِكْ لَنَا فِي مَدِينَتِنَا، وَبَارِكْ لَنَا فِي صَاعِنَا، وَبَارِكْ لَنَا فِي مُدِّنَا.', count: 1 }] },
    { title: 'الدعاء عند المصيبة', items: [{ text: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا.', count: 1 }] },
    { title: 'الدعاء عند المرض', items: [{ text: 'بِسْمِ اللَّهِ.', count: 3 }, { text: 'أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ.', count: 7 }] },
    { title: 'الدعاء عند العطاس', items: [{ text: 'إذا عطس أحدكم فليقل: الْحَمْدُ لِلَّهِ، وليقل له أخوه أو صاحبه: يَرْحَمُكَ اللَّهُ. فإذا قال له: يرحمك الله، فليقل: يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ.', count: 1 }] },
    { title: 'الدعاء عند التثاؤب', items: [{ text: 'التثاؤب من الشيطان، فإذا تثاءب أحدكم فليكظم ما استطاع، فإن أحدكم إذا قال: "ها"، ضحك الشيطان.', count: 1 }] },
    { title: 'الدعاء لمن صنع إليك معروفاً', items: [{ text: 'جَزَاكَ اللَّهُ خَيْرًا.', count: 1 }] },
    { title: 'الدعاء إذا نُعي إليه المسلم', items: [{ text: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ.', count: 1 }] },
    {
        title: 'الدعاء عند ركوب الدابة أو السيارة',
        items: [
            { text: 'بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، ﴿سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ﴾ الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.', count: 1 }
        ]
    },
    { title: 'الدعاء عند بيع السلعة', items: [{ text: 'بَارَكَ اللَّهُ لِي فِي هَذِهِ الصَّفْقَةِ.', count: 1 }] },
    { title: 'الدعاء عند إبرام عقد النكاح', items: [{ text: 'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ.', count: 1 }] },
    { title: 'الدعاء عند الجماع', items: [{ text: 'بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا.', count: 1 }] },
    { title: 'الدعاء عند الخوف من الشرك', items: [{ text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ.', count: 1 }] },
    { title: 'الدعاء عند المصائب', items: [{ text: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا.', count: 1 }] },
    { title: 'الدعاء عند رؤية شيء يعجبه', items: [{ text: 'مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ.', count: 1 }] },
    {
        title: 'دعاء كفارة المجلس',
        items: [
            { text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ.', count: 1 }
        ]
    },
    {
        title: 'الاستغفار والتوبة',
        items: [
            { text: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ.', count: 1 },
            { text: 'سَيِّدُ الاِسْتِغْفَارِ: اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.', count: 1 }
        ]
    },
    { title: 'الدعاء الشامل لكل خير', items: [{ text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.', count: 1 }] },
    { title: 'الصلاة على النبي ﷺ', items: [{ text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ.', count: 1 }] }
];

    const PAGES_PER_AMOUNT = {
        hizb_quarter: 5,
        hizb_half: 10,
        hizb_three_quarters: 15,
        juz: 20
    };

    // --- State ---
    let state = {
        currentDhikr: DEFAULT_DHIKR_LIST[0],
        dhikrList: [...DEFAULT_DHIKR_LIST],
        counts: {}, // { 'سبحان الله': 123 }
        goals: {}, // { 'سبحان الله': 100 }
        stats: {}, // { '2023-10-27': { 'سبحان الله': 50, lastUpdated: 167... } }
        reminders: [], // { id: '...', dhikr: '...', time: 'HH:MM', enabled: true, lastTriggered: 'YYYY-MM-DD' }
        quranGoals: [], // [{ id, surah, ..., reminder: { enabled, time, lastTriggered } }]
        favoriteAdhkarCategories: [], // Array of category titles: ['أذكار الصباح', ...]
        lastInteractionTimestamp: Date.now(),
        settings: {
            sound: true,
            vibration: true,
            theme: 'forest',
            notificationSound: 'ding',
            vibrationIntensity: 40,
            vibrationPatterns: {
                goalReached: [200, 100, 200],
                counterReset: [100, 50, 100],
            },
            inactivityReminder: {
                enabled: false,
                duration: 120, // in minutes
            }
        }
    };
    
    let adhkarSessionState = {
        isActive: false,
        category: null,
        currentIndex: 0,
        currentCount: 0,
    };

    // Vibration pattern editing
    let editingVibrationEvent: 'goalReached' | 'counterReset' | null = null;
    const VIBRATION_DEFAULTS = {
        goalReached: [200, 100, 200],
        counterReset: [100, 50, 100],
    };

    // Management logic
    let dhikrToDelete: string | null = null;
    let dhikrToEditGoal: string | null = null;
    let reminderToDelete: { id: string; type: 'dhikr' | 'quran' } | null = null;
    let quranGoalToEditId: string | null = null;
    let quranGoalToDeleteId: string | null = null;
    let quranGoalToLogProgressId: string | null = null;

    // --- Core Functions ---

    const getToday = () => new Date().toISOString().split('T')[0];
    
    const getQuranGoalStatDescription = (goal) => {
        if (!goal) return '';
        const amountText = {
            hizb_quarter: 'ربع حزب',
            hizb_half: 'نصف حزب',
            hizb_three_quarters: 'ثلاثة أرباع الحزب',
            juz: 'جزء'
        };
    
        if (goal.amountType === 'custom') {
            return `${goal.surah ? `مراجعة سورة ${goal.surah}` : 'مراجعة'} (من ${goal.pageFrom} إلى ${goal.pageTo})`;
        } else {
            return `${goal.surah ? `تلاوة سورة ${goal.surah}` : 'تلاوة'} - ${amountText[goal.amountType]}`;
        }
    };

    const loadState = () => {
        const savedStateJSON = localStorage.getItem('sub7aState');
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);

            // Ensure default dhikr are always present
            const userAddedDhikr = savedState.dhikrList.filter(d => !DEFAULT_DHIKR_LIST.includes(d));
            const finalDhikrList = [...DEFAULT_DHIKR_LIST, ...userAddedDhikr];

            const defaultSettings = {
                sound: true,
                vibration: true,
                theme: 'forest',
                notificationSound: 'ding',
                vibrationIntensity: 40,
                vibrationPatterns: VIBRATION_DEFAULTS,
                inactivityReminder: {
                    enabled: false,
                    duration: 120,
                },
            };

            const mergedSettings = { ...defaultSettings, ...savedState.settings };
            mergedSettings.vibrationPatterns = { ...defaultSettings.vibrationPatterns, ...(savedState.settings?.vibrationPatterns || {}) };
            mergedSettings.inactivityReminder = { ...defaultSettings.inactivityReminder, ...(savedState.settings?.inactivityReminder || {}) };
            
            const mergedState = { ...state, ...savedState, settings: mergedSettings };
            mergedState.favoriteAdhkarCategories = savedState.favoriteAdhkarCategories || [];
            mergedState.quranGoals = savedState.quranGoals || [];
            mergedState.lastInteractionTimestamp = savedState.lastInteractionTimestamp || Date.now();
            state = mergedState;

            state.dhikrList = finalDhikrList;
            if (!state.dhikrList.includes(state.currentDhikr)) {
                state.currentDhikr = DEFAULT_DHIKR_LIST[0];
            }
            state.reminders = state.reminders || [];
        }
    };

    const saveState = () => {
        localStorage.setItem('sub7aState', JSON.stringify(state));
    };

    const updateCounterDisplay = () => {
        const count = state.counts[state.currentDhikr] || 0;
        const formattedCount = count.toString().padStart(2, '0');

        if (count < 10) {
            counterDisplay.innerHTML = `<span class="leading-zero">${formattedCount.charAt(0)}</span><span>${formattedCount.substring(1)}</span>`;
        } else {
            counterDisplay.textContent = formattedCount;
        }
    };

    const updateDhikrDisplay = () => {
        if (dhikrBackgroundText) {
            dhikrBackgroundText.textContent = state.currentDhikr;

            const textElement = dhikrBackgroundText as SVGTextPathElement; 
            const dhikrLength = state.currentDhikr.length;
            
            // Adjust font size dynamically to prevent long dhikr from overlapping
            // when it wraps around the circle.
            if (dhikrLength > 150) { // For very long text like Sayyidul Istighfar
                textElement.style.fontSize = '12px';
                textElement.style.letterSpacing = '-0.5px';
            } else if (dhikrLength > 90) { 
                textElement.style.fontSize = '14px';
                textElement.style.letterSpacing = '-0.5px';
            } else if (dhikrLength > 65) { // For long text like 'La ilaha illallah wahdahu...'
                textElement.style.fontSize = '17px';
                textElement.style.letterSpacing = '-0.5px';
            } else if (dhikrLength > 45) { // Medium length
                textElement.style.fontSize = '19px';
                textElement.style.letterSpacing = '0px';
            } else { // Short text
                textElement.style.fontSize = '22px';
                textElement.style.letterSpacing = '0.5px';
            }
        }
    };
    
    const updateProgressBar = () => {
        const count = state.counts[state.currentDhikr] || 0;
        const goal = state.goals[state.currentDhikr] || 0;
        if (goal > 0) {
            const percentage = Math.min((count / goal) * 100, 100);
            progressBar.style.width = `${percentage}%`;
            goalDisplay.textContent = `الهدف: ${count} / ${goal}`;
        } else {
            progressBar.style.width = '0%';
            goalDisplay.textContent = '';
        }
    };

    const vibrateDevice = (pattern?: number[]) => {
        if (!state.settings.vibration || typeof navigator.vibrate !== 'function') {
            return;
        }
        if (Array.isArray(pattern) && pattern.length > 0) {
            navigator.vibrate(pattern);
            return; 
        }
        if (state.settings.vibrationIntensity > 0) {
           navigator.vibrate(state.settings.vibrationIntensity);
        }
    };
    
    const playClickSound = () => {
        if (state.settings.sound) {
            clickSound.currentTime = 0;
            const promise = clickSound.play();
            if (promise !== undefined) {
                promise.catch(error => {
                    if (error.name !== 'NotAllowedError') {
                        console.error("Error playing sound:", error);
                    }
                });
            }
        }
    };

    const createRipple = (event) => {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        const rect = counterWrapper.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;

        const clientX = event.clientX || (event.touches && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);
        
        ripple.style.left = `${clientX - rect.left - size / 2}px`;
        ripple.style.top = `${clientY - rect.top - size / 2}px`;
        
        counterWrapper.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    };

    /**
     * Updates the timestamp of the last user interaction.
     */
    const updateLastInteractionTime = () => {
        state.lastInteractionTimestamp = Date.now();
    };


    /**
     * Central function to record an increment for any dhikr.
     * Updates the main counts and daily stats.
     */
    const recordDhikrIncrement = (dhikr: string) => {
        if (!dhikr) return;

        // Update main counter
        if (!state.counts[dhikr]) {
            state.counts[dhikr] = 0;
        }
        state.counts[dhikr]++;

        // Update stats
        const today = getToday();
        if (!state.stats[today]) state.stats[today] = {};
        if (!state.stats[today][dhikr]) state.stats[today][dhikr] = 0;
        state.stats[today][dhikr]++;
        state.stats[today].lastUpdated = Date.now();
    };

    // --- Adhkar Session Logic ---
    const renderAdhkarSession = () => {
        if (!adhkarSessionState.isActive || !adhkarSessionState.category) return;

        const category = adhkarSessionState.category;
        const currentIndex = adhkarSessionState.currentIndex;
        const item = category.items[currentIndex];

        adhkarSessionTitle.textContent = category.title;
        adhkarSessionTextDisplay.innerHTML = item.text.replace(/\n/g, '<br>');
        adhkarSessionCounter.textContent = `${adhkarSessionState.currentCount} / ${item.count}`;

        const progress = ((currentIndex + 1) / category.items.length) * 100;
        adhkarSessionProgressBar.style.width = `${progress}%`;

        adhkarSessionPrevButton.disabled = currentIndex === 0;
        adhkarSessionNextButton.disabled = currentIndex === category.items.length - 1;
    };
    
    const startAdhkarSession = (categoryIndex: number) => {
        const category = FORTRESS_OF_THE_MUSLIM[categoryIndex];
        if (!category) return;

        adhkarSessionState = {
            isActive: true,
            category: category,
            currentIndex: 0,
            currentCount: 0,
        };

        closeModal(adhkarModal);
        adhkarSessionView.classList.add('active');
        renderAdhkarSession();
    };

    const endAdhkarSession = () => {
        adhkarSessionState.isActive = false;
        adhkarSessionView.classList.remove('active');
    };

    const goToNextAdhkar = () => {
        if (!adhkarSessionState.isActive || !adhkarSessionState.category) return;
        const category = adhkarSessionState.category;
        if (adhkarSessionState.currentIndex < category.items.length - 1) {
            adhkarSessionState.currentIndex++;
            adhkarSessionState.currentCount = 0;
            renderAdhkarSession();
        }
    };

    const goToPrevAdhkar = () => {
        if (!adhkarSessionState.isActive || !adhkarSessionState.category) return;
        if (adhkarSessionState.currentIndex > 0) {
            adhkarSessionState.currentIndex--;
            adhkarSessionState.currentCount = 0;
            renderAdhkarSession();
        }
    };

    const incrementAdhkarSessionCounter = () => {
        if (!adhkarSessionState.isActive || !adhkarSessionState.category) return;
        const item = adhkarSessionState.category.items[adhkarSessionState.currentIndex];

        adhkarSessionState.currentCount++;
        vibrateDevice();
        playClickSound();

        if (adhkarSessionState.currentCount >= item.count) {
            adhkarSessionState.currentCount = item.count; // Cap at max
            vibrateDevice([100, 50, 100]); 
            setTimeout(() => {
                if (adhkarSessionState.currentIndex < adhkarSessionState.category.items.length - 1) {
                    goToNextAdhkar();
                }
            }, 500);
        }
        
        renderAdhkarSession();
    };

    adhkarSessionBackButton.addEventListener('click', endAdhkarSession);
    adhkarSessionNextButton.addEventListener('click', goToNextAdhkar);
    adhkarSessionPrevButton.addEventListener('click', goToPrevAdhkar);
    adhkarSessionContent.addEventListener('click', incrementAdhkarSessionCounter);


    const incrementCounter = (event) => {
        createRipple(event);

        recordDhikrIncrement(state.currentDhikr);

        updateCounterDisplay();
        updateProgressBar();
        playClickSound();

        let goalReached = false;
        const goal = state.goals[state.currentDhikr];
        if (goal > 0 && state.counts[state.currentDhikr] === goal) {
            goalReached = true;
            openModal(goalReachedModal);
            vibrateDevice(state.settings.vibrationPatterns.goalReached);
        }

        if (!goalReached) {
            vibrateDevice();
        }

        updateLastInteractionTime();
        saveState();
    };

    const resetCounter = () => {
        vibrateDevice(state.settings.vibrationPatterns.counterReset);
        state.counts[state.currentDhikr] = 0;
        updateCounterDisplay();
        updateProgressBar();
        updateLastInteractionTime();
        saveState();
    };

    const populateStatsDhikrSelect = () => {
        const allStatItems = new Set(state.dhikrList);
    
        Object.values(state.stats).forEach(dailyStats => {
            Object.keys(dailyStats).forEach(key => {
                if (key !== 'lastUpdated') {
                    allStatItems.add(key);
                }
            });
        });
    
        const currentSelection = statsDhikrSelect.value || state.currentDhikr;
        statsDhikrSelect.innerHTML = '';
    
        allStatItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            statsDhikrSelect.appendChild(option);
        });
    
        // Try to preserve selection
        if (allStatItems.has(currentSelection)) {
            statsDhikrSelect.value = currentSelection;
        } else if (state.currentDhikr && allStatItems.has(state.currentDhikr)) {
            statsDhikrSelect.value = state.currentDhikr;
        }
    };

    // --- Drag and Drop Logic for Dhikr List ---
    function getDragAfterElement(container: HTMLElement, y: number): HTMLElement | null {
        const draggableElements = [...container.querySelectorAll('.dhikr-list-item:not(.dragging)')] as HTMLElement[];
    
        const result = draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY, element: null as HTMLElement | null });
        
        return result.element;
    }

    dhikrListContainer.addEventListener('dragover', e => {
        e.preventDefault();
        const draggingItem = dhikrListContainer.querySelector('.dragging');
        if (!draggingItem) return;

        const afterElement = getDragAfterElement(dhikrListContainer, (e as DragEvent).clientY);

        if (afterElement == null) {
            dhikrListContainer.appendChild(draggingItem);
        } else {
            dhikrListContainer.insertBefore(draggingItem, afterElement);
        }
    });

    dhikrListContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const newDhikrOrder = Array.from(dhikrListContainer.querySelectorAll('.dhikr-item-main > span:first-child'))
                                   .map(span => (span as HTMLElement).textContent.trim());

        if (JSON.stringify(newDhikrOrder) !== JSON.stringify(state.dhikrList) && newDhikrOrder.length === state.dhikrList.length) {
            state.dhikrList = newDhikrOrder;
            saveState();
            renderDhikrList(); // Re-render to update event listener closures
        }
    });

    const renderDhikrList = () => {
        dhikrListContainer.innerHTML = '';
        state.dhikrList.forEach(dhikr => {
            const item = document.createElement('div');
            item.className = 'dhikr-list-item';
            item.draggable = true; // Make item draggable
    
            // Add drag & drop listeners
            item.addEventListener('dragstart', () => {
                // Add dragging class after a short delay to allow the browser to create a drag image
                setTimeout(() => item.classList.add('dragging'), 0);
            });
    
            item.addEventListener('dragend', () => {
                // Cleanup in case the drop happens outside the container
                item.classList.remove('dragging');
            });

            const mainContent = document.createElement('div');
            mainContent.className = 'dhikr-item-main';
            mainContent.onclick = () => {
                switchDhikr(dhikr);
                closeModal(dhikrListModal);
            };
    
            const nameSpan = document.createElement('span');
            nameSpan.textContent = dhikr;
            mainContent.appendChild(nameSpan);
    
            const goal = state.goals[dhikr];
            if (goal > 0) {
                const goalBadge = document.createElement('span');
                goalBadge.className = 'dhikr-goal-badge';
                goalBadge.textContent = goal.toString();
                mainContent.appendChild(goalBadge);
            }
    
            const actions = document.createElement('div');
            actions.className = 'dhikr-item-actions';
    
            const goalButton = document.createElement('button');
            goalButton.className = 'goal-dhikr-button';
            goalButton.innerHTML = ICONS.goal;
            goalButton.setAttribute('aria-label', `تحديد هدف لـ ${dhikr}`);
            goalButton.onclick = (e) => {
                e.stopPropagation();
                dhikrToEditGoal = dhikr;
                setGoalDhikrNameDisplay.textContent = `"${dhikr}"`;
                setGoalInput.value = state.goals[dhikr]?.toString() || '';
                openModal(setGoalModal);
            };
    
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-dhikr-button';
            removeButton.innerHTML = ICONS.trash;
            removeButton.setAttribute('aria-label', `حذف ${dhikr}`);
            if (DEFAULT_DHIKR_LIST.includes(dhikr)) {
                removeButton.disabled = true;
            }
            removeButton.onclick = (e) => {
                e.stopPropagation();
                dhikrToDelete = dhikr;
                deleteDhikrNameDisplay.textContent = `"${dhikr}"`;
                openModal(deleteDhikrConfirmModal);
            };
    
            actions.appendChild(goalButton);
            actions.appendChild(removeButton);
    
            item.appendChild(mainContent);
            item.appendChild(actions);
            dhikrListContainer.appendChild(item);
        });
    };

    const applyTheme = (themeName) => {
        document.body.dataset.theme = themeName;
    };
    
    const updateToggleButton = (button, enabled, icons) => {
        button.innerHTML = enabled ? icons.on : icons.off;
        button.classList.toggle('off', !enabled);
    };

    const renderDhikrScroller = () => {
        if (!dhikrScrollerContainer) return;
        dhikrScrollerContainer.innerHTML = '';
        DEFAULT_DHIKR_LIST.forEach(dhikr => {
            const item = document.createElement('button');
            item.className = 'dhikr-scroller-item';
            item.textContent = dhikr;
            if (dhikr === state.currentDhikr) {
                item.classList.add('active');
            }
            item.onclick = () => {
                switchDhikr(dhikr);
            };
            dhikrScrollerContainer.appendChild(item);
        });
    };

    const renderAdhkarInteractiveList = (isFavorites = false) => {
        adhkarListContainer.innerHTML = '';
    
        if (isFavorites) {
            // --- FAVORITES PAGE ---
            adhkarSearchInput.style.display = 'none';
            if (state.favoriteAdhkarCategories.length === 0) {
                adhkarListContainer.innerHTML = `<p class="no-history-message">لم تقم بإضافة أي فئة للمفضلة بعد. يمكنك إضافتها من صفحة حصن المسلم بالضغط على أيقونة النجمة بجانب العنوان.</p>`;
                return;
            }
    
            const categoriesToShow = FORTRESS_OF_THE_MUSLIM.filter(cat => state.favoriteAdhkarCategories.includes(cat.title));
    
            if (categoriesToShow.length === 0) {
                adhkarListContainer.innerHTML = `<p class="no-history-message">لم يتم العثور على أذكار مفضلة.</p>`;
                return;
            }
    
            categoriesToShow.forEach((category) => {
                const originalIndex = FORTRESS_OF_THE_MUSLIM.findIndex(c => c.title === category.title);
                if (originalIndex === -1) return;
    
                const item = document.createElement('div');
                item.className = 'accordion-item'; // Simple item for favorites
    
                const header = document.createElement('button');
                header.className = 'accordion-header';
                header.textContent = category.title;
    
                header.addEventListener('click', () => {
                    startAdhkarSession(originalIndex);
                });
    
                item.appendChild(header);
                adhkarListContainer.appendChild(item);
            });
    
        } else {
            // --- FORTRESS OF THE MUSLIM PAGE ---
            adhkarSearchInput.style.display = 'block';
            const searchTerm = adhkarSearchInput.value.trim().toLowerCase();
            const categoriesToShow = searchTerm
                ? FORTRESS_OF_THE_MUSLIM.filter(category => 
                    category.title.toLowerCase().includes(searchTerm) || 
                    category.items.some(item => item.text.toLowerCase().includes(searchTerm))
                  )
                : FORTRESS_OF_THE_MUSLIM;

            if (categoriesToShow.length === 0) {
                 adhkarListContainer.innerHTML = `<p class="no-history-message">لم يتم العثور على نتائج.</p>`;
                 return;
            }

            categoriesToShow.forEach((category) => {
                const index = FORTRESS_OF_THE_MUSLIM.findIndex(c => c.title === category.title);
                if (index === -1) return;

                const item = document.createElement('div');
                item.className = 'adhkar-category-item';
    
                const titleButton = document.createElement('button');
                titleButton.className = 'adhkar-category-title';
                titleButton.textContent = category.title;
                titleButton.addEventListener('click', () => {
                    startAdhkarSession(index);
                });
    
                const favoriteButton = document.createElement('button');
                favoriteButton.className = 'adhkar-category-favorite-button icon-button';
                const isFavorited = state.favoriteAdhkarCategories.includes(category.title);
                favoriteButton.innerHTML = isFavorited ? ICONS.favorite : ICONS.favoriteBorder;
                favoriteButton.setAttribute('aria-label', isFavorited ? `إزالة ${category.title} من المفضلة` : `إضافة ${category.title} للمفضلة`);
                if (isFavorited) {
                    favoriteButton.classList.add('active');
                }
    
                favoriteButton.addEventListener('click', () => {
                    const favIndex = state.favoriteAdhkarCategories.indexOf(category.title);
                    if (favIndex > -1) {
                        state.favoriteAdhkarCategories.splice(favIndex, 1);
                    } else {
                        state.favoriteAdhkarCategories.push(category.title);
                    }
                    saveState();
                    renderAdhkarInteractiveList(false); // Re-render this list to update star icon
                });
    
                item.appendChild(favoriteButton);
                item.appendChild(titleButton);
                adhkarListContainer.appendChild(item);
            });
        }
    };
    
    const initializeUI = () => {
        updateCounterDisplay();
        updateDhikrDisplay();
        updateProgressBar();
        populateStatsDhikrSelect();
        renderDhikrList();
        renderDhikrScroller();
        applyTheme(state.settings.theme);
        themeSelect.value = state.settings.theme;
        notificationSoundSelect.value = state.settings.notificationSound;
        vibrationIntensitySlider.value = state.settings.vibrationIntensity.toString();
        
        inactivityReminderToggle.checked = state.settings.inactivityReminder.enabled;
        inactivityReminderSelect.value = state.settings.inactivityReminder.duration.toString();
        inactivityReminderOptions.style.display = state.settings.inactivityReminder.enabled ? 'flex' : 'none';

        updateToggleButton(soundToggleButton, state.settings.sound, { on: ICONS.soundOn, off: ICONS.soundOff });
        
        const isVibrationSupported = 'vibrate' in navigator && typeof navigator.vibrate === 'function';
        if (!isVibrationSupported) {
            (vibrationToggleButton as HTMLButtonElement).disabled = true;
            state.settings.vibration = false;
        }
        updateToggleButton(vibrationToggleButton, state.settings.vibration, { on: ICONS.vibrationOn, off: ICONS.vibrationOff });
    };

    // --- Sidenav Logic ---
    const openSidenav = () => {
        sideNav.classList.add('active');
        sidenavOverlay.classList.add('active');
        sideNav.setAttribute('aria-hidden', 'false');
    };

    const closeSidenav = () => {
        sideNav.classList.remove('active');
        sidenavOverlay.classList.remove('active');
        sideNav.setAttribute('aria-hidden', 'true');
    };

    // --- Modal Logic ---
    const openModal = (modal) => modal.classList.add('active');
    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        if (modal === vibrationPatternModal) editingVibrationEvent = null;
        if (modal === setGoalModal) dhikrToEditGoal = null;
        if (modal === deleteReminderConfirmModal) reminderToDelete = null;
        if (modal === addQuranGoalModal) quranGoalToEditId = null;
        if (modal === deleteQuranGoalConfirmModal) quranGoalToDeleteId = null;
        if (modal === logQuranProgressModal) quranGoalToLogProgressId = null;
    };
    
    const setupNavigation = () => {
        // Sidenav toggles
        menuToggleButton.addEventListener('click', openSidenav);
        sidenavOverlay.addEventListener('click', closeSidenav);
        closeSidenavButton.addEventListener('click', closeSidenav);

        const openQuranBrowser = () => {
            quranIframe.src = 'https://quran.com/ar';
            quranBrowserView.classList.add('active');
        };

        quranBrowserBackButton.addEventListener('click', () => {
            quranBrowserView.classList.remove('active');
            // Stop the iframe from loading content in the background
            quranIframe.src = 'about:blank';
        });

        const showAdhkarAction = () => {
            adhkarModalTitle.textContent = 'الأذكار المفضلة';
            renderAdhkarInteractiveList(true);
            openModal(adhkarModal);
        };

        const showFortressAction = () => {
            adhkarModalTitle.textContent = 'حصن المسلم';
            adhkarSearchInput.value = ''; // Clear previous search
            renderAdhkarInteractiveList(false);
            openModal(adhkarModal);
        };

        // Define actions for each button
        const topBarActions = {
            settings: () => openModal(settingsModal),
            dhikrSelect: () => openModal(dhikrListModal),
            stats: () => {
                populateStatsDhikrSelect();
                renderStats();
                openModal(statsModal);
            },
            history: () => {
                renderHistory();
                openModal(historyModal);
            },
            reminders: () => {
                renderRemindersList();
                updateRemindersPermissionStatus();
                openModal(remindersModal);
            },
            quranGoals: () => {
                renderQuranGoalsList();
                openModal(quranGoalsModal);
            },
        };

        // Assign actions to top bar buttons
        settingsButton.addEventListener('click', topBarActions.settings);
        dhikrSelectButton.addEventListener('click', topBarActions.dhikrSelect);
        statsButton.addEventListener('click', topBarActions.stats);
        historyButton.addEventListener('click', topBarActions.history);
        remindersButton.addEventListener('click', topBarActions.reminders);
        quranGoalsButton.addEventListener('click', topBarActions.quranGoals);
        quranButton.addEventListener('click', openQuranBrowser);
        adhkarButton.addEventListener('click', showAdhkarAction);

        // Assign actions to sidenav buttons (and close sidenav)
        sidenavSettingsButton.addEventListener('click', () => { topBarActions.settings(); closeSidenav(); });
        sidenavDhikrSelectButton.addEventListener('click', () => { topBarActions.dhikrSelect(); closeSidenav(); });
        sidenavStatsButton.addEventListener('click', () => { topBarActions.stats(); closeSidenav(); });
        sidenavQuranButton.addEventListener('click', () => {
            openQuranBrowser();
            closeSidenav();
        });
        sidenavHistoryButton.addEventListener('click', () => { topBarActions.history(); closeSidenav(); });
        sidenavRemindersButton.addEventListener('click', () => { topBarActions.reminders(); closeSidenav(); });
        sidenavQuranGoalsButton.addEventListener('click', () => { topBarActions.quranGoals(); closeSidenav(); });
        sidenavAdhkarButton.addEventListener('click', () => { showAdhkarAction(); closeSidenav(); });
        sidenavFortressButton.addEventListener('click', () => { showFortressAction(); closeSidenav(); });
        sidenavNoticeButton.addEventListener('click', () => { openModal(noticeModal); closeSidenav(); });
    };

    [closeSettingsButton, closeDhikrListButton, closeGoalModalButton, closeStatsButton, closeAdhkarButton, closeVibrationPatternModalButton, closeGeminiModalButton, closeResetConfirmModalButton, closeDeleteDhikrModalButton, closeHistoryButton, closeSetGoalModalButton, closeRemindersModalButton, closeAddReminderModalButton, closeDeleteReminderModalButton, closeHowToModalButton, closeHowToNotificationsModalButton, closeNoticeModalButton, closeNoticeModalMainButton, closeClearHistoryModalButton, closeQuranGoalsModalButton, closeAddQuranGoalModalButton, closeDeleteQuranGoalModalButton, closeLogQuranProgressModalButton].forEach(btn => {
       if(btn) btn.addEventListener('click', () => {
             closeModal(btn.closest('.modal-overlay'));
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // --- Dhikr Management ---
    const switchDhikr = (newDhikr: string) => {
        state.currentDhikr = newDhikr;
        statsDhikrSelect.value = newDhikr;
        updateDhikrDisplay();
        updateCounterDisplay();
        updateProgressBar();
        renderDhikrScroller();
        updateLastInteractionTime();
        saveState();
    };

    saveNewDhikrButton.addEventListener('click', () => {
        const newDhikr = newDhikrInput.value.trim();
        if (newDhikr && !state.dhikrList.includes(newDhikr)) {
            state.dhikrList.push(newDhikr);
            populateStatsDhikrSelect();
            renderDhikrList();
            switchDhikr(newDhikr);
            newDhikrInput.value = '';
        }
    });

    deleteDhikrYesButton.addEventListener('click', () => {
        if (!dhikrToDelete) return;
        const deletedDhikr = dhikrToDelete;
        state.dhikrList = state.dhikrList.filter(d => d !== deletedDhikr);
        delete state.counts[deletedDhikr];
        delete state.goals[deletedDhikr];
        Object.keys(state.stats).forEach(date => {
            delete state.stats[date][deletedDhikr];
        });
        state.reminders = state.reminders.filter(r => r.dhikr !== deletedDhikr);

        if (state.currentDhikr === deletedDhikr) {
            state.currentDhikr = state.dhikrList[0] || '';
        }

        dhikrToDelete = null;
        saveState();
        closeModal(deleteDhikrConfirmModal);

        initializeUI();
        renderStats();
    });

    deleteDhikrNoButton.addEventListener('click', () => {
        dhikrToDelete = null;
        closeModal(deleteDhikrConfirmModal);
    });

    // --- Settings Management ---
    themeSelect.addEventListener('change', () => {
        state.settings.theme = themeSelect.value;
        applyTheme(state.settings.theme);
        saveState();
    });
    
    setGoalSaveButton.addEventListener('click', () => {
        if (!dhikrToEditGoal) return;

        const goal = parseInt(setGoalInput.value);
        if (goal > 0) {
            state.goals[dhikrToEditGoal] = goal;
        } else {
            delete state.goals[dhikrToEditGoal];
        }
        
        saveState();
        closeModal(setGoalModal);
        
        renderDhikrList();
        if (dhikrToEditGoal === state.currentDhikr) {
            updateProgressBar();
        }
    });

    // --- Bottom Controls Logic ---
    soundToggleButton.addEventListener('click', () => {
        state.settings.sound = !state.settings.sound;
        updateToggleButton(soundToggleButton, state.settings.sound, { on: ICONS.soundOn, off: ICONS.soundOff });
        saveState();
    });

    vibrationToggleButton.addEventListener('click', () => {
        state.settings.vibration = !state.settings.vibration;
        updateToggleButton(vibrationToggleButton, state.settings.vibration, { on: ICONS.vibrationOn, off: ICONS.vibrationOff });
        saveState();
    });
    
    // --- Stats Logic ---
    const renderStats = () => {
        const selectedDhikr = statsDhikrSelect.value;
        // FIX: Added optional chaining `?.` for safety in case no active tab is found.
        const selectedPeriod = (document.querySelector('#stats-period-tabs .active') as HTMLElement)?.dataset.period;
        let total = 0;
        const today = new Date();
        
        if (selectedPeriod === 'daily') {
            const todayStr = getToday();
            total = state.stats[todayStr]?.[selectedDhikr] || 0;
        } else if (selectedPeriod === 'weekly') {
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                total += state.stats[dateStr]?.[selectedDhikr] || 0;
            }
        } else if (selectedPeriod === 'monthly') {
             for (let i = 0; i < 30; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                total += state.stats[dateStr]?.[selectedDhikr] || 0;
            }
        }

        statsDisplay.textContent = `الإجمالي: ${total}`;
        
        const isDhikr = state.dhikrList.includes(selectedDhikr);
        const goal = state.goals[selectedDhikr] || 0;

        if (isDhikr && goal > 0 && selectedPeriod === 'daily') {
            const percentage = Math.min((total / goal) * 100, 100);
            statsChartBar.style.width = `${percentage}%`;
            statsChartLabel.textContent = `${Math.round(percentage)}%`;
            statsGoalDisplay.textContent = `الهدف اليومي: ${goal}`;
            statsGoalDisplay.style.display = 'block';
        } else {
            // This 'else' block now handles both regular dhikr without goals,
            // and all Quran goals, for which we won't show a progress bar.
            statsChartBar.style.width = '0%';
            statsChartLabel.textContent = '';
            statsGoalDisplay.style.display = 'none';
        }
    };
    
    statsDhikrSelect.addEventListener('change', renderStats);
    statsPeriodTabs.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
            statsPeriodTabs.querySelector('.active').classList.remove('active');
            target.classList.add('active');
            renderStats();
        }
    });

    // --- History Logic ---
    const renderHistory = () => {
        historyContent.innerHTML = '';
        const dates = Object.keys(state.stats).sort().reverse();

        if (dates.length === 0) {
            historyContent.innerHTML = `<p class="no-history-message">لا يوجد سجل لعرضه.</p>`;
            return;
        }

        dates.forEach(dateStr => {
            const dayData = state.stats[dateStr];
            const dhikrKeys = Object.keys(dayData).filter(k => k !== 'lastUpdated');

            if (!dayData || dhikrKeys.length === 0) return;

            const entryDiv = document.createElement('div');
            entryDiv.className = 'history-entry';
            const dateHeaderDiv = document.createElement('div');
            dateHeaderDiv.className = 'history-date-header';
            const dateH3 = document.createElement('h3');
            dateH3.className = 'history-date';
            const dateParts = dateStr.split('-').map(s => parseInt(s, 10));
            const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            dateH3.textContent = dateObj.toLocaleDateString('ar-EG-u-nu-latn', { year: 'numeric', month: 'long', day: 'numeric' });
            dateHeaderDiv.appendChild(dateH3);

            if (dayData.lastUpdated) {
                const timeSpan = document.createElement('span');
                timeSpan.className = 'history-time';
                const timeObj = new Date(dayData.lastUpdated);
                timeSpan.textContent = timeObj.toLocaleTimeString('ar-EG-u-nu-latn', { hour: 'numeric', minute: '2-digit', hour12: true });
                dateHeaderDiv.appendChild(timeSpan);
            }

            const dhikrListUl = document.createElement('ul');
            dhikrListUl.className = 'history-dhikr-list';
            dhikrKeys.forEach(dhikr => {
                const count = dayData[dhikr];
                const listItem = document.createElement('li');
                listItem.className = 'history-dhikr-item';
                listItem.innerHTML = `<span class="dhikr-name">${dhikr}</span><span class="dhikr-count">${count}</span>`;
                dhikrListUl.appendChild(listItem);
            });

            entryDiv.appendChild(dateHeaderDiv);
            entryDiv.appendChild(dhikrListUl);
            historyContent.appendChild(entryDiv);
        });
    };

    // --- Reminders Logic ---
    const updateRemindersPermissionStatus = () => {
        if (!('Notification' in window)) {
            remindersPermissionStatus.textContent = 'المتصفح لا يدعم الإشعارات.';
            showHowToNotificationsButton.style.display = 'none';
            return;
        }

        let statusText = '';
        switch(Notification.permission) {
            case 'granted':
                statusText = 'تم السماح بالإشعارات.';
                showHowToNotificationsButton.style.display = 'none';
                break;
            case 'denied':
                statusText = 'تم رفض الإشعارات. يرجى تفعيلها من إعدادات المتصفح.';
                showHowToNotificationsButton.style.display = 'block';
                break;
            default:
                statusText = 'لم يتم منح إذن الإشعارات بعد.';
                showHowToNotificationsButton.style.display = 'none';
        }
        remindersPermissionStatus.textContent = statusText;
    };

    const renderRemindersList = () => {
        remindersList.innerHTML = '';

        const allReminders = [];

        // 1. Get Dhikr reminders
        state.reminders.forEach(reminder => {
            if (reminder.enabled) {
                 allReminders.push({
                    ...reminder,
                    type: 'dhikr',
                    text: reminder.dhikr,
                    time: reminder.time,
                });
            }
        });

        // 2. Get Quran goal reminders
        state.quranGoals.forEach(goal => {
            if (goal.reminder && goal.reminder.enabled) {
                allReminders.push({
                    ...goal,
                    type: 'quran',
                    time: goal.reminder.time
                });
            }
        });

        // 3. Sort reminders by time
        allReminders.sort((a, b) => a.time.localeCompare(b.time));

        if (allReminders.length === 0) {
            remindersList.innerHTML = '<p class="no-history-message">لا توجد تذكيرات.</p>';
            return;
        }

        allReminders.forEach(reminder => {
             if (reminder.type === 'quran') {
                const card = createQuranGoalCard(reminder, true); // true indicates it's from the reminder list
                remindersList.appendChild(card);
            } else { // Dhikr reminder
                const item = document.createElement('div');
                item.className = 'reminder-item';
                const time = new Date();
                const [hours, minutes] = reminder.time.split(':');
                time.setHours(parseInt(hours), parseInt(minutes));
                const formattedTime = time.toLocaleTimeString('ar-EG-u-nu-latn', { hour: 'numeric', minute: '2-digit', hour12: true });

                item.innerHTML = `
                    <div class="reminder-info">
                        <span class="reminder-dhikr">${reminder.text}</span>
                        <span class="reminder-time">${formattedTime}</span>
                    </div>
                    <div class="reminder-actions">
                        <button class="icon-button delete-reminder-button" data-id="${reminder.id}" data-type="dhikr" aria-label="حذف التذكير">${ICONS.trash}</button>
                    </div>
                `;
                 remindersList.appendChild(item);
            }
        });
    };
    
    const populateReminderDhikrSelect = () => {
        reminderDhikrSelect.innerHTML = '';
        state.dhikrList.forEach(dhikr => {
            const option = document.createElement('option');
            option.value = dhikr;
            option.textContent = dhikr;
            reminderDhikrSelect.appendChild(option);
        });
    };

    // --- Quran Goals Logic ---

    /**
     * Creates a DOM element for a Quran Goal card.
     * @param {object} goal - The Quran goal object from state.
     * @param {boolean} isReminderContext - If true, the delete button disables reminder; otherwise, it deletes the goal.
     * @returns {HTMLElement} The card element.
     */
    const createQuranGoalCard = (goal, isReminderContext = false) => {
        const item = document.createElement('div');
        item.className = 'quran-goal-card';
        item.dataset.id = goal.id;

        const description = getQuranGoalStatDescription(goal);
        const totalPages = goal.amountType === 'custom'
            ? (goal.pageTo - goal.pageFrom + 1)
            : PAGES_PER_AMOUNT[goal.amountType] || 0;
        const completedPages = goal.progress || 0;
        const percentage = totalPages > 0 ? Math.min((completedPages / totalPages) * 100, 100) : 0;
        
        let timeDisplay = '';
        if (goal.reminder?.enabled) {
            const time = new Date();
            const [hours, minutes] = goal.reminder.time.split(':');
            time.setHours(parseInt(hours), parseInt(minutes));
            const formattedTime = time.toLocaleTimeString('ar-EG-u-nu-latn', { hour: 'numeric', minute: '2-digit', hour12: true });
            timeDisplay = `
                <div class="quran-card-time-container">
                    <span class="reminder-indicator">${ICONS.bell}</span>
                    <span class="quran-card-time">${formattedTime}</span>
                </div>
            `;
        }
        
        const deleteButtonAriaLabel = isReminderContext ? "إلغاء تذكير التلاوة" : "حذف الهدف";
        const deleteButtonAction = isReminderContext ? "disable-reminder" : "delete-goal";

        item.innerHTML = `
            <div class="quran-card-header">
                <p class="quran-card-description">${description}</p>
                ${timeDisplay}
            </div>
            <div class="quran-card-actions">
                <button class="icon-button edit-quran-goal-button" aria-label="تعديل الهدف">${ICONS.edit}</button>
                <button class="icon-button log-progress-button" aria-label="تسجيل التقدم">${ICONS.goal}</button>
                <button class="icon-button delete-button" data-action="${deleteButtonAction}" aria-label="${deleteButtonAriaLabel}">${ICONS.trash}</button>
            </div>
            <div class="quran-card-footer">
                <p class="quran-card-progress-text">${completedPages} / ${totalPages} صفحات</p>
                <div class="quran-card-progress">
                    <div class="quran-card-progress-bar" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
        return item;
    };

    const renderQuranGoalsList = () => {
        quranGoalsListContainer.innerHTML = '';
        if (state.quranGoals.length === 0) {
            quranGoalsListContainer.innerHTML = '<p class="no-history-message">لم تقم بإضافة أهداف قرآنية بعد.</p>';
            return;
        }
        
        state.quranGoals.forEach(goal => {
            const card = createQuranGoalCard(goal, false);
            quranGoalsListContainer.appendChild(card);
        });
    };


    // --- Vibration Pattern Logic ---
    const openVibrationPatternModal = (eventType: 'goalReached' | 'counterReset') => {
        editingVibrationEvent = eventType;
        const pattern = state.settings.vibrationPatterns[eventType] || VIBRATION_DEFAULTS[eventType];
        vibrationPatternInput.value = pattern.join(', ');
        vibrationPatternTitle.textContent = eventType === 'goalReached' ? 'نمط اهتزاز الهدف' : 'نمط اهتزاز التصفير';
        openModal(vibrationPatternModal);
    };

    const parseVibrationPattern = (input: string): number[] => input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 0);

    const saveVibrationPattern = () => {
        if (!editingVibrationEvent) return;
        const pattern = parseVibrationPattern(vibrationPatternInput.value);
        if (pattern.length > 0) {
            state.settings.vibrationPatterns[editingVibrationEvent] = pattern;
            saveState();
        }
        closeModal(vibrationPatternModal);
    };

    setGoalVibrationButton.addEventListener('click', () => openVibrationPatternModal('goalReached'));
    setResetVibrationButton.addEventListener('click', () => openVibrationPatternModal('counterReset'));
    testVibrationPatternButton.addEventListener('click', () => {
        const pattern = parseVibrationPattern(vibrationPatternInput.value);
        vibrateDevice(pattern);
    });
    saveVibrationPatternButton.addEventListener('click', saveVibrationPattern);
    resetVibrationPatternButton.addEventListener('click', () => {
        if (editingVibrationEvent) {
            vibrationPatternInput.value = VIBRATION_DEFAULTS[editingVibrationEvent].join(', ');
        }
    });

    // --- Gemini AI Logic ---
    let ai;
    const initializeAI = () => {
        if (process.env.API_KEY) {
            ai = new GoogleGenAI({apiKey: process.env.API_KEY});
        } else {
            console.warn("Gemini API Key not found. AI features will be disabled.");
            if (aiSuggestButton) aiSuggestButton.style.display = 'none';
        }
    };
    
    if (aiSuggestButton) {
        aiSuggestButton.addEventListener('click', () => {
            geminiModalTitle.textContent = 'اقتراح أذكار بالذكاء الاصطناعي';
            geminiPromptInput.placeholder = 'مثال: أذكار للشعور بالطمأنينة';
            geminiResultsContainer.innerHTML = '';
            geminiPromptInput.value = '';
            openModal(geminiModal);
        });
    }

    if (geminiGenerateButton) {
        geminiGenerateButton.addEventListener('click', async () => {
            if (!ai) {
                geminiResultsContainer.innerHTML = '<p class="gemini-error">AI service is not initialized. Check API Key.</p>';
                return;
            }
            const userPrompt = geminiPromptInput.value.trim();
            if (!userPrompt) return;
    
            geminiGenerateButton.disabled = true;
            geminiButtonText.textContent = 'جاري الإنشاء...';
            geminiLoader.style.display = 'block';
            geminiResultsContainer.innerHTML = '';
    
            try {
                const prompt = `Based on the user's request for "${userPrompt}", generate 3 short, authentic Islamic dhikr (invocations or remembrances of Allah) in Arabic. For each dhikr, provide a brief description of its purpose or benefit. The output must be a JSON array of objects, where each object has "dhikr" and "benefit" keys. Example: [{"dhikr": "سبحان الله", "benefit": "Glorifies Allah and is light on the tongue."}]`;
                
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    dhikr: { type: Type.STRING },
                                    benefit: { type: Type.STRING }
                                }
                            }
                        }
                    }
                });
    
                let jsonStr = response.text.trim();
                const suggestions = JSON.parse(jsonStr);
    
                suggestions.forEach(suggestion => {
                    const card = document.createElement('div');
                    card.className = 'gemini-result-card';
                    card.innerHTML = `
                        <p class="gemini-dhikr">${suggestion.dhikr}</p>
                        <p class="gemini-benefit">${suggestion.benefit}</p>
                        <button class="add-dhikr-from-ai-button">إضافة للقائمة</button>
                    `;
                    geminiResultsContainer.appendChild(card);
    
                    card.querySelector('.add-dhikr-from-ai-button').addEventListener('click', () => {
                        const newDhikr = suggestion.dhikr;
                        if (newDhikr && !state.dhikrList.includes(newDhikr)) {
                            state.dhikrList.push(newDhikr);
                            saveState();
                            renderDhikrList();
                            populateStatsDhikrSelect();
                            // Maybe show a small confirmation message
                            const btn = card.querySelector('.add-dhikr-from-ai-button') as HTMLButtonElement;
                            btn.textContent = 'تمت الإضافة!';
                            btn.disabled = true;
                        }
                    });
                });
    
            } catch (error) {
                console.error("Gemini AI Error:", error);
                geminiResultsContainer.innerHTML = `<p class="gemini-error">حدث خطأ أثناء إنشاء الاقتراحات. يرجى المحاولة مرة أخرى.</p>`;
            } finally {
                geminiGenerateButton.disabled = false;
                geminiButtonText.textContent = 'إنشاء';
                geminiLoader.style.display = 'none';
            }
        });
    }

    // --- Reminder Check Loop ---
    const checkReminders = () => {
        const now = new Date();
        const today = getToday();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        state.reminders.forEach(reminder => {
            if (reminder.enabled && reminder.time === currentTime && reminder.lastTriggered !== today) {
                if (Notification.permission === 'granted') {
                    const notificationSoundName = state.settings.notificationSound;
                    // FIX: Cast to 'any' to allow the 'vibrate' property, which is supported
                    // by some browsers but not in the default TS NotificationOptions type.
                    new Notification('تذكير بالذكر', {
                        body: `حان الآن وقت ${reminder.dhikr}`,
                        icon: 'icon.svg',
                        vibrate: [200, 100, 200],
                        silent: notificationSoundName !== 'none',
                    } as any);
                    if (notificationSoundName !== 'none' && notificationSounds[notificationSoundName]) {
                        notificationSounds[notificationSoundName].play().catch(e => console.error("Error playing notification sound:", e));
                    }
                    reminder.lastTriggered = today;
                    saveState();
                }
            }
        });
        
        state.quranGoals.forEach(goal => {
            if (goal.reminder?.enabled && goal.reminder.time === currentTime && goal.reminder.lastTriggered !== today) {
                 if (Notification.permission === 'granted') {
                    const notificationSoundName = state.settings.notificationSound;
                    const description = getQuranGoalStatDescription(goal);
                    // FIX: Cast to 'any' to allow the 'vibrate' property, which is supported
                    // by some browsers but not in the default TS NotificationOptions type.
                    new Notification('تذكير بالتلاوة', {
                        body: `حان وقت وردك: ${description}`,
                        icon: 'icon.svg',
                        vibrate: [200, 100, 200],
                        silent: notificationSoundName !== 'none',
                    } as any);
                    if (notificationSoundName !== 'none' && notificationSounds[notificationSoundName]) {
                        notificationSounds[notificationSoundName].play().catch(e => console.error("Error playing notification sound:", e));
                    }
                    goal.reminder.lastTriggered = today;
                    saveState();
                }
            }
        });
    };

    const checkInactivity = () => {
        if (!state.settings.inactivityReminder.enabled || Notification.permission !== 'granted') {
            return;
        }

        const now = Date.now();
        const durationMs = state.settings.inactivityReminder.duration * 60 * 1000;
        const lastInteraction = state.lastInteractionTimestamp || now;

        if (now - lastInteraction > durationMs) {
            new Notification('ألا بذكر الله تطمئن القلوب', {
                body: `لم تقم بالتسبيح منذ فترة. خصص وقتاً لذكر الله.`,
                icon: 'icon.svg',
                vibrate: [100, 50, 100],
            } as any);

            // Reset the timer by updating the last interaction time to now
            // This prevents spamming notifications.
            state.lastInteractionTimestamp = now;
            saveState(); // Save the updated timestamp
        }
    };

    // --- General Event Listeners ---
    counterWrapper.addEventListener('click', incrementCounter);
    resetButton.addEventListener('click', () => openModal(resetConfirmModal));
    resetConfirmYesButton.addEventListener('click', () => {
        resetCounter();
        closeModal(resetConfirmModal);
    });
    resetConfirmNoButton.addEventListener('click', () => closeModal(resetConfirmModal));
    closeSetGoalModalButton.addEventListener('click', () => closeModal(setGoalModal));
    adhkarSearchInput.addEventListener('input', () => renderAdhkarInteractiveList(false));
    clearHistoryButton.addEventListener('click', () => openModal(clearHistoryConfirmModal));
    clearHistoryYesButton.addEventListener('click', () => {
        state.stats = {};
        saveState();
        renderHistory();
        renderStats();
        closeModal(clearHistoryConfirmModal);
    });
    clearHistoryNoButton.addEventListener('click', () => closeModal(clearHistoryConfirmModal));

    // Inactivity Reminder Settings Listeners
    inactivityReminderToggle.addEventListener('change', async () => {
        const isEnabled = inactivityReminderToggle.checked;

        if (isEnabled) {
            // --- User is trying to ENABLE the reminder ---
            if (!('Notification' in window)) {
                alert('هذا المتصفح لا يدعم الإشعارات.');
                inactivityReminderToggle.checked = false; // Revert the toggle state
                return;
            }
            
            let permission = Notification.permission;
            if (permission === 'default') {
                permission = await Notification.requestPermission();
            }

            updateRemindersPermissionStatus();

            if (permission === 'granted') {
                // Permission granted, keep it enabled and update state
                state.settings.inactivityReminder.enabled = true;
                inactivityReminderOptions.style.display = 'flex';
                updateLastInteractionTime(); // Reset timer on enable
                saveState();
            } else {
                // Permission denied, revert the toggle and show instructions
                inactivityReminderToggle.checked = false;
                state.settings.inactivityReminder.enabled = false;
                inactivityReminderOptions.style.display = 'none';
                saveState();
                openModal(howToNotificationsModal);
            }
        } else {
            // --- User is trying to DISABLE the reminder ---
            state.settings.inactivityReminder.enabled = false;
            inactivityReminderOptions.style.display = 'none';
            saveState();
        }
    });

    inactivityReminderSelect.addEventListener('change', () => {
        state.settings.inactivityReminder.duration = parseInt(inactivityReminderSelect.value, 10);
        updateLastInteractionTime(); // Reset timer when changing duration
        saveState();
    });


    // --- Quran Goals & Reminders Event Listeners ---
    
    // Quran Goals
    addNewQuranGoalButton.addEventListener('click', () => {
        quranGoalToEditId = null;
        addQuranGoalModalTitle.textContent = 'إضافة تلاوة جديدة';
        quranGoalSurahInput.value = '';
        quranGoalAmountSelect.value = 'hizb_quarter';
        quranGoalCustomRangeContainer.style.display = 'none';
        quranGoalPageFromInput.value = '';
        quranGoalPageToInput.value = '';
        quranGoalPeriodSelect.value = 'daily';
        quranGoalReminderToggle.checked = false;
        quranGoalReminderTimeContainer.style.display = 'none';
        quranGoalReminderTimeInput.value = '';
        openModal(addQuranGoalModal);
    });

    quranGoalAmountSelect.addEventListener('change', () => {
        quranGoalCustomRangeContainer.style.display = quranGoalAmountSelect.value === 'custom' ? 'flex' : 'none';
    });

    quranGoalReminderToggle.addEventListener('change', () => {
        quranGoalReminderTimeContainer.style.display = quranGoalReminderToggle.checked ? 'block' : 'none';
    });
    
    saveQuranGoalButton.addEventListener('click', () => {
        if (quranGoalAmountSelect.value === 'custom' && (!quranGoalPageFromInput.value || !quranGoalPageToInput.value)) {
            alert('يرجى إدخال بداية ونهاية الصفحات للهدف المخصص.');
            return;
        }
        if (quranGoalReminderToggle.checked && !quranGoalReminderTimeInput.value) {
            alert('يرجى تحديد وقت للتذكير.');
            return;
        }

        const existingGoal = quranGoalToEditId ? state.quranGoals.find(g => g.id === quranGoalToEditId) : null;
        let lastTriggered = null;
        if (existingGoal && existingGoal.reminder?.time === quranGoalReminderTimeInput.value) {
            lastTriggered = existingGoal.reminder.lastTriggered;
        }

        const goalData = {
            surah: quranGoalSurahInput.value.trim(),
            amountType: quranGoalAmountSelect.value,
            pageFrom: parseInt(quranGoalPageFromInput.value) || null,
            pageTo: parseInt(quranGoalPageToInput.value) || null,
            period: quranGoalPeriodSelect.value,
            reminder: {
                enabled: quranGoalReminderToggle.checked,
                time: quranGoalReminderTimeInput.value,
                lastTriggered: lastTriggered
            }
        };

        if (quranGoalToEditId) {
            // Editing existing goal
            const goalIndex = state.quranGoals.findIndex(g => g.id === quranGoalToEditId);
            if (goalIndex > -1) {
                state.quranGoals[goalIndex] = { 
                    ...state.quranGoals[goalIndex],
                    ...goalData 
                };
            }
        } else {
            // Creating new goal
            const newGoal = {
                id: `quran_${Date.now()}`,
                progress: 0,
                ...goalData
            };
            state.quranGoals.push(newGoal);
        }
        
        quranGoalToEditId = null; // Reset after saving
        saveState();
        renderQuranGoalsList();
        closeModal(addQuranGoalModal);
    });

    deleteQuranGoalYesButton.addEventListener('click', () => {
        if (!quranGoalToDeleteId) return;
        state.quranGoals = state.quranGoals.filter(g => g.id !== quranGoalToDeleteId);
        quranGoalToDeleteId = null;
        saveState();
        renderQuranGoalsList();
        closeModal(deleteQuranGoalConfirmModal);
    });
    
    logQuranProgressSaveButton.addEventListener('click', () => {
        if (!quranGoalToLogProgressId) return;
        const pageFrom = parseInt(logQuranPageFromInput.value);
        const pageTo = parseInt(logQuranPageToInput.value);

        if (isNaN(pageFrom) || isNaN(pageTo) || pageTo < pageFrom) {
            alert('يرجى إدخال نطاق صفحات صحيح.');
            return;
        }

        const goal = state.quranGoals.find(g => g.id === quranGoalToLogProgressId);
        if (goal) {
            const pagesRead = pageTo - pageFrom + 1;
            goal.progress = (goal.progress || 0) + pagesRead;
        }
        
        saveState();
        renderQuranGoalsList();
        renderRemindersList();
        closeModal(logQuranProgressModal);
    });

    logQuranProgressCancelButton.addEventListener('click', () => closeModal(logQuranProgressModal));

    // Reminders
    addReminderButton.addEventListener('click', async () => {
        if (!('Notification' in window)) {
            alert('هذا المتصفح لا يدعم الإشعارات.');
            return;
        }
        if (Notification.permission === 'default') {
            await Notification.requestPermission();
        }
        updateRemindersPermissionStatus();
        if (Notification.permission !== 'granted') {
             openModal(howToNotificationsModal);
             return;
        }
        populateReminderDhikrSelect();
        reminderTimeInput.value = '';
        openModal(addReminderModal);
    });

    saveReminderButton.addEventListener('click', () => {
        const dhikr = reminderDhikrSelect.value;
        const time = reminderTimeInput.value;
        if (!dhikr || !time) {
            alert('يرجى اختيار الذكر وتحديد الوقت.');
            return;
        }
        state.reminders.push({ id: `reminder_${Date.now()}`, dhikr, time, enabled: true, lastTriggered: null });
        saveState();
        renderRemindersList();
        closeModal(addReminderModal);
    });

    deleteReminderYesButton.addEventListener('click', () => {
        if (!reminderToDelete) return;

        if (reminderToDelete.type === 'dhikr') {
            state.reminders = state.reminders.filter(r => r.id !== reminderToDelete.id);
        } else if (reminderToDelete.type === 'quran') {
            const goal = state.quranGoals.find(g => g.id === reminderToDelete.id);
            if (goal && goal.reminder) {
                goal.reminder.enabled = false;
            }
        }
        
        reminderToDelete = null;
        saveState();
        renderRemindersList();
        renderQuranGoalsList(); // Also re-render quran goals to update UI
        closeModal(deleteReminderConfirmModal);
    });

    showHowToNotificationsButton.addEventListener('click', () => {
        openModal(howToNotificationsModal);
    });

    // --- Event Delegation for Quran Goal Cards ---
    const handleQuranCardClick = (e: Event) => {
        const target = e.target as HTMLElement;

        const editButton = target.closest('.edit-quran-goal-button');
        const logButton = target.closest('.log-progress-button');
        // FIX: Cast to HTMLElement to allow access to dataset property.
        const deleteButton = target.closest('.delete-button') as HTMLElement;
        const card = target.closest('.quran-goal-card') as HTMLElement;

        if (!card) return;
        const goalId = card.dataset.id;

        if (editButton) {
            const goalToEdit = state.quranGoals.find(g => g.id === goalId);
            if (goalToEdit) {
                quranGoalToEditId = goalId;
                addQuranGoalModalTitle.textContent = 'تعديل التلاوة';
                quranGoalSurahInput.value = goalToEdit.surah || '';
                quranGoalAmountSelect.value = goalToEdit.amountType;
                quranGoalCustomRangeContainer.style.display = goalToEdit.amountType === 'custom' ? 'flex' : 'none';
                quranGoalPageFromInput.value = goalToEdit.pageFrom?.toString() || '';
                quranGoalPageToInput.value = goalToEdit.pageTo?.toString() || '';
                quranGoalPeriodSelect.value = goalToEdit.period;
                quranGoalReminderToggle.checked = goalToEdit.reminder?.enabled || false;
                quranGoalReminderTimeContainer.style.display = quranGoalReminderToggle.checked ? 'block' : 'none';
                quranGoalReminderTimeInput.value = goalToEdit.reminder?.time || '';
                openModal(addQuranGoalModal);
            }
        } else if (logButton) {
            quranGoalToLogProgressId = goalId;
            const goal = state.quranGoals.find(g => g.id === quranGoalToLogProgressId);
            if (goal) {
                logQuranGoalNameDisplay.textContent = getQuranGoalStatDescription(goal);
                logQuranPageFromInput.value = '';
                logQuranPageToInput.value = '';
                openModal(logQuranProgressModal);
            }
        } else if (deleteButton) {
            const action = deleteButton.dataset.action;
            if (action === 'delete-goal') {
                quranGoalToDeleteId = goalId;
                openModal(deleteQuranGoalConfirmModal);
            } else if (action === 'disable-reminder') {
                reminderToDelete = { id: goalId, type: 'quran' };
                openModal(deleteReminderConfirmModal);
            }
        }
    };
    
    quranGoalsListContainer.addEventListener('click', handleQuranCardClick);
    remindersList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        // Handle Quran cards within the reminders list
        if(target.closest('.quran-goal-card')) {
            handleQuranCardClick(e);
            return;
        }

        // Handle regular Dhikr reminder delete button
        // FIX: Cast to HTMLElement to allow access to dataset property.
        const deleteButton = target.closest('.delete-reminder-button') as HTMLElement;
        if(deleteButton) {
            reminderToDelete = {
                id: deleteButton.dataset.id,
                type: deleteButton.dataset.type as 'dhikr' | 'quran'
            };
            openModal(deleteReminderConfirmModal);
        }
    });

    // --- Final Initialization ---
    loadState();
    initializeUI();
    setupNavigation();
    initializeAI();

    // Start reminder check loop (checks every 30 seconds)
    setInterval(() => {
        checkReminders();
        checkInactivity();
    }, 30 * 1000);
    
    // Initial check on load
    checkReminders();
    checkInactivity();
});
