
import { GoogleGenAI, Type } from "@google/genai";

document.addEventListener('DOMContentLoaded', () => {
    // --- Page Views ---
    const pageViews = document.querySelectorAll('.page-view') as NodeListOf<HTMLElement>;
    const homeScreen = document.getElementById('home-screen') as HTMLDivElement;
    
    // --- Home Screen Cards ---
    const homeCardTasbeeh = document.getElementById('home-card-tasbeeh') as HTMLButtonElement;
    const homeCardFortress = document.getElementById('home-card-fortress') as HTMLButtonElement;
    const homeCardQuranGoals = document.getElementById('home-card-quran-goals') as HTMLButtonElement;
    const homeCardTeams = document.getElementById('home-card-teams') as HTMLButtonElement;
    const homeCardHalaqat = document.getElementById('home-card-halaqat') as HTMLButtonElement;
    const homeCardQuran = document.getElementById('home-card-quran') as HTMLButtonElement;
    const homeCardAdhkar = document.getElementById('home-card-adhkar') as HTMLButtonElement;
    const homeCardHistory = document.getElementById('home-card-history') as HTMLButtonElement;
    const homeCardStats = document.getElementById('home-card-stats') as HTMLButtonElement;
    const homeCardReminders = document.getElementById('home-card-reminders') as HTMLButtonElement;
    const homeCardSettings = document.getElementById('home-card-settings') as HTMLButtonElement;
    const homeCardNotice = document.getElementById('home-card-notice') as HTMLButtonElement;

    // --- DOM Elements ---
    const counterDisplay = document.getElementById('counter') as HTMLDivElement;
    const counterWrapper = document.querySelector('.counter-wrapper') as HTMLElement;
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
    const dhikrSelectButton = document.getElementById('dhikr-select-button') as HTMLButtonElement;
    
    // Bottom Bar
    const soundToggleButton = document.getElementById('sound-toggle-button') as HTMLButtonElement;
    const vibrationToggleButton = document.getElementById('vibration-toggle-button') as HTMLButtonElement;

    // Modals & Controls
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

    // Stats View
    const statsDhikrSelect = document.getElementById('stats-dhikr-select') as HTMLSelectElement;
    const statsPeriodTabs = document.getElementById('stats-period-tabs') as HTMLDivElement;
    const statsDisplay = document.getElementById('stats-display') as HTMLParagraphElement;
    const statsChartBar = document.getElementById('stats-chart-bar') as HTMLDivElement;
    const statsChartLabel = document.getElementById('stats-chart-label') as HTMLSpanElement;
    const statsGoalDisplay = document.getElementById('stats-goal-display') as HTMLParagraphElement;

    // Adhkar View
    const adhkarModalTitle = document.getElementById('adhkar-title') as HTMLHeadingElement;
    const adhkarListContainer = document.querySelector('#fortress-view .adhkar-list') as HTMLDivElement;
    const favoriteAdhkarListContainer = document.querySelector('#favorites-view .adhkar-list-favorites') as HTMLDivElement;
    const adhkarSearchInput = document.getElementById('adhkar-search-input') as HTMLInputElement;

    // History View
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

    // Reminders View
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

    // Reminder Type Modal
    const reminderTypeModal = document.getElementById('reminder-type-modal') as HTMLDivElement;
    const closeReminderTypeModalButton = document.getElementById('close-reminder-type-modal') as HTMLButtonElement;
    const addDhikrReminderOptionButton = document.getElementById('add-dhikr-reminder-option') as HTMLButtonElement;
    const addRecitationReminderOptionButton = document.getElementById('add-recitation-reminder-option') as HTMLButtonElement;

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

    // Notice Modal Elements
    const noticeModal = document.getElementById('notice-modal') as HTMLDivElement;
    const closeNoticeModalButton = document.getElementById('close-notice-modal') as HTMLButtonElement;
    const closeNoticeModalMainButton = document.getElementById('close-notice-modal-main') as HTMLButtonElement;

    // Quran Goals Elements
    const quranGoalsListContainer = document.getElementById('quran-goals-list') as HTMLDivElement;
    const addNewQuranGoalButton = document.getElementById('add-new-quran-goal-button') as HTMLButtonElement;

    const addQuranGoalModal = document.getElementById('add-quran-goal-modal') as HTMLDivElement;
    const addQuranGoalForm = document.getElementById('add-quran-goal-form') as HTMLFormElement;
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

    // Teams View Elements
    const teamsContent = document.getElementById('teams-content') as HTMLDivElement;
    const teamViewTitle = document.getElementById('team-view-title') as HTMLHeadingElement;
    const teamSettingsButton = document.getElementById('team-settings-button') as HTMLButtonElement;
    const addMemberFab = document.getElementById('add-member-fab') as HTMLButtonElement;

    // Create Team Modal Elements
    const createTeamModal = document.getElementById('create-team-modal') as HTMLDivElement;
    const closeCreateTeamModalButton = document.getElementById('close-create-team-modal') as HTMLButtonElement;
    const createTeamForm = document.getElementById('create-team-form') as HTMLFormElement;
    const teamNameInput = document.getElementById('team-name-input') as HTMLInputElement;
    const teamGoalInput = document.getElementById('team-goal-input') as HTMLInputElement;
    const teamUserNameInput = document.getElementById('team-user-name-input') as HTMLInputElement;

    // Add Member Modal Elements
    const addMemberModal = document.getElementById('add-member-modal') as HTMLDivElement;
    const closeAddMemberModalButton = document.getElementById('close-add-member-modal') as HTMLButtonElement;
    const addMemberForm = document.getElementById('add-member-form') as HTMLFormElement;
    const memberNameInput = document.getElementById('member-name-input') as HTMLInputElement;

    // Update Member Progress Modal Elements
    const updateMemberProgressModal = document.getElementById('update-member-progress-modal') as HTMLDivElement;
    const closeUpdateMemberProgressModalButton = document.getElementById('close-update-member-progress-modal') as HTMLButtonElement;
    const updateProgressMemberName = document.getElementById('update-progress-member-name') as HTMLParagraphElement;
    const memberProgressInput = document.getElementById('member-progress-input') as HTMLInputElement;
    const saveMemberProgressButton = document.getElementById('save-member-progress-button') as HTMLButtonElement;

    // Team Settings Modal Elements
    const teamSettingsModal = document.getElementById('team-settings-modal') as HTMLDivElement;
    const closeTeamSettingsModalButton = document.getElementById('close-team-settings-modal') as HTMLButtonElement;
    const teamMembersManagementList = document.getElementById('team-members-management-list') as HTMLDivElement;
    const leaveTeamButton = document.getElementById('leave-team-button') as HTMLButtonElement;

    // Generic Confirmation Modal
    const confirmDeleteModal = document.getElementById('confirm-delete-modal') as HTMLDivElement;
    const closeConfirmDeleteModalButton = document.getElementById('close-confirm-delete-modal') as HTMLButtonElement;
    const confirmDeleteTitle = document.getElementById('confirm-delete-title') as HTMLHeadingElement;
    const confirmDeleteMessage = document.getElementById('confirm-delete-message') as HTMLParagraphElement;
    const confirmDeleteYesButton = document.getElementById('confirm-delete-yes') as HTMLButtonElement;
    const confirmDeleteNoButton = document.getElementById('confirm-delete-no') as HTMLButtonElement;

    // Quran Browser View
    const quranBrowserView = document.getElementById('quran-browser-view') as HTMLDivElement;
    const closeQuranBrowserButton = document.getElementById('close-quran-browser-button') as HTMLButtonElement;
    const quranBrowserIframe = document.getElementById('quran-browser-iframe') as HTMLIFrameElement;
    const quranLoader = quranBrowserView.querySelector('.loader-container') as HTMLDivElement;

    // --- Halaqat Tahfeeth Elements ---
    const halaqatListContainer = document.getElementById('halaqat-list-container') as HTMLDivElement;
    const addNewHalaqaButton = document.getElementById('add-new-halaqa-button') as HTMLButtonElement;
    const addHalaqaModal = document.getElementById('add-halaqa-modal') as HTMLDivElement;
    const closeAddHalaqaModalButton = document.getElementById('close-add-halaqa-modal') as HTMLButtonElement;
    const addHalaqaForm = document.getElementById('add-halaqa-form') as HTMLFormElement;
    const halaqaNameInput = document.getElementById('halaqa-name-input') as HTMLInputElement;
    const backFromHalaqaDetails = document.getElementById('back-from-halaqa-details') as HTMLButtonElement;

    const halaqaDetailsTitle = document.getElementById('halaqa-details-title') as HTMLHeadingElement;
    const studentListContainer = document.getElementById('student-list-container') as HTMLDivElement;
    const addNewStudentButton = document.getElementById('add-new-student-button') as HTMLButtonElement;
    const addStudentModal = document.getElementById('add-student-modal') as HTMLDivElement;
    const closeAddStudentModalButton = document.getElementById('close-add-student-modal') as HTMLButtonElement;
    const addStudentForm = document.getElementById('add-student-form') as HTMLFormElement;
    const studentNameInput = document.getElementById('student-name-input') as HTMLInputElement;

    const backFromStudentDetails = document.getElementById('back-from-student-details') as HTMLButtonElement;
    const studentDetailsTitle = document.getElementById('student-details-title') as HTMLHeadingElement;
    const logNewMemorizationButton = document.getElementById('log-new-memorization-button') as HTMLButtonElement;
    const logReviewButton = document.getElementById('log-review-button') as HTMLButtonElement;
    const newMemorizationLogContainer = document.getElementById('new-memorization-log') as HTMLDivElement;
    const reviewLogContainer = document.getElementById('review-log') as HTMLDivElement;
    
    const logMemorizationModal = document.getElementById('log-memorization-modal') as HTMLDivElement;
    const closeLogMemorizationModalButton = document.getElementById('close-log-memorization-modal') as HTMLButtonElement;
    const logMemorizationForm = document.getElementById('log-memorization-form') as HTMLFormElement;
    const logMemorizationTitle = document.getElementById('log-memorization-title') as HTMLHeadingElement;
    const logSurahInput = document.getElementById('log-surah-input') as HTMLInputElement;
    const logAyatFromInput = document.getElementById('log-ayat-from-input') as HTMLInputElement;
    const logAyatToInput = document.getElementById('log-ayat-to-input') as HTMLInputElement;


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
            { text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّْطَانِ الرَّجِيمِ\n﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ﴾ [آية الكرسي]', count: 1 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ﴾ [سورة الإخلاص]', count: 3 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ﴾ [سورة الفلق]', count: 3 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ﴾ [سورة الناس]', count: 3 },
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
            { text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ.', count: 10 }
        ]
    },
    {
        title: 'أذكار المساء',
        items: [
            { text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\n﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ sِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ﴾ [آية الكرسي]', count: 1 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ﴾ [سورة الإخلاص]', count: 3 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ﴾ [سورة الفلق]', count: 3 },
            { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ﴾ [سورة الناس]', count: 3 },
            { text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.', count: 1 },
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
            { text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ.', count: 10 }
        ]
    },
    {
        title: 'أذكار الاستيقاظ من النوم',
        items: [
            { text: 'الْحَمْـدُ لِلّهِ الّذي أَحْـيانا بَعْـدَ ما أَماتَـنا وَإليه النُّـشور.', count: 1 },
            { text: 'لا إلهَ إلاّ اللّهُ وَحْـدَهُ لا شَـريكَ له، لهُ المُلـكُ ولهُ الحَمـد, وهوَ على كلّ شيءٍ قدير، سُـبْحانَ اللهِ، والحمْـدُ لله ، ولا إلهَ إلاّ اللهُ، واللهُ أكبَر، وَلا حَولَ وَلا قوّة إلاّ باللّهِ العليّ العظيم، رَبِّ اغْفرْ لي.', count: 1 },
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
    { title: 'دعاء الفزع في النوم', items: [{ text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمْزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ.', count: 1 }] },
    { title: 'ما يفعل من رأى رؤيا أو حلماً', items: [{ text: '1. يَنْفُثُ عَنْ يَسَارِهِ (ثَلَاثًا).\n2. يَسْتَعِيذُ بِاللَّهِ مِنَ الشَّيْطَانِ وَمِنْ شَرِّ مَا رَأَى (ثَلَاثَ مَرَّاتٍ).\n3. لَا يُحَدِّثُ بِهَا أَحَدًا.\n4. يَتَحَوَّلُ عَنْ جَنْبِهِ الَّذِي كَانَ عَلَيْهِ.', count: 1 }] },
    { title: 'دعاء قلق في النوم ومن فزع', items: [{ text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمْزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ.', count: 1 }] },
    { title: 'الدعاء إذا رأى ما يحب أو يكره في المنام', items: [{ text: 'إِذَا رَأَى مَا يُحِبُّ: يَقُولُ "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ".\nإِذَا رَأَى مَا يَكْرَهُ: يَسْتَعِيذُ بِاللَّهِ مِنْ شَرِّهَا وَمِنْ شَرِّ الشَّيْطَانِ، وَيَنْفُثُ عَنْ يَسَارِهِ ثَلَاثًا، وَلَا يُحَدِّثُ بِهَا أَحَدًا فَإِنَّهَا لَنْ تَضُرَّهُ.', count: 1 }] },
    { title: 'الدعاء عند لبس الحذاء', items: [{ text: 'إذا انتعل أحدكم فليبدأ باليمين، وإذا نزع فليبدأ بالشمال، لتكن اليمنى أولهما تنعل وآخرهما تنزع.\nيقول: بِسْمِ اللَّهِ.', count: 1 }] },
    {
        title: 'دعاء دخول السوق',
        items: [
            { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.', count: 1 }
        ]
    },
    { title: 'الدعاء للمسلم بظهر الغيب', items: [{ text: 'دعوة المرء المسلم لأخيه بظهر الغيب مستجابة، عند رأسه ملك موكل כלما دعا لأخيه بخير، قال الملك الموكل به: آمين ولك بمثل.', count: 1 }] },
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
            { text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، ﴿سُبْحَانَ الَّذِي sَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ﴾ اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرِنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ.', count: 1 }
        ]
    },
    {
        title: 'دعاء ركوب الدابة',
        items: [
            { text: 'بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، ﴿sُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ﴾ الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.', count: 1 }
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
    }
];

    // --- App State ---
    let appState: any = {};
    let currentAdhkarSession: any = {};
    let tempVibrationSettings: any = {};
    let itemToDelete: any = {}; // Used for generic delete confirmation

    const defaultState = {
        tasbeeh: {
            currentDhikr: 'سبحان الله',
            counts: {},
            goals: {},
        },
        dhikrList: [...DEFAULT_DHIKR_LIST],
        settings: {
            theme: 'forest',
            soundOn: true,
            vibrationOn: true,
            vibrationPatterns: {
                goal: [200, 100, 200],
                reset: [100]
            },
            notificationSound: 'ding',
            vibrationIntensity: 50,
            inactivityReminder: {
                enabled: false,
                period: 60, // in minutes
                lastTracked: Date.now()
            },
            firstLaunch: true
        },
        history: [],
        favoriteAdhkar: [],
        reminders: [],
        quranGoals: [],
        teamData: null,
        halaqat: []
    };

    // --- State Management ---
    function loadState() {
        const savedState = localStorage.getItem('tasbeehAppState');
        appState = savedState ? JSON.parse(savedState) : JSON.parse(JSON.stringify(defaultState));
        // Ensure new properties from defaultState are added if they don't exist in saved state
        appState = { ...JSON.parse(JSON.stringify(defaultState)), ...appState };
    }

    function saveState() {
        appState.settings.lastTracked = Date.now();
        localStorage.setItem('tasbeehAppState', JSON.stringify(appState));
    }

    // --- Utility Functions ---
    const showView = (viewId: string) => {
        pageViews.forEach(view => {
            view.classList.remove('active');
        });
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        } else {
            console.error(`View with id ${viewId} not found.`);
            homeScreen.classList.add('active');
        }
    };

    const openModal = (modal: HTMLElement) => {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = (modal: HTMLElement) => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    };

    function vibrate(pattern: number | number[]) {
        if (appState.settings.vibrationOn && 'vibrate' in navigator) {
            try {
                navigator.vibrate(pattern);
            } catch (e) {
                console.warn("Vibration failed. It might be unsupported on this device.", e);
            }
        }
    }

    function playSound(soundElement: HTMLAudioElement) {
        if (appState.settings.soundOn) {
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.error("Sound play failed:", e));
        }
    }

    function formatDate(timestamp: number) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    // --- UI Update Functions ---
    function updateCounterDisplay() {
        const count = appState.tasbeeh.counts[appState.tasbeeh.currentDhikr] || 0;
        counterDisplay.textContent = String(count).padStart(2, '0');
        dhikrBackgroundText.textContent = appState.tasbeeh.currentDhikr;
    }

    function updateProgressBar() {
        const count = appState.tasbeeh.counts[appState.tasbeeh.currentDhikr] || 0;
        const goal = appState.tasbeeh.goals[appState.tasbeeh.currentDhikr] || 0;

        if (goal > 0) {
            goalDisplay.textContent = `الهدف: ${goal}`;
            const progress = Math.min((count / goal) * 100, 100);
            progressBar.style.width = `${progress}%`;
            progressBar.classList.toggle('completed', count >= goal);
        } else {
            goalDisplay.textContent = 'لم يتم تحديد هدف';
            progressBar.style.width = '0%';
            progressBar.classList.remove('completed');
        }
    }

    function applyTheme(themeName: string) {
        document.body.dataset.theme = themeName;
    }

    // --- Core Logic ---
    function handleCounterClick(event: MouseEvent) {
        const count = (appState.tasbeeh.counts[appState.tasbeeh.currentDhikr] || 0) + 1;
        appState.tasbeeh.counts[appState.tasbeeh.currentDhikr] = count;

        const goal = appState.tasbeeh.goals[appState.tasbeeh.currentDhikr] || 0;
        if (goal > 0 && count === goal) {
            openModal(goalReachedModal);
            vibrate(appState.settings.vibrationPatterns.goal);
        } else {
            const intensity = appState.settings.vibrationIntensity;
            if (intensity > 0) {
                 vibrate(intensity / 2); // Simple vibration scaled by intensity
            }
        }
        
        playSound(clickSound);
        addRippleEffect(event);
        updateCounterDisplay();
        updateProgressBar();
        trackHistory();
        saveState();
    }

    function trackHistory() {
        const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
        let todayEntry = appState.history.find((entry: any) => entry.date === today);

        if (!todayEntry) {
            todayEntry = { date: today, timestamp: Date.now(), counts: {} };
            appState.history.push(todayEntry);
        }
        
        const dhikrName = appState.tasbeeh.currentDhikr;
        todayEntry.counts[dhikrName] = (todayEntry.counts[dhikrName] || 0) + 1;
    }

    function resetCounter() {
        appState.tasbeeh.counts[appState.tasbeeh.currentDhikr] = 0;
        vibrate(appState.settings.vibrationPatterns.reset);
        updateCounterDisplay();
        updateProgressBar();
        saveState();
        closeModal(resetConfirmModal);
    }
    
    function selectDhikr(dhikr: string) {
        appState.tasbeeh.currentDhikr = dhikr;
        renderDhikrScroller(); // To update active item
        updateCounterDisplay();
        updateProgressBar();
        saveState();
    }
    
    // --- Render Functions ---

    function renderDhikrScroller() {
        dhikrScrollerContainer.innerHTML = '';
        appState.dhikrList.forEach((dhikr: string) => {
            const item = document.createElement('button');
            item.className = 'dhikr-scroller-item';
            item.textContent = dhikr;
            if (dhikr === appState.tasbeeh.currentDhikr) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
            item.addEventListener('click', () => selectDhikr(dhikr));
            dhikrScrollerContainer.appendChild(item);
        });
    }

    function renderDhikrList() {
        dhikrListContainer.innerHTML = '';
        appState.dhikrList.forEach((dhikr: string) => {
            const item = document.createElement('div');
            item.className = 'dhikr-list-item';

            const main = document.createElement('div');
            main.className = 'dhikr-item-main';
            main.textContent = dhikr;
            main.addEventListener('click', () => {
                selectDhikr(dhikr);
                showView('tasbeeh-view');
            });
            
            const goal = appState.tasbeeh.goals[dhikr];
            if(goal) {
                const goalBadge = document.createElement('span');
                goalBadge.className = 'dhikr-goal-badge';
                goalBadge.textContent = String(goal);
                main.prepend(goalBadge);
            }

            const actions = document.createElement('div');
            actions.className = 'dhikr-item-actions';

            const goalButton = document.createElement('button');
            goalButton.className = 'goal-dhikr-button icon-button';
            goalButton.innerHTML = ICONS.goal;
            goalButton.ariaLabel = `تحديد هدف لـ ${dhikr}`;
            goalButton.addEventListener('click', () => openSetGoalModal(dhikr));

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-dhikr-button icon-button';
            removeButton.innerHTML = ICONS.trash;
            removeButton.ariaLabel = `حذف ${dhikr}`;
            if (DEFAULT_DHIKR_LIST.includes(dhikr)) {
                removeButton.disabled = true;
            }
            removeButton.addEventListener('click', () => openDeleteDhikrModal(dhikr));
            
            actions.appendChild(goalButton);
            actions.appendChild(removeButton);
            item.appendChild(main);
            item.appendChild(actions);
            dhikrListContainer.appendChild(item);
        });
    }

    function renderHistory() {
        if (appState.history.length === 0) {
            historyContent.innerHTML = `<p class="no-history-message">لا يوجد سجل حتى الآن. ابدأ بالذكر!</p>`;
            return;
        }

        historyContent.innerHTML = '';
        const sortedHistory = [...appState.history].sort((a,b) => b.timestamp - a.timestamp);

        sortedHistory.forEach((entry: any) => {
            const entryEl = document.createElement('div');
            entryEl.className = 'history-entry';
            
            const header = document.createElement('div');
            header.className = 'history-date-header';
            
            const dateEl = document.createElement('span');
            dateEl.className = 'history-date';
            dateEl.textContent = formatDate(entry.timestamp);

            const totalCount = Object.values(entry.counts).reduce((sum: number, count: any) => sum + count, 0);
            const timeEl = document.createElement('span');
            timeEl.className = 'history-time';
            timeEl.textContent = `الإجمالي: ${totalCount}`;

            header.appendChild(dateEl);
            header.appendChild(timeEl);

            const list = document.createElement('ul');
            list.className = 'history-dhikr-list';
            for (const [dhikr, count] of Object.entries(entry.counts)) {
                const item = document.createElement('li');
                item.className = 'history-dhikr-item';
                item.innerHTML = `<span class="dhikr-name">${dhikr}</span> <span class="dhikr-count">${count}</span>`;
                list.appendChild(item);
            }
            
            entryEl.appendChild(header);
            entryEl.appendChild(list);
            historyContent.appendChild(entryEl);
        });
    }
    
    // --- Halaqat Functions ---
    function renderHalaqatList() {
        halaqatListContainer.innerHTML = '';
        if (appState.halaqat.length === 0) {
            halaqatListContainer.innerHTML = `<p class="no-history-message">لا يوجد حلقات. قم بإضافة حلقة جديدة للبدء.</p>`;
            return;
        }
        appState.halaqat.forEach((halaqa: any) => {
            const card = document.createElement('div');
            card.className = 'halaqa-card';
            card.innerHTML = `<h3>${halaqa.name}</h3>`;
            card.onclick = () => {
                renderHalaqaDetails(halaqa.id);
                showView('halaqa-details-view');
            };
            halaqatListContainer.appendChild(card);
        });
    }

    function renderHalaqaDetails(halaqaId: string) {
        const halaqa = appState.halaqat.find((h: any) => h.id === halaqaId);
        if (!halaqa) return;
        
        halaqaDetailsTitle.textContent = halaqa.name;
        addNewStudentButton.dataset.halaqaId = halaqaId;

        studentListContainer.innerHTML = '';
        if (halaqa.students.length === 0) {
            studentListContainer.innerHTML = `<p class="no-history-message">لا يوجد طلاب في هذه الحلقة. قم بإضافة طالب جديد.</p>`;
            return;
        }
        halaqa.students.forEach((student: any) => {
            const card = document.createElement('div');
            card.className = 'student-card';
            card.innerHTML = `<h3>${student.name}</h3>`;
            card.onclick = () => {
                renderStudentDetails(halaqa.id, student.id);
                showView('student-details-view');
            };
            studentListContainer.appendChild(card);
        });
    }
    
    function renderStudentDetails(halaqaId: string, studentId: string) {
        const halaqa = appState.halaqat.find((h: any) => h.id === halaqaId);
        const student = halaqa?.students.find((s: any) => s.id === studentId);
        if (!student) return;

        studentDetailsTitle.textContent = student.name;
        backFromStudentDetails.dataset.halaqaId = halaqaId;
        logNewMemorizationButton.dataset.halaqaId = halaqaId;
        logNewMemorizationButton.dataset.studentId = studentId;
        logReviewButton.dataset.halaqaId = halaqaId;
        logReviewButton.dataset.studentId = studentId;

        const renderLog = (container: HTMLElement, log: any[]) => {
            container.innerHTML = '';
            if (!log || log.length === 0) {
                container.innerHTML = `<p class="no-history-message">لا يوجد سجل.</p>`;
                return;
            }
            [...log].reverse().forEach(item => {
                const logEl = document.createElement('div');
                logEl.className = 'log-item';
                logEl.innerHTML = `
                    <span class="log-item-details">${item.surah}: ${item.from}-${item.to}</span>
                    <span class="log-item-date">${new Date(item.date).toLocaleDateString('ar-EG')}</span>
                `;
                container.appendChild(logEl);
            });
        };
        
        renderLog(newMemorizationLogContainer, student.newMemorizationLog);
        renderLog(reviewLogContainer, student.reviewLog);
    }


    // --- Event Handlers ---
    
    function addRippleEffect(event: MouseEvent) {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        counterWrapper.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    }
    
    function openSetGoalModal(dhikr: string) {
        setGoalDhikrNameDisplay.textContent = dhikr;
        setGoalInput.value = appState.tasbeeh.goals[dhikr] || '';
        openModal(setGoalModal);
        setGoalSaveButton.onclick = () => {
            const goalValue = parseInt(setGoalInput.value, 10);
            if (goalValue > 0) {
                appState.tasbeeh.goals[dhikr] = goalValue;
            } else {
                delete appState.tasbeeh.goals[dhikr];
            }
            saveState();
            updateProgressBar();
            renderDhikrList(); // to update goal badge
            closeModal(setGoalModal);
        };
    }
    
    function openDeleteDhikrModal(dhikr: string) {
        deleteDhikrNameDisplay.textContent = dhikr;
        openModal(deleteDhikrConfirmModal);
        deleteDhikrYesButton.onclick = () => {
            appState.dhikrList = appState.dhikrList.filter((d: string) => d !== dhikr);
            delete appState.tasbeeh.counts[dhikr];
            delete appState.tasbeeh.goals[dhikr];
            if (appState.tasbeeh.currentDhikr === dhikr) {
                appState.tasbeeh.currentDhikr = appState.dhikrList[0] || '';
            }
            saveState();
            renderDhikrList();
            renderDhikrScroller();
            selectDhikr(appState.tasbeeh.currentDhikr);
            closeModal(deleteDhikrConfirmModal);
        }
    }
    
    // --- Init App ---
    function initApp() {
        loadState();
        applyTheme(appState.settings.theme);

        if (appState.settings.firstLaunch) {
            openModal(noticeModal);
            appState.settings.firstLaunch = false;
            saveState();
        }

        // Initial renders
        selectDhikr(appState.tasbeeh.currentDhikr);
        updateCounterDisplay();
        updateProgressBar();
        renderDhikrScroller();

        // --- Navigation Event Listeners ---
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', () => showView('home-screen'));
        });
        homeCardTasbeeh.addEventListener('click', () => showView('tasbeeh-view'));
        homeCardFortress.addEventListener('click', () => {
            // renderAdhkarCategories(); 
            showView('fortress-view');
        });
        homeCardAdhkar.addEventListener('click', () => {
            // renderFavoriteAdhkar();
            showView('favorites-view');
        });
        homeCardHistory.addEventListener('click', () => {
            renderHistory();
            showView('history-view');
        });
        homeCardStats.addEventListener('click', () => {
             // renderStats();
            showView('stats-view');
        });
        homeCardReminders.addEventListener('click', () => {
            // checkNotificationPermissions();
            // renderReminders();
            showView('reminders-view');
        });
        homeCardSettings.addEventListener('click', () => showView('settings-view'));
        homeCardNotice.addEventListener('click', () => openModal(noticeModal));
        homeCardQuranGoals.addEventListener('click', () => {
            // renderQuranGoals();
            showView('quran-goals-view');
        });
        homeCardTeams.addEventListener('click', () => {
            // renderTeamView();
            showView('teams-view');
        });
         homeCardQuran.addEventListener('click', () => {
            quranLoader.style.opacity = '1';
            quranBrowserIframe.src = 'https://quran.com';
            quranBrowserIframe.onload = () => {
                quranLoader.style.opacity = '0';
            };
            showView('quran-browser-view');
        });

        homeCardHalaqat.addEventListener('click', () => {
            renderHalaqatList();
            showView('halaqat-list-view');
        });

        // --- Tasbeeh View Listeners ---
        counterWrapper.addEventListener('click', handleCounterClick);
        resetButton.addEventListener('click', () => openModal(resetConfirmModal));
        resetConfirmYesButton.addEventListener('click', resetCounter);
        resetConfirmNoButton.addEventListener('click', () => closeModal(resetConfirmModal));
        closeResetConfirmModalButton.addEventListener('click', () => closeModal(resetConfirmModal));
        
        soundToggleButton.innerHTML = appState.settings.soundOn ? ICONS.soundOn : ICONS.soundOff;
        soundToggleButton.addEventListener('click', () => {
            appState.settings.soundOn = !appState.settings.soundOn;
            soundToggleButton.innerHTML = appState.settings.soundOn ? ICONS.soundOn : ICONS.soundOff;
            saveState();
        });
        
        vibrationToggleButton.innerHTML = appState.settings.vibrationOn ? ICONS.vibrationOn : ICONS.vibrationOff;
        vibrationToggleButton.addEventListener('click', () => {
            appState.settings.vibrationOn = !appState.settings.vibrationOn;
            vibrationToggleButton.innerHTML = appState.settings.vibrationOn ? ICONS.vibrationOn : ICONS.vibrationOff;
            saveState();
        });

        // --- Dhikr List Modal/View ---
        dhikrSelectButton.addEventListener('click', () => {
            renderDhikrList();
            showView('dhikr-list-view');
        });
        closeGoalModalButton.addEventListener('click', () => closeModal(goalReachedModal));
        closeSetGoalModalButton.addEventListener('click', () => closeModal(setGoalModal));
        closeDeleteDhikrModalButton.addEventListener('click', () => closeModal(deleteDhikrConfirmModal));
        deleteDhikrNoButton.addEventListener('click', () => closeModal(deleteDhikrConfirmModal));

        saveNewDhikrButton.addEventListener('click', () => {
            const newDhikr = newDhikrInput.value.trim();
            if (newDhikr && !appState.dhikrList.includes(newDhikr)) {
                appState.dhikrList.push(newDhikr);
                saveState();
                renderDhikrList();
                renderDhikrScroller();
                newDhikrInput.value = '';
            }
        });

        // --- Settings View Listeners ---
        themeSelect.value = appState.settings.theme;
        themeSelect.addEventListener('change', () => {
            appState.settings.theme = themeSelect.value;
            applyTheme(appState.settings.theme);
            saveState();
        });

        // --- History View Listeners ---
        clearHistoryButton.addEventListener('click', () => openModal(clearHistoryConfirmModal));
        closeClearHistoryModalButton.addEventListener('click', () => closeModal(clearHistoryConfirmModal));
        clearHistoryNoButton.addEventListener('click', () => closeModal(clearHistoryConfirmModal));
        clearHistoryYesButton.addEventListener('click', () => {
            appState.history = [];
            saveState();
            renderHistory();
            closeModal(clearHistoryConfirmModal);
        });

        // --- Notice Modal Listeners ---
        closeNoticeModalButton.addEventListener('click', () => closeModal(noticeModal));
        closeNoticeModalMainButton.addEventListener('click', () => closeModal(noticeModal));

        // --- Quran Browser Listeners ---
        closeQuranBrowserButton.addEventListener('click', () => {
            showView('home-screen');
            quranBrowserIframe.src = 'about:blank'; // unload content
        });

        // --- Halaqat View Listeners ---
        addNewHalaqaButton.addEventListener('click', () => openModal(addHalaqaModal));
        closeAddHalaqaModalButton.addEventListener('click', () => closeModal(addHalaqaModal));
        addHalaqaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = halaqaNameInput.value.trim();
            if (name) {
                appState.halaqat.push({
                    id: `halaqa_${Date.now()}`,
                    name: name,
                    students: []
                });
                saveState();
                renderHalaqatList();
                halaqaNameInput.value = '';
                closeModal(addHalaqaModal);
            }
        });
        
        backFromHalaqaDetails.addEventListener('click', () => showView('halaqat-list-view'));

        addNewStudentButton.addEventListener('click', (e) => {
            addStudentForm.dataset.halaqaId = (e.currentTarget as HTMLButtonElement).dataset.halaqaId;
            openModal(addStudentModal);
        });
        closeAddStudentModalButton.addEventListener('click', () => closeModal(addStudentModal));
        addStudentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const halaqaId = addStudentForm.dataset.halaqaId;
            const name = studentNameInput.value.trim();
            const halaqa = appState.halaqat.find((h: any) => h.id === halaqaId);
            if (name && halaqa) {
                halaqa.students.push({
                    id: `student_${Date.now()}`,
                    name: name,
                    newMemorizationLog: [],
                    reviewLog: []
                });
                saveState();
                renderHalaqaDetails(halaqaId);
                studentNameInput.value = '';
                closeModal(addStudentModal);
            }
        });
        
        backFromStudentDetails.addEventListener('click', (e) => {
            const halaqaId = (e.currentTarget as HTMLButtonElement).dataset.halaqaId;
            if (halaqaId) {
                renderHalaqaDetails(halaqaId);
                showView('halaqa-details-view');
            } else {
                showView('halaqat-list-view');
            }
        });
        
        const openLogModal = (e: Event, type: 'new' | 'review') => {
            const button = e.currentTarget as HTMLButtonElement;
            const { halaqaId, studentId } = button.dataset;
            
            logMemorizationTitle.textContent = type === 'new' ? 'تسجيل حفظ جديد' : 'تسجيل مراجعة';
            logMemorizationForm.dataset.type = type;
            logMemorizationForm.dataset.halaqaId = halaqaId;
            logMemorizationForm.dataset.studentId = studentId;
            logMemorizationForm.reset();
            openModal(logMemorizationModal);
        };
        
        logNewMemorizationButton.addEventListener('click', (e) => openLogModal(e, 'new'));
        logReviewButton.addEventListener('click', (e) => openLogModal(e, 'review'));
        closeLogMemorizationModalButton.addEventListener('click', () => closeModal(logMemorizationModal));
        
        logMemorizationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const { type, halaqaId, studentId } = logMemorizationForm.dataset;
            if (!type || !halaqaId || !studentId) return;

            const halaqa = appState.halaqat.find((h: any) => h.id === halaqaId);
            const student = halaqa?.students.find((s: any) => s.id === studentId);

            if (student) {
                const newLog = {
                    surah: logSurahInput.value,
                    from: logAyatFromInput.value,
                    to: logAyatToInput.value,
                    date: Date.now()
                };
                
                if (type === 'new') {
                    student.newMemorizationLog.push(newLog);
                } else {
                    student.reviewLog.push(newLog);
                }
                
                saveState();
                renderStudentDetails(halaqaId, studentId);
                closeModal(logMemorizationModal);
            }
        });

        // Register Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('ServiceWorker registration successful with scope: ', registration.scope))
                    .catch(err => console.log('ServiceWorker registration failed: ', err));
            });
        }
    }

    initApp();
});
