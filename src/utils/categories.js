export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: '💰' },
  { id: 'freelance', label: 'Freelance', icon: '💻' },
  { id: 'investment_return', label: 'Investment Return', icon: '📈' },
  { id: 'cashback', label: 'Cashback/Reward', icon: '🎁' },
  { id: 'rental', label: 'Rental Income', icon: '🏠' },
  { id: 'refund', label: 'Refund', icon: '↩️' },
  { id: 'other_income', label: 'Other Income', icon: '💵' }
];

export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food & Dining', icon: '🍔' },
  { id: 'groceries', label: 'Groceries', icon: '🛒' },
  { id: 'rent', label: 'Rent', icon: '🏠' },
  { id: 'transport', label: 'Transport', icon: '🚗' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'subscriptions', label: 'Subscriptions', icon: '📱' },
  { id: 'emi', label: 'EMI/Loan', icon: '🏦' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'health', label: 'Health', icon: '⚕️' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'utilities', label: 'Utilities (Elec/Water/Gas)', icon: '💡' },
  { id: 'mobile_recharge', label: 'Mobile/Internet', icon: '📶' },
  { id: 'chai_snacks', label: 'Chai & Snacks', icon: '☕' },
  { id: 'personal_care', label: 'Personal Care', icon: '✨' },
  { id: 'gifts', label: 'Gifts & Donations', icon: '🎁' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'insurance', label: 'Insurance', icon: '🛡️' },
  { id: 'investment', label: 'Investment', icon: '📊' },
  { id: 'other_expense', label: 'Other', icon: '📌' }
];

export const allCategories = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
