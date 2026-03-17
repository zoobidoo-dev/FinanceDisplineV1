const STORAGE_KEY = 'dhanrakshak_data';

const nowIso = () => new Date().toISOString();

export const createDefaultAccounts = () => [
  { id: crypto.randomUUID(), name: 'Cash in Hand', type: 'cash', balance: 0, color: '#10b981', icon: '💵', createdAt: nowIso() },
  { id: crypto.randomUUID(), name: 'Bank Account', type: 'bank', balance: 0, color: '#38bdf8', icon: '🏦', createdAt: nowIso() },
  { id: crypto.randomUUID(), name: 'Credit Card', type: 'credit_card', balance: 0, color: '#f43f5e', icon: '💳', createdAt: nowIso() },
];

export const defaultData = {
  accounts: createDefaultAccounts(),
  transactions: [],
  budgets: [],
  goals: [],
  recurringExpenses: [],
  lending: [],
  netWorth: { assets: [], liabilities: [], history: [] },
  settings: {
    theme: 'dark',
    anthropicApiKey: '',
    salaryDay: 1,
    salaryAmount: 0,
    salaryAccountId: '',
  },
};

const mergeWithDefaults = (data = {}) => ({
  ...defaultData,
  ...data,
  netWorth: { ...defaultData.netWorth, ...(data.netWorth || {}) },
  settings: { ...defaultData.settings, ...(data.settings || {}) },
  accounts: Array.isArray(data.accounts) && data.accounts.length ? data.accounts : createDefaultAccounts(),
});

export const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mergeWithDefaults();
    return mergeWithDefaults(JSON.parse(raw));
  } catch {
    return mergeWithDefaults();
  }
};

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error?.message || 'Unable to save data in localStorage.' };
  }
};
