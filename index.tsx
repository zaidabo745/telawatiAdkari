
import { GoogleGenAI, Type } from "@google/genai";

document.addEventListener('DOMContentLoaded', () => {
    // --- Page Views ---
    const pageViews = document.querySelectorAll('.page-view') as NodeListOf<HTMLElement>;
    const allViews = Array.from(pageViews);
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
    const tasbeehHistoryButton = document.getElementById('tasbeeh-history-button') as HTMLButtonElement;

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
    const fortressHistoryButton = document.getElementById('fortress-history-button') as HTMLButtonElement;

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
    const exportHalaqatButton = document.getElementById('export-halaqat-button') as HTMLButtonElement;
    const importHalaqatButton = document.getElementById('import-halaqat-button') as HTMLButtonElement;
    const importHalaqatInput = document.getElementById('import-halaqat-input') as HTMLInputElement;

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

    // Adhkar Complete Modal
    const adhkarCompleteModal = document.getElementById('adhkar-complete-modal') as HTMLDivElement;
    const closeAdhkarCompleteModalButton = document.getElementById('close-adhkar-complete-modal') as HTMLButtonElement;
    const completedAdhkarNameDisplay = document.getElementById('completed-adhkar-name') as HTMLSpanElement;
    const adhkarReminderTimeInput = document.getElementById('adhkar-reminder-time-input') as HTMLInputElement;
    const saveAdhkarReminderButton = document.getElementById('save-adhkar-reminder-button') as HTMLButtonElement;
    const skipAdhkarReminderButton = document.getElementById('skip-adhkar-reminder-button') as HTMLButtonElement;


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

    const completeQuranGoalConfirmModal = document.getElementById('complete-quran-goal-confirm-modal') as HTMLDivElement;
    const closeCompleteQuranGoalModalButton = document.getElementById('close-complete-quran-goal-modal') as HTMLButtonElement;
    const completeQuranGoalYesButton = document.getElementById('complete-quran-goal-yes') as HTMLButtonElement;
    const completeQuranGoalNoButton = document.getElementById('complete-quran-goal-no') as HTMLButtonElement;

    const logQuranProgressModal = document.getElementById('log-quran-progress-modal') as HTMLDivElement;
    const closeLogQuranProgressModalButton = document.getElementById('close-log-quran-progress-modal') as HTMLButtonElement;
    const logQuranGoalNameDisplay = document.getElementById('log-quran-goal-name') as HTMLParagraphElement;
    const logQuranPageFromInput = document.getElementById('log-quran-page-from-input') as HTMLInputElement;
    const logQuranPageToInput = document.getElementById('log-quran-page-to-input') as HTMLInputElement;
    const logQuranProgressSaveButton = document.getElementById('log-quran-progress-save') as HTMLButtonElement;
    const logQuranProgressCancelButton = document.getElementById('log-quran-progress-cancel') as HTMLButtonElement;

    // Quran Goals History
    const quranGoalsHistoryButton = document.getElementById('quran-goals-history-button') as HTMLButtonElement;
    const quranGoalsHistoryPanel = document.getElementById('quran-goals-history-panel') as HTMLDivElement;
    const closeQuranGoalsHistoryButton = document.getElementById('close-quran-goals-history-button') as HTMLButtonElement;
    const clearQuranGoalsHistoryButton = document.getElementById('clear-quran-goals-history-button') as HTMLButtonElement;
    const quranGoalsHistoryContent = document.getElementById('quran-goals-history-content') as HTMLDivElement;


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
    const addQuranBookmarkButton = document.getElementById('add-quran-bookmark-button') as HTMLButtonElement;
    const viewQuranBookmarksButton = document.getElementById('view-quran-bookmarks-button') as HTMLButtonElement;

    // Add Quran Bookmark Modal
    const addQuranBookmarkModal = document.getElementById('add-quran-bookmark-modal') as HTMLDivElement;
    const closeAddQuranBookmarkModalButton = document.getElementById('close-add-quran-bookmark-modal-button') as HTMLButtonElement;
    const addQuranBookmarkForm = document.getElementById('add-quran-bookmark-form') as HTMLFormElement;
    const bookmarkSurahInput = document.getElementById('bookmark-surah-input') as HTMLInputElement;
    const bookmarkReferenceInput = document.getElementById('bookmark-reference-input') as HTMLInputElement;
    const bookmarkNotesInput = document.getElementById('bookmark-notes-input') as HTMLTextAreaElement;

    // Quran Bookmarks Panel
    const quranBookmarksPanel = document.getElementById('quran-bookmarks-panel') as HTMLDivElement;
    const closeQuranBookmarksPanelButton = document.getElementById('close-quran-bookmarks-panel-button') as HTMLButtonElement;
    const quranBookmarksContent = document.getElementById('quran-bookmarks-content') as HTMLDivElement;


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

    // --- Tasbeeh History Panel Elements ---
    const tasbeehHistoryPanel = document.getElementById('tasbeeh-history-panel') as HTMLDivElement;
    const closeTasbeehHistoryButton = document.getElementById('close-tasbeeh-history-button') as HTMLButtonElement;
    const clearTasbeehHistoryButton = document.getElementById('clear-tasbeeh-history-button') as HTMLButtonElement;
    const tasbeehHistoryContent = document.getElementById('tasbeeh-history-content') as HTMLDivElement;
    
    // --- Fortress History Panel Elements ---
    const fortressHistoryPanel = document.getElementById('fortress-history-panel') as HTMLDivElement;
    const closeFortressHistoryButton = document.getElementById('close-fortress-history-button') as HTMLButtonElement;
    const clearFortressHistoryButton = document.getElementById('clear-fortress-history-button') as HTMLButtonElement;
    const fortressHistoryContent = document.getElementById('fortress-history-content') as HTMLDivElement;


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
        bell: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>`,
        check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
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
                { text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّْطَانِ الرَّجِيمِ\n﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ﴾ [آية الكرسي]', count: 1 },
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
                { text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\n﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ sِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ﴾ [آية الكرسي]', count: 1 },
                { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ﴾ [سورة الإخلاص]', count: 3 },
                { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ﴾ [سورة الفلق]', count: 3 },
                { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\n﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ﴾ [سورة الناس]', count: 3 },
                { text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.', count: 1 },
                { text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْyَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ.', count: 1 },
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
                { text: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا، ثُمَّ لِيُسَلِّمْ عَلَى أَهْلِهِ.', count: 1 }
            ]
        },
        {
            title: 'دعاء الذهاب إلى المسجد',
            items: [
                { text: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ فِي sَمْعِي نُورًا، وَاجْعَلْ فِي بَصَرِي نُورًا، وَاجْعَلْ مِنْ خَلْفِي نُورًا، وَمِنْ أَمَامِي نُورًا، وَاجْعَلْ مِنْ فَوْقِي نُورًا، وَمِنْ تَحْتِي نُورًا، اللَّهُمَّ أَعْطِنِي نُورًا.', count: 1 }
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
                { text: 'يَقُولُ: "وَأَنَا أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، رَضِيتُ بِاللَّهِ رَبًّا وَبِمُحَمَّدٍ رَسُولًا وَبِالْإِسْلَامِ دِينًا" عَقِبَ تَشَهُّدِ الْمُؤَذِّنِ.', count: 1 },
                { text: 'يُصَلِّي عَلَى النَّبِيِّ ﷺ بَعْدَ فَرَاغِهِ مِنْ إِجَابَةِ الْمُؤَذِّنِ.', count: 1 },
                { text: 'يَقُولُ: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ، [إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ]".', count: 1 },
                { text: 'يَدْعُو لِنَفْسِهِ بَيْنَ الْأَذَانِ وَالْإِقَامَةِ فَإِنَّ الدُّعَاءَ حِينَئِذٍ لَا يُرَدُّ.', count: 1 }
            ]
        },
        {
            title: 'دعاء الاستفتاح',
            items: [
                { text: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ.', count: 1 },
                { text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ.', count: 1 }
            ]
        },
        {
            title: 'دعاء الركوع',
            items: [
                { text: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ.', count: 3 },
                { text: 'سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، اللَّهُمَّ اغْفِرْ لِي.', count: 1 }
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
                { text: 'سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، اللَّهُمَّ اغْفِرْ لِي.', count: 1 }
            ]
        },
        {
            title: 'دعاء الجلسة بين السجدتين',
            items: [
                { text: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي.', count: 1 },
                { text: 'اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَاجْبُرْنِي، وَعَافِنِي، وَارْزُقْنِي، وَارْفَعْنِي.', count: 1 }
            ]
        },
        {
            title: 'دعاء سجود التلاوة',
            items: [
                { text: 'سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ، بِحَوْلِهِ وَقُوَّتِهِ، فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ.', count: 1 }
            ]
        },
        {
            title: 'التشهد',
            items: [
                { text: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ، وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.', count: 1 }
            ]
        },
        {
            title: 'الصلاة على النبي بعد التشهد',
            items: [
                { text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.', count: 1 }
            ]
        },
        {
            title: 'الدعاء بعد التشهد الأخير',
            items: [
                { text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ.', count: 1 }
            ]
        },
        {
            title: 'الأذكار بعد السلام من الصلاة',
            items: [
                { text: 'أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.', count: 1 },
                { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.', count: 1 },
                { text: 'سُبْحَانَ اللَّهِ (33 مرة)، الْحَمْدُ لِلَّهِ (33 مرة)، اللَّهُ أَكْبَرُ (33 مرة)، ثُمَّ يَقُولُ تَمَامَ الْمِائَةِ: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.', count: 1 },
                { text: 'قِرَاءَةُ آيَةِ الْكُرْسِيِّ.', count: 1 },
                { text: 'قِرَاءَةُ سُورَةِ الْإِخْلَاصِ وَالْمُعَوِّذَتَيْنِ.', count: 1 }
            ]
        },
        {
            title: 'دعاء صلاة الاستخارة',
            items: [
                { text: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ -وَيُسَمِّي حَاجَتَهُ- خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي، ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي بِهِ.', count: 1 }
            ]
        },
        {
            title: 'دعاء الهم والحزن',
            items: [
                { text: 'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي.', count: 1 }
            ]
        },
        {
            title: 'دعاء الكرب',
            items: [
                { text: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.', count: 1 }
            ]
        },
        {
            title: 'دعاء لقاء العدو',
            items: [
                { text: 'اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ، وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ.', count: 1 }
            ]
        },
        {
            title: 'دعاء من خاف ظلم السلطان',
            items: [
                { text: 'اللَّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، كُنْ لِي جَارًا مِنْ فُلَانِ بْنِ فُلَانٍ، وَأَحْزَابِهِ مِنْ خَلَائِقِكَ، أَنْ يَفْرُطَ عَلَيَّ أَحَدٌ مِنْهُمْ أَوْ يَطْغَى، عَزَّ جَارُكَ، وَجَلَّ ثَنَاؤُكَ، وَلَا إِلَهَ إِلَّا أَنْتَ.', count: 1 }
            ]
        },
        {
            title: 'دعاء قضاء الدين',
            items: [
                { text: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ.', count: 1 }
            ]
        },
        {
            title: 'دعاء طرد الشيطان ووساوسه',
            items: [
                { text: 'الِاسْتِعَاذَةُ بِاللَّهِ مِنْهُ.', count: 1 },
                { text: 'الْأَذَانُ.', count: 1 },
                { text: 'الْأَذْكَارُ وَقِرَاءَةُ الْقُرْآنِ.', count: 1 }
            ]
        },
        {
            title: 'دعاء زيارة القبور',
            items: [
                { text: 'السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، أَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ.', count: 1 }
            ]
        },
        {
            title: 'دعاء الريح',
            items: [
                { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا.', count: 1 }
            ]
        },
        {
            title: 'دعاء الرعد',
            items: [
                { text: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ.', count: 1 }
            ]
        },
        {
            title: 'دعاء رؤية الهلال',
            items: [
                { text: 'اللَّهُ أَكْبَرُ، اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، وَالتَّوْفِيقِ لِمَا تُحِبُّ رَبَّنَا وَتَرْضَى، رَبُّنَا وَرَبُّكَ اللَّهُ.', count: 1 }
            ]
        },
        {
            title: 'الدعاء عند إفطار الصائم',
            items: [
                { text: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ.', count: 1 }
            ]
        },
        {
            title: 'الدعاء قبل الطعام',
            items: [
                { text: 'إِذَا أَكَلَ أَحَدُكُمْ طَعَامًا فَلْيَقُلْ: بِسْمِ اللَّهِ، فَإِنْ نَسِيَ فِي أَوَّلِهِ فَلْيَقُلْ: بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ.', count: 1 }
            ]
        },
        {
            title: 'الدعاء عند الفراغ من الطعام',
            items: [
                { text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ.', count: 1 }
            ]
        },
        {
            title: 'دعاء العطاس',
            items: [
                { text: 'إِذَا عَطَسَ أَحَدُكُمْ فَلْيَقُلْ: الْحَمْدُ لِلَّهِ، وَلْيَقُلْ لَهُ أَخُوهُ أَوْ صَاحِبُهُ: يَرْحَمُكَ اللَّهُ. فَإِذَا قَالَ لَهُ: يَرْحَمُكَ اللَّهُ، فَلْيَقُلْ: يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ.', count: 1 }
            ]
        },
        {
            title: 'الدعاء للمتزوج',
            items: [
                { text: 'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ.', count: 1 }
            ]
        },
        {
            title: 'دعاء الغضب',
            items: [
                { text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.', count: 1 }
            ]
        },
        {
            title: 'كفارة المجلس',
            items: [
                { text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ.', count: 1 }
            ]
        },
        {
            title: 'دعاء الركوب',
            items: [
                { text: 'بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ.', count: 1 }
            ]
        },
        {
            title: 'دعاء السفر',
            items: [
                { text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرِنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ.', count: 1 }
            ]
        },
        {
            title: 'دعاء دخول السوق',
            items: [
                { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.', count: 1 }
            ]
        },
        {
            title: 'ما يقول من أحس وجعا في جسده',
            items: [
                { text: 'ضَعْ يَدَكَ عَلَى الَّذِي تَأَلَّمَ مِنْ جَسَدِكَ وَقُلْ: بِسْمِ اللَّهِ (ثَلَاثًا)، وَقُلْ (سَبْعَ مَرَّاتٍ): أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ.', count: 1 }
            ]
        },
        {
            title: 'الاستغفار والتوبة',
            items: [
                { text: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ.', count: 1 }
            ]
        },
        {
            title: 'فضل التسبيح والتحميد والتهليل والتكبير',
            items: [
                { text: 'مَنْ قَالَ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، فِي يَوْمٍ مِائَةَ مَرَّةٍ، حُطَّتْ خَطَايَاهُ وَلَوْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ.', count: 1 },
                { text: 'مَنْ قَالَ: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، عَشْرَ مِرَارٍ، كَانَ كَمَنْ أَعْتَقَ أَرْبَعَةَ أَنْفُسٍ مِنْ وَلَدِ إِسْمَاعِيلَ.', count: 1 },
                { text: 'كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ.', count: 1 }
            ]
        }
    ];

    // --- APPLICATION LOGIC ---

    // --- State Management ---
    let counter = 0;
    let dhikrList = [];
    let goals = {};
    let reminders = [];
    let state = {
        activeDhikr: ''
    };
    let settings = {
        soundEnabled: true,
        vibrationEnabled: true,
        vibrationIntensity: 20
    };
    let quranBookmarks = [];
    let quranGoals = [];
    let quranGoalsHistory = [];
    let editingQuranGoalId: number | null = null;
    let goalToLogProgressForId: number | null = null;
    let goalToDeleteId: number | null = null;
    let goalToCompleteId: number | null = null;
    let favoriteAdhkar = [];
    let fortressHistory = [];
    let tasbeehHistory = [];
    let dhikrToDelete: string | null = null;
    let dhikrToSetGoalFor: string | null = null;
    let adhkarToSetReminderFor: string | null = null;
    let currentAdhkarSession = {
        category: null,
        items: [],
        currentIndex: -1,
        counts: {}
    };

    // --- Core Functions ---

    const updateCounterDisplay = () => {
        counterDisplay.textContent = String(counter).padStart(2, '0');
    };

    const updateGoalDisplay = () => {
        const goal = goals[state.activeDhikr];
        if (goal) {
            goalDisplay.textContent = `الهدف: ${counter} / ${goal}`;
            const progress = Math.min((counter / goal) * 100, 100);
            progressBar.style.width = `${progress}%`;
            progressBar.classList.toggle('completed', counter >= goal);
        } else {
            goalDisplay.textContent = 'لم يتم تحديد هدف';
            progressBar.style.width = '0%';
            progressBar.classList.remove('completed');
        }
    };
    
    const saveCurrentCountToHistory = () => {
        if (counter > 0 && state.activeDhikr) {
            tasbeehHistory.unshift({
                dhikr: state.activeDhikr,
                count: counter,
                timestamp: Date.now()
            });
            saveTasbeehHistory();
        }
    };

    const setActiveDhikr = (dhikrName, scroll = true) => {
        if (!dhikrName || dhikrName === state.activeDhikr) return;
        
        saveCurrentCountToHistory(); // Save progress of the previous dhikr
        
        state.activeDhikr = dhikrName;
        const repeatedText = `${dhikrName} `.repeat(Math.ceil(50 / dhikrName.length));
        dhikrBackgroundText.textContent = repeatedText;
        
        const scrollerItems = dhikrScrollerContainer.querySelectorAll('.dhikr-scroller-item');
        scrollerItems.forEach(item => {
            const itemElement = item as HTMLElement;
            const itemDhikr = itemElement.dataset.dhikr;
            if (itemDhikr === dhikrName) {
                item.classList.add('active');
                if (scroll) {
                    item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            } else {
                item.classList.remove('active');
            }
        });

        // For simplicity, we reset the counter when changing dhikr
        counter = 0;
        updateCounterDisplay();
        updateGoalDisplay();
    };

    const populateDhikrScroller = () => {
        dhikrScrollerContainer.innerHTML = '';
        dhikrList.forEach(dhikr => {
            const item = document.createElement('div');
            item.className = 'dhikr-scroller-item';
            item.textContent = dhikr;
            item.dataset.dhikr = dhikr;
            item.addEventListener('click', () => setActiveDhikr(dhikr));
            dhikrScrollerContainer.appendChild(item);
        });
    };

    const incrementCounter = () => {
        counter++;
        updateCounterDisplay();
        updateGoalDisplay();

        // Add "pop" animation to the counter
        counterDisplay.classList.add('animating');
        counterDisplay.addEventListener('animationend', () => {
            counterDisplay.classList.remove('animating');
        }, { once: true });

        if (settings.soundEnabled && clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.error("Sound play failed:", e));
        }
        if (settings.vibrationEnabled && navigator.vibrate) {
            navigator.vibrate(settings.vibrationIntensity);
        }

        const goal = goals[state.activeDhikr];
        if (goal && counter === goal) {
            goalReachedModal.classList.add('active');
            if (settings.vibrationEnabled && navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
            }
        }
    };

    const resetCounter = () => {
        saveCurrentCountToHistory();
        counter = 0;
        updateCounterDisplay();
        updateGoalDisplay();
    };

    const showView = (viewId) => {
        allViews.forEach(view => {
            view.classList.toggle('active', view.id === viewId);
        });
    };

    // --- Dhikr List Functions ---
    const loadDhikrList = () => {
        const stored = localStorage.getItem('dhikrList');
        if (stored) {
            dhikrList = JSON.parse(stored);
        } else {
            dhikrList = [...DEFAULT_DHIKR_LIST];
        }
        if (!state.activeDhikr || !dhikrList.includes(state.activeDhikr)) {
            state.activeDhikr = dhikrList[0] || '';
        }
    };
    
    const loadGoals = () => {
        const stored = localStorage.getItem('dhikrGoals');
        if (stored) {
            goals = JSON.parse(stored);
        } else {
            goals = {};
        }
    };

    const saveGoals = () => {
        localStorage.setItem('dhikrGoals', JSON.stringify(goals));
    };

    const openSetGoalModal = (dhikr) => {
        dhikrToSetGoalFor = dhikr;
        setGoalDhikrNameDisplay.textContent = dhikr;
        const currentGoal = goals[dhikr] || '';
        setGoalInput.value = currentGoal;
        setGoalModal.classList.add('active');
    };

    const saveDhikrList = () => {
        localStorage.setItem('dhikrList', JSON.stringify(dhikrList));
    };
    
    const renderDhikrList = () => {
        dhikrListContainer.innerHTML = '';
        dhikrList.forEach(dhikr => {
            const item = document.createElement('div');
            item.className = 'dhikr-list-item';

            const main = document.createElement('div');
            main.className = 'dhikr-item-main';
            
            const dhikrText = document.createElement('span');
            dhikrText.textContent = dhikr;
            main.appendChild(dhikrText);

            const goal = goals[dhikr];
            if (goal) {
                const goalBadge = document.createElement('span');
                goalBadge.className = 'dhikr-goal-badge';
                goalBadge.textContent = goal;
                main.appendChild(goalBadge);
            }

            main.addEventListener('click', () => {
                setActiveDhikr(dhikr);
                showView('tasbeeh-view');
            });

            const actions = document.createElement('div');
            actions.className = 'dhikr-item-actions';

            const goalButton = document.createElement('button');
            goalButton.className = 'icon-button goal-dhikr-button';
            goalButton.innerHTML = ICONS.goal;
            goalButton.setAttribute('aria-label', `تحديد هدف لـ ${dhikr}`);
            goalButton.addEventListener('click', (e) => {
                e.stopPropagation();
                openSetGoalModal(dhikr);
            });
            actions.appendChild(goalButton);

            if (!DEFAULT_DHIKR_LIST.includes(dhikr)) {
                const deleteButton = document.createElement('button');
                deleteButton.className = 'icon-button remove-dhikr-button';
                deleteButton.innerHTML = ICONS.trash;
                deleteButton.setAttribute('aria-label', `حذف ${dhikr}`);
                deleteButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent main click handler
                    dhikrToDelete = dhikr;
                    deleteDhikrNameDisplay.textContent = dhikr;
                    deleteDhikrConfirmModal.classList.add('active');
                });
                 actions.appendChild(deleteButton);
            }

            item.appendChild(main);
            item.appendChild(actions);
            dhikrListContainer.appendChild(item);
        });
    };


    // --- Quran Bookmarks Functions ---
    const loadQuranBookmarks = () => {
        const stored = localStorage.getItem('quranBookmarks');
        if (stored) {
            quranBookmarks = JSON.parse(stored);
        }
    };

    const saveQuranBookmarks = () => {
        localStorage.setItem('quranBookmarks', JSON.stringify(quranBookmarks));
    };

    const renderQuranBookmarks = () => {
        quranBookmarksContent.innerHTML = '';
        if (quranBookmarks.length === 0) {
            quranBookmarksContent.innerHTML = `<p class="no-history-message">لا توجد علامات مرجعية.</p>`;
            return;
        }

        quranBookmarks.forEach(bookmark => {
            const item = document.createElement('div');
            item.className = 'bookmark-item';
            
            const info = document.createElement('div');
            info.className = 'bookmark-info';
            
            const title = document.createElement('p');
            title.className = 'bookmark-title';
            title.textContent = `${bookmark.surah} - ${bookmark.reference}`;
            info.appendChild(title);

            if (bookmark.notes) {
                const notes = document.createElement('p');
                notes.className = 'bookmark-notes';
                notes.textContent = bookmark.notes;
                info.appendChild(notes);
            }

            const deleteButton = document.createElement('button');
            deleteButton.className = 'icon-button danger';
            deleteButton.innerHTML = ICONS.trash;
            deleteButton.setAttribute('aria-label', 'حذف العلامة');
            deleteButton.addEventListener('click', () => {
                quranBookmarks = quranBookmarks.filter(b => b.id !== bookmark.id);
                saveQuranBookmarks();
                renderQuranBookmarks();
            });

            item.appendChild(info);
            item.appendChild(deleteButton);
            quranBookmarksContent.appendChild(item);
        });
    };

    // --- Reminders Functions ---
    const loadReminders = () => {
        const stored = localStorage.getItem('reminders');
        if (stored) {
            reminders = JSON.parse(stored);
        }
    };
    const saveReminders = () => {
        localStorage.setItem('reminders', JSON.stringify(reminders));
    };
    const addReminder = async (reminder) => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert('تم رفض إذن الإشعارات. لا يمكن إضافة تذكير.');
                return;
            }
        }
        reminders.push(reminder);
        saveReminders();
        renderReminders();
    };

    const renderReminders = () => {
        remindersList.innerHTML = '';
        if(reminders.length === 0) {
            remindersList.innerHTML = `<p class="no-history-message">لا توجد تذكيرات مجدولة.</p>`;
            return;
        }

        reminders.forEach(reminder => {
            const item = document.createElement('div');
            item.className = 'reminder-item';

            const info = document.createElement('div');
            info.className = 'reminder-info';

            const title = document.createElement('span');
            title.className = 'reminder-dhikr';
            title.textContent = reminder.title;
            
            const time = document.createElement('span');
            time.className = 'reminder-time';
            time.textContent = reminder.time;

            info.appendChild(title);
            info.appendChild(time);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-reminder-button icon-button';
            deleteButton.innerHTML = ICONS.trash;
            deleteButton.setAttribute('aria-label', `حذف تذكير ${reminder.title}`);
            deleteButton.addEventListener('click', () => {
                reminders = reminders.filter(r => r.id !== reminder.id);
                saveReminders();
                renderReminders();
            });

            item.appendChild(info);
            item.appendChild(deleteButton);
            remindersList.appendChild(item);
        });
    };

    const checkReminders = () => {
        if (Notification.permission !== 'granted') return;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        reminders.forEach(reminder => {
            if (reminder.time === currentTime && !reminder.triggeredToday) {
                const today = now.toISOString().split('T')[0];
                const lastTriggered = localStorage.getItem(`reminder_${reminder.id}`);
                
                if (lastTriggered !== today) {
                    new Notification('تذكير: حان وقت الذكر', {
                        body: `لا تنسى قراءة: ${reminder.title}`,
                        icon: 'icon.svg',
                        dir: 'rtl'
                    });
                    localStorage.setItem(`reminder_${reminder.id}`, today);
                }
            }
        });
    };
    
    // --- Favorite Adhkar Functions ---
    const loadFavoriteAdhkar = () => {
        const stored = localStorage.getItem('favoriteAdhkar');
        if (stored) {
            favoriteAdhkar = JSON.parse(stored);
        }
    };

    const saveFavoriteAdhkar = () => {
        localStorage.setItem('favoriteAdhkar', JSON.stringify(favoriteAdhkar));
    };

    const loadFortressHistory = () => {
        const stored = localStorage.getItem('fortressHistory');
        if (stored) {
            fortressHistory = JSON.parse(stored);
        }
    };
    
    const saveFortressHistory = () => {
        localStorage.setItem('fortressHistory', JSON.stringify(fortressHistory));
    };
    
    // --- Tasbeeh History Functions ---
    const loadTasbeehHistory = () => {
        const stored = localStorage.getItem('tasbeehHistory');
        if (stored) {
            tasbeehHistory = JSON.parse(stored);
        }
    };

    const saveTasbeehHistory = () => {
        localStorage.setItem('tasbeehHistory', JSON.stringify(tasbeehHistory));
    };

    const renderTasbeehHistory = () => {
        tasbeehHistoryContent.innerHTML = '';
        if (tasbeehHistory.length === 0) {
            tasbeehHistoryContent.innerHTML = `<p class="no-history-message">لا يوجد سجل للمسبحة.</p>`;
            return;
        }

        tasbeehHistory.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'history-item';
    
            const info = document.createElement('div');
            info.className = 'history-info';
    
            const dhikr = document.createElement('p');
            dhikr.className = 'history-dhikr';
            dhikr.textContent = entry.dhikr;
            info.appendChild(dhikr);
    
            const time = document.createElement('p');
            time.className = 'history-time';
            time.textContent = new Date(entry.timestamp).toLocaleString('ar-EG', {
                day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
            });
            info.appendChild(time);
            
            const count = document.createElement('span');
            count.className = 'history-count';
            count.textContent = String(entry.count);
    
            item.appendChild(info);
            item.appendChild(count);
            tasbeehHistoryContent.appendChild(item);
        });
    };


    const toggleAdhkarFavorite = (categoryTitle) => {
        const index = favoriteAdhkar.indexOf(categoryTitle);
        if (index > -1) {
            favoriteAdhkar.splice(index, 1); // Remove if exists
        } else {
            favoriteAdhkar.push(categoryTitle); // Add if not exists
        }
        saveFavoriteAdhkar();
        renderFortressList(); // Re-render to update the icon
        renderFavoriteAdhkar(); // Re-render the favorites list
    };
    
    const renderFavoriteAdhkar = () => {
        favoriteAdhkarListContainer.innerHTML = '';
        const favoritedCategories = FORTRESS_OF_THE_MUSLIM.filter(category => favoriteAdhkar.includes(category.title));

        if (favoritedCategories.length === 0) {
            favoriteAdhkarListContainer.innerHTML = `<p class="no-history-message">لم تقم بإضافة أي أذكار إلى المفضلة بعد.</p>`;
            return;
        }

        favoritedCategories.forEach(category => {
            const item = document.createElement('div');
            item.className = 'adhkar-list-entry';
            
            const content = document.createElement('div');
            content.className = 'adhkar-list-entry-content';
            content.setAttribute('role', 'button');
            content.tabIndex = 0;
            const title = document.createElement('h3');
            title.textContent = category.title;
            content.appendChild(title);
            content.addEventListener('click', () => startAdhkarSession(category));
            
            const favButton = document.createElement('button');
            favButton.className = 'icon-button favorite-adhkar-button is-favorite';
            favButton.innerHTML = ICONS.favorite;
            favButton.setAttribute('aria-label', `إزالة ${category.title} من المفضلة`);
            favButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleAdhkarFavorite(category.title);
            });
            
            item.appendChild(content);
            item.appendChild(favButton);
            favoriteAdhkarListContainer.appendChild(item);
        });
    };

    const renderFortressHistory = () => {
        fortressHistoryContent.innerHTML = '';
        if (fortressHistory.length === 0) {
            fortressHistoryContent.innerHTML = `<p class="no-history-message">لا يوجد سجل للأذكار المكتملة.</p>`;
            return;
        }
    
        const sortedHistory = [...fortressHistory].sort((a, b) => b.timestamp - a.timestamp);
    
        sortedHistory.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'history-item';
    
            const info = document.createElement('div');
            info.className = 'history-info';
    
            const title = document.createElement('p');
            title.className = 'history-dhikr';
            title.textContent = entry.title;
            info.appendChild(title);
    
            const time = document.createElement('p');
            time.className = 'history-time';
            time.textContent = new Date(entry.timestamp).toLocaleString('ar-EG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            info.appendChild(time);
            
            const status = document.createElement('span');
            status.className = 'icon-button';
            status.style.color = 'var(--brand-color)';
            status.innerHTML = ICONS.check;
    
            item.appendChild(info);
            item.appendChild(status);
            fortressHistoryContent.appendChild(item);
        });
    };

    // --- Quran Goals Functions ---
    const loadQuranGoals = () => {
        const stored = localStorage.getItem('quranGoals');
        quranGoals = stored ? JSON.parse(stored) : [];
    };
    const saveQuranGoals = () => {
        localStorage.setItem('quranGoals', JSON.stringify(quranGoals));
    };
    const loadQuranGoalsHistory = () => {
        const stored = localStorage.getItem('quranGoalsHistory');
        quranGoalsHistory = stored ? JSON.parse(stored) : [];
    };
    const saveQuranGoalsHistory = () => {
        localStorage.setItem('quranGoalsHistory', JSON.stringify(quranGoalsHistory));
    };
    
    const getGoalProgress = (goal) => {
        const totalPagesInGoal = (goal.pages.to - goal.pages.from) + 1;
        if (totalPagesInGoal <= 0) return { readPages: 0, totalPages: 0, percentage: 0 };

        const readPages = goal.progressLog.reduce((sum, log) => {
            const pagesInLog = (log.to - log.from) + 1;
            return sum + (pagesInLog > 0 ? pagesInLog : 0);
        }, 0);
        
        const percentage = Math.min((readPages / totalPagesInGoal) * 100, 100);

        return { readPages, totalPages: totalPagesInGoal, percentage };
    };

    const renderQuranGoals = () => {
        quranGoalsListContainer.innerHTML = '';
        const activeGoals = quranGoals.filter(g => !g.completed);

        if (activeGoals.length === 0) {
            quranGoalsListContainer.innerHTML = `<p class="no-history-message">لم تقم بإضافة أي أهداف بعد. اضغط على "إضافة هدف جديد" للبدء.</p>`;
            return;
        }

        activeGoals.forEach(goal => {
            const card = document.createElement('div');
            card.className = `quran-goal-card ${goal.completed ? 'completed' : ''}`;

            const { readPages, totalPages, percentage } = getGoalProgress(goal);
            
            const periodText = { daily: 'يوميًا', weekly: 'أسبوعيًا', monthly: 'شهريًا' }[goal.period] || '';
            const amountText = goal.amountType === 'custom'
                ? `من ص ${goal.pages.from} إلى ص ${goal.pages.to}`
                : document.querySelector(`#quran-goal-amount-select option[value="${goal.amountType}"]`).textContent;
            const surahText = goal.surah ? `سورة ${goal.surah} - ` : '';
            const description = `${surahText}${amountText} (${periodText})`;

            card.innerHTML = `
                <div class="quran-card-header">
                    <span class="quran-card-description">${description}</span>
                    ${goal.reminder ? `<div class="reminder-indicator">${ICONS.bell}<span class="quran-card-time">${goal.reminder.time}</span></div>` : ''}
                </div>
                <div class="quran-card-footer">
                    <div class="quran-card-progress"><div class="quran-card-progress-bar" style="width: ${percentage}%;"></div></div>
                    <span class="quran-card-progress-text">${readPages} / ${totalPages}</span>
                </div>
                <div class="quran-card-actions">
                    <button class="icon-button log-progress-button" aria-label="تسجيل إنجاز" ${goal.completed ? 'disabled' : ''}>${ICONS.check}</button>
                    <button class="icon-button edit-goal-button" aria-label="تعديل الهدف" ${goal.completed ? 'disabled' : ''}>${ICONS.edit}</button>
                    <button class="icon-button complete-goal-button" aria-label="تمييز كمكتمل" ${goal.completed ? 'disabled' : ''}>${ICONS.goal}</button>
                    <button class="icon-button delete-goal-button delete-button" aria-label="حذف الهدف">${ICONS.trash}</button>
                </div>
            `;

            card.querySelector('.log-progress-button').addEventListener('click', () => {
                goalToLogProgressForId = goal.id;
                logQuranGoalNameDisplay.textContent = description;
                logQuranPageFromInput.value = '';
                logQuranPageToInput.value = '';
                logQuranProgressModal.classList.add('active');
            });

            card.querySelector('.edit-goal-button').addEventListener('click', () => showAddQuranGoalModal(goal));

            card.querySelector('.complete-goal-button').addEventListener('click', () => {
                goalToCompleteId = goal.id;
                completeQuranGoalConfirmModal.classList.add('active');
            });
            
            card.querySelector('.delete-goal-button').addEventListener('click', () => {
                goalToDeleteId = goal.id;
                deleteQuranGoalConfirmModal.classList.add('active');
            });

            quranGoalsListContainer.appendChild(card);
        });
    };
    
    const renderQuranGoalsHistory = () => {
        quranGoalsHistoryContent.innerHTML = '';
        if (quranGoalsHistory.length === 0) {
            quranGoalsHistoryContent.innerHTML = `<p class="no-history-message">لا توجد إنجازات مسجلة.</p>`;
            return;
        }

        quranGoalsHistory.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-info">
                    <p class="history-dhikr">${entry.description}</p>
                    <p class="history-time">${new Date(entry.completedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <span class="history-item-status">مكتمل</span>
            `;
            quranGoalsHistoryContent.appendChild(item);
        });
    };

    const showAddQuranGoalModal = (goalToEdit = null) => {
        addQuranGoalForm.reset();
        quranGoalCustomRangeContainer.style.display = 'none';
        quranGoalReminderTimeContainer.style.display = 'none';
        quranGoalReminderToggle.checked = false;

        if (goalToEdit) {
            editingQuranGoalId = goalToEdit.id;
            addQuranGoalModalTitle.textContent = 'تعديل الهدف القرآني';
            saveQuranGoalButton.textContent = 'حفظ التعديلات';
            
            quranGoalSurahInput.value = goalToEdit.surah || '';
            quranGoalAmountSelect.value = goalToEdit.amountType;
            if (goalToEdit.amountType === 'custom') {
                quranGoalCustomRangeContainer.style.display = 'flex';
                quranGoalPageFromInput.value = goalToEdit.pages.from;
                quranGoalPageToInput.value = goalToEdit.pages.to;
            }
            quranGoalPeriodSelect.value = goalToEdit.period;
            if (goalToEdit.reminder) {
                quranGoalReminderToggle.checked = true;
                quranGoalReminderTimeContainer.style.display = 'block';
                quranGoalReminderTimeInput.value = goalToEdit.reminder.time;
            }

        } else {
            editingQuranGoalId = null;
            addQuranGoalModalTitle.textContent = 'إضافة هدف قرآني';
            saveQuranGoalButton.textContent = 'حفظ الهدف';
        }
        addQuranGoalModal.classList.add('active');
    };

    const hideAddQuranGoalModal = () => addQuranGoalModal.classList.remove('active');

    // --- Adhkar Session Functions ---
    const renderFortressList = () => {
        adhkarListContainer.innerHTML = '';
        FORTRESS_OF_THE_MUSLIM.forEach(category => {
            const item = document.createElement('div');
            item.className = 'adhkar-list-entry';

            const content = document.createElement('div');
            content.className = 'adhkar-list-entry-content';
            content.setAttribute('role', 'button');
            content.tabIndex = 0;
            const title = document.createElement('h3');
            title.textContent = category.title;
            content.appendChild(title);
            content.addEventListener('click', () => startAdhkarSession(category));

            const favButton = document.createElement('button');
            favButton.className = 'icon-button favorite-adhkar-button';
            const isFavorite = favoriteAdhkar.includes(category.title);
            if (isFavorite) {
                favButton.classList.add('is-favorite');
            }
            favButton.innerHTML = isFavorite ? ICONS.favorite : ICONS.favoriteBorder;
            favButton.setAttribute('aria-label', isFavorite ? `إزالة ${category.title} من المفضلة` : `إضافة ${category.title} إلى المفضلة`);
            favButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleAdhkarFavorite(category.title);
            });
            
            item.appendChild(content);
            item.appendChild(favButton);
            adhkarListContainer.appendChild(item);
        });
    };

    const startAdhkarSession = (category) => {
        currentAdhkarSession = {
            category,
            items: category.items,
            currentIndex: 0,
            counts: {}
        };
        adhkarSessionTitle.textContent = category.title;
        renderCurrentAdhkar();
        adhkarSessionView.classList.add('active');
    };

    const renderCurrentAdhkar = () => {
        if (currentAdhkarSession.currentIndex >= currentAdhkarSession.items.length) {
            completeAdhkarSession();
            return;
        }
        const currentItem = currentAdhkarSession.items[currentAdhkarSession.currentIndex];
        const currentCount = currentAdhkarSession.counts[currentAdhkarSession.currentIndex] || 0;
        
        adhkarSessionTextDisplay.textContent = currentItem.text;
        adhkarSessionCounter.textContent = `${currentCount} / ${currentItem.count}`;
        
        const progress = (currentAdhkarSession.currentIndex / currentAdhkarSession.items.length) * 100;
        adhkarSessionProgressBar.style.width = `${progress}%`;

        adhkarSessionPrevButton.disabled = currentAdhkarSession.currentIndex === 0;
        adhkarSessionNextButton.disabled = currentAdhkarSession.currentIndex >= currentAdhkarSession.items.length - 1;
    };

    const handleAdhkarTap = () => {
        if (currentAdhkarSession.currentIndex >= currentAdhkarSession.items.length) return;

        const currentItem = currentAdhkarSession.items[currentAdhkarSession.currentIndex];
        let currentCount = currentAdhkarSession.counts[currentAdhkarSession.currentIndex] || 0;
        
        currentCount++;
        currentAdhkarSession.counts[currentAdhkarSession.currentIndex] = currentCount;
        adhkarSessionCounter.textContent = `${currentCount} / ${currentItem.count}`;

        if (settings.vibrationEnabled && navigator.vibrate) {
            navigator.vibrate(settings.vibrationIntensity);
        }
        
        if (currentCount >= currentItem.count) {
            setTimeout(() => {
                currentAdhkarSession.currentIndex++;
                renderCurrentAdhkar();
            }, 300);
        }
    };
    
    const completeAdhkarSession = () => {
        fortressHistory.unshift({
            title: currentAdhkarSession.category.title,
            timestamp: Date.now()
        });
        saveFortressHistory();

        adhkarToSetReminderFor = currentAdhkarSession.category.title;
        adhkarSessionView.classList.remove('active');
        
        completedAdhkarNameDisplay.textContent = adhkarToSetReminderFor;
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        adhkarReminderTimeInput.value = `${hours}:${minutes}`;

        adhkarCompleteModal.classList.add('active');
    };


    // --- Placeholder functions to fix runtime errors ---
    const renderStats = () => {
        console.log("Navigating to Stats");
        showView('stats-view');
    };
    const renderRemindersView = () => {
        console.log("Navigating to Reminders");
        renderReminders();
        showView('reminders-view');
    };
    const renderTeamsView = () => {
        console.log("Navigating to Teams");
        showView('teams-view');
    };
    const showQuranBrowser = () => {
        console.log("Showing Quran Browser");
        if (quranBrowserIframe.src !== 'https://quran.com/') {
            quranLoader.style.display = 'flex';
            quranBrowserIframe.src = 'https://quran.com/';
            quranBrowserIframe.onload = () => {
                quranLoader.style.display = 'none';
            };
        }
        showView('quran-browser-view');
    };
    const renderHalaqatList = () => {
        console.log("Navigating to Halaqat");
        showView('halaqat-list-view');
    };

    // --- INITIALIZATION ---
    const init = () => {
        loadDhikrList();
        loadGoals();
        loadQuranBookmarks();
        loadReminders();
        loadFavoriteAdhkar();
        loadFortressHistory();
        loadTasbeehHistory();
        loadQuranGoals();
        loadQuranGoalsHistory();

        renderReminders();
        renderQuranGoals();
        setInterval(checkReminders, 30000); // Check every 30 seconds
        
        populateDhikrScroller();
        setActiveDhikr(state.activeDhikr, false);
        updateCounterDisplay();
        updateGoalDisplay();
        renderFortressList();

        // Setup home screen navigation
        homeCardTasbeeh.addEventListener('click', () => showView('tasbeeh-view'));
        homeCardFortress.addEventListener('click', () => showView('fortress-view'));
        homeCardQuranGoals.addEventListener('click', () => {
            renderQuranGoals();
            showView('quran-goals-view');
        });
        homeCardAdhkar.addEventListener('click', () => {
            renderFavoriteAdhkar();
            showView('favorites-view');
        });
        homeCardHistory.addEventListener('click', () => showView('history-view'));
        homeCardSettings.addEventListener('click', () => showView('settings-view'));
        
        homeCardStats.addEventListener('click', renderStats);
        homeCardReminders.addEventListener('click', renderRemindersView);
        homeCardTeams.addEventListener('click', renderTeamsView);
        homeCardHalaqat.addEventListener('click', renderHalaqatList);
        homeCardQuran.addEventListener('click', showQuranBrowser);

        // Setup goal modal listeners
        closeGoalModalButton.addEventListener('click', () => goalReachedModal.classList.remove('active'));
        closeSetGoalModalButton.addEventListener('click', () => setGoalModal.classList.remove('active'));
        setGoalSaveButton.addEventListener('click', () => {
            if (dhikrToSetGoalFor) {
                const goalValue = parseInt(setGoalInput.value, 10);
                if (goalValue > 0) {
                    goals[dhikrToSetGoalFor] = goalValue;
                } else {
                    delete goals[dhikrToSetGoalFor];
                }
                saveGoals();
                updateGoalDisplay();
                renderDhikrList(); // Re-render to show/hide badge
                setGoalModal.classList.remove('active');
                dhikrToSetGoalFor = null;
            }
        });

        // Setup Adhkar session listeners
        adhkarSessionBackButton.addEventListener('click', () => adhkarSessionView.classList.remove('active'));
        adhkarSessionContent.addEventListener('click', handleAdhkarTap);
        adhkarSessionNextButton.addEventListener('click', () => {
            if (currentAdhkarSession.currentIndex < currentAdhkarSession.items.length - 1) {
                currentAdhkarSession.currentIndex++;
                renderCurrentAdhkar();
            }
        });
        adhkarSessionPrevButton.addEventListener('click', () => {
            if (currentAdhkarSession.currentIndex > 0) {
                currentAdhkarSession.currentIndex--;
                renderCurrentAdhkar();
            }
        });

        // Setup Adhkar complete modal listeners
        const closeAdhkarModal = () => adhkarCompleteModal.classList.remove('active');
        closeAdhkarCompleteModalButton.addEventListener('click', closeAdhkarModal);
        skipAdhkarReminderButton.addEventListener('click', closeAdhkarModal);
        saveAdhkarReminderButton.addEventListener('click', () => {
            if (adhkarToSetReminderFor && adhkarReminderTimeInput.value) {
                addReminder({
                    id: Date.now(),
                    type: 'adhkar',
                    title: adhkarToSetReminderFor,
                    time: adhkarReminderTimeInput.value
                });
                adhkarToSetReminderFor = null;
            }
            closeAdhkarModal();
        });

        // Setup Fortress History Panel Listeners
        fortressHistoryButton.addEventListener('click', () => {
            renderFortressHistory();
            fortressHistoryPanel.classList.add('active');
        });
    
        closeFortressHistoryButton.addEventListener('click', () => {
            fortressHistoryPanel.classList.remove('active');
        });
    
        clearFortressHistoryButton.addEventListener('click', () => {
            confirmDeleteTitle.textContent = 'تأكيد مسح السجل';
            confirmDeleteMessage.textContent = 'هل أنت متأكد أنك تريد مسح سجل الأذكار المكتملة؟ لا يمكن التراجع عن هذا الإجراء.';
            
            confirmDeleteYesButton.onclick = () => {
                fortressHistory = [];
                saveFortressHistory();
                renderFortressHistory();
                confirmDeleteModal.classList.remove('active');
                confirmDeleteYesButton.onclick = null;
            };
    
            confirmDeleteModal.classList.add('active');
        });

        // Setup Tasbeeh History Panel Listeners
        tasbeehHistoryButton.addEventListener('click', () => {
            renderTasbeehHistory();
            tasbeehHistoryPanel.classList.add('active');
        });
    
        closeTasbeehHistoryButton.addEventListener('click', () => {
            tasbeehHistoryPanel.classList.remove('active');
        });
    
        clearTasbeehHistoryButton.addEventListener('click', () => {
            confirmDeleteTitle.textContent = 'تأكيد مسح السجل';
            confirmDeleteMessage.textContent = 'هل أنت متأكد أنك تريد مسح سجل المسبحة؟ لا يمكن التراجع عن هذا الإجراء.';
            
            confirmDeleteYesButton.onclick = () => {
                tasbeehHistory = [];
                saveTasbeehHistory();
                renderTasbeehHistory();
                confirmDeleteModal.classList.remove('active');
                confirmDeleteYesButton.onclick = null;
            };
    
            confirmDeleteModal.classList.add('active');
        });

        // --- Quran Goals Listeners ---
        addNewQuranGoalButton.addEventListener('click', () => showAddQuranGoalModal());
        closeAddQuranGoalModalButton.addEventListener('click', hideAddQuranGoalModal);
        quranGoalAmountSelect.addEventListener('change', () => {
            quranGoalCustomRangeContainer.style.display = quranGoalAmountSelect.value === 'custom' ? 'flex' : 'none';
        });
        quranGoalReminderToggle.addEventListener('change', () => {
            quranGoalReminderTimeContainer.style.display = quranGoalReminderToggle.checked ? 'block' : 'none';
        });
        addQuranGoalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const goalData = {
                surah: quranGoalSurahInput.value.trim(),
                amountType: quranGoalAmountSelect.value,
                pages: {
                    from: parseInt(quranGoalPageFromInput.value, 10) || 0,
                    to: parseInt(quranGoalPageToInput.value, 10) || 0,
                },
                period: quranGoalPeriodSelect.value,
                reminder: quranGoalReminderToggle.checked && quranGoalReminderTimeInput.value
                    ? { time: quranGoalReminderTimeInput.value }
                    : null
            };

            if (editingQuranGoalId) {
                const index = quranGoals.findIndex(g => g.id === editingQuranGoalId);
                if (index > -1) {
                    quranGoals[index] = { ...quranGoals[index], ...goalData };
                }
            } else {
                const newGoal = {
                    ...goalData,
                    id: Date.now(),
                    createdAt: new Date().toISOString(),
                    completed: false,
                    progressLog: []
                };
                quranGoals.push(newGoal);
            }
            saveQuranGoals();
            renderQuranGoals();
            hideAddQuranGoalModal();
        });

        // Quran Goals Modals Handlers
        deleteQuranGoalNoButton.addEventListener('click', () => deleteQuranGoalConfirmModal.classList.remove('active'));
        deleteQuranGoalYesButton.addEventListener('click', () => {
            quranGoals = quranGoals.filter(g => g.id !== goalToDeleteId);
            saveQuranGoals();
            renderQuranGoals();
            deleteQuranGoalConfirmModal.classList.remove('active');
        });

        completeQuranGoalNoButton.addEventListener('click', () => completeQuranGoalConfirmModal.classList.remove('active'));
        completeQuranGoalYesButton.addEventListener('click', () => {
            const goalIndex = quranGoals.findIndex(g => g.id === goalToCompleteId);
            if (goalIndex > -1) {
                const goal = quranGoals[goalIndex];
                goal.completed = true;
                const description = `${goal.surah ? `سورة ${goal.surah} - ` : ''}${document.querySelector(`#quran-goal-amount-select option[value="${goal.amountType}"]`).textContent}`;
                quranGoalsHistory.unshift({
                    id: goal.id,
                    description,
                    completedAt: new Date().toISOString()
                });
                quranGoals.splice(goalIndex, 1);
                saveQuranGoals();
                saveQuranGoalsHistory();
                renderQuranGoals();
            }
            completeQuranGoalConfirmModal.classList.remove('active');
        });

        logQuranProgressCancelButton.addEventListener('click', () => logQuranProgressModal.classList.remove('active'));
        logQuranProgressSaveButton.addEventListener('click', () => {
            const from = parseInt(logQuranPageFromInput.value, 10);
            const to = parseInt(logQuranPageToInput.value, 10);
            if (from > 0 && to >= from && goalToLogProgressForId) {
                const goal = quranGoals.find(g => g.id === goalToLogProgressForId);
                if (goal) {
                    goal.progressLog.push({ from, to, date: new Date().toISOString() });
                    saveQuranGoals();
                    renderQuranGoals();
                }
            }
            logQuranProgressModal.classList.remove('active');
        });
        
        quranGoalsHistoryButton.addEventListener('click', () => {
            renderQuranGoalsHistory();
            quranGoalsHistoryPanel.classList.add('active');
        });
        closeQuranGoalsHistoryButton.addEventListener('click', () => quranGoalsHistoryPanel.classList.remove('active'));
        clearQuranGoalsHistoryButton.addEventListener('click', () => {
             confirmDeleteTitle.textContent = 'تأكيد مسح السجل';
            confirmDeleteMessage.textContent = 'هل أنت متأكد أنك تريد مسح سجل إنجازات القرآن؟';
            
            confirmDeleteYesButton.onclick = () => {
                quranGoalsHistory = [];
                saveQuranGoalsHistory();
                renderQuranGoalsHistory();
                confirmDeleteModal.classList.remove('active');
                confirmDeleteYesButton.onclick = null;
            };
    
            confirmDeleteModal.classList.add('active');
        });
        // --- End Quran Goals Listeners ---


        // Setup back buttons
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', () => showView('home-screen'));
        });
        
        // Setup Tasbeeh view controls
        counterWrapper.addEventListener('click', incrementCounter);
        resetButton.addEventListener('click', resetCounter);
        
        dhikrSelectButton.addEventListener('click', () => {
            renderDhikrList();
            showView('dhikr-list-view');
        });

        saveNewDhikrButton.addEventListener('click', () => {
            const newDhikr = newDhikrInput.value.trim();
            if (newDhikr && !dhikrList.includes(newDhikr)) {
                dhikrList.push(newDhikr);
                saveDhikrList();
                renderDhikrList();
                populateDhikrScroller();
                newDhikrInput.value = '';
            } else if (newDhikr && dhikrList.includes(newDhikr)) {
                alert('هذا الذكر موجود بالفعل.');
            }
        });

        // Setup sound/vibration toggles (basic)
        const updateSoundToggle = () => {
            soundToggleButton.innerHTML = settings.soundEnabled ? ICONS.soundOn : ICONS.soundOff;
        };
        const updateVibrationToggle = () => {
            vibrationToggleButton.innerHTML = settings.vibrationEnabled ? ICONS.vibrationOn : ICONS.vibrationOff;
        };
        soundToggleButton.addEventListener('click', () => {
            settings.soundEnabled = !settings.soundEnabled;
            updateSoundToggle();
        });
        vibrationToggleButton.addEventListener('click', () => {
            settings.vibrationEnabled = !settings.vibrationEnabled;
            updateVibrationToggle();
        });
        updateSoundToggle();
        updateVibrationToggle();

        // --- Quran Bookmark Events ---
        const showAddBookmarkModal = () => {
            addQuranBookmarkForm.reset();
            addQuranBookmarkModal.classList.add('active');
        };
        const hideAddBookmarkModal = () => addQuranBookmarkModal.classList.remove('active');

        const showBookmarksPanel = () => {
            renderQuranBookmarks();
            quranBookmarksPanel.classList.add('active');
        };
        const hideBookmarksPanel = () => quranBookmarksPanel.classList.remove('active');

        addQuranBookmarkButton.addEventListener('click', showAddBookmarkModal);
        closeAddQuranBookmarkModalButton.addEventListener('click', hideAddBookmarkModal);
        viewQuranBookmarksButton.addEventListener('click', showBookmarksPanel);
        closeQuranBookmarksPanelButton.addEventListener('click', hideBookmarksPanel);

        addQuranBookmarkForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newBookmark = {
                id: Date.now(),
                surah: bookmarkSurahInput.value.trim(),
                reference: bookmarkReferenceInput.value.trim(),
                notes: bookmarkNotesInput.value.trim()
            };
            quranBookmarks.unshift(newBookmark);
            saveQuranBookmarks();
            hideAddBookmarkModal();
        });

        // --- Delete Dhikr Modal Events ---
        const hideDeleteModal = () => {
            deleteDhikrConfirmModal.classList.remove('active');
            dhikrToDelete = null;
        };
        closeDeleteDhikrModalButton.addEventListener('click', hideDeleteModal);
        deleteDhikrNoButton.addEventListener('click', hideDeleteModal);
        deleteDhikrYesButton.addEventListener('click', () => {
            if (dhikrToDelete) {
                dhikrList = dhikrList.filter(d => d !== dhikrToDelete);
                saveDhikrList();
                renderDhikrList();
                populateDhikrScroller();
                
                if (state.activeDhikr === dhikrToDelete) {
                    setActiveDhikr(dhikrList[0] || '');
                }
            }
            hideDeleteModal();
        });

        // --- Generic Confirmation Modal Events ---
        closeConfirmDeleteModalButton.addEventListener('click', () => confirmDeleteModal.classList.remove('active'));
        confirmDeleteNoButton.addEventListener('click', () => confirmDeleteModal.classList.remove('active'));
    };

    init();
});
