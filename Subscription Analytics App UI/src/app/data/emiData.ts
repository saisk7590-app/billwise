export interface EMI {
  id: string;
  name: string;
  loanType: 'Home Loan' | 'Car Loan' | 'Bike Loan' | 'Personal Loan' | 'Credit EMI';
  lender: string;
  totalAmount: number;
  interestRate: number;
  monthlyEMI: number;
  downPayment: number;
  startDate: string;
  endDate: string;
  dueDay: number;
  remainingBalance: number;
  amountPaid: number;
  totalPayable: number;
  remainingMonths: number;
  status: 'Active' | 'Completed' | 'Delayed';
  reminderEnabled: boolean;
  reminderDaysBefore: number;
}

export interface EMIPayment {
  id: string;
  emiId: string;
  emiName: string;
  loanType: string;
  amount: number;
  date: string;
  remainingBalance: number;
  status: 'Paid' | 'Delayed' | 'Skipped';
  principalPaid: number;
  interestPaid: number;
}

export const emis: EMI[] = [
  {
    id: '1',
    name: 'Home Loan',
    loanType: 'Home Loan',
    lender: 'HDFC Bank',
    totalAmount: 5000000,
    interestRate: 8.5,
    monthlyEMI: 12000,
    downPayment: 1000000,
    startDate: '2020-01-15',
    endDate: '2035-01-15',
    dueDay: 5,
    remainingBalance: 3800000,
    amountPaid: 1200000,
    totalPayable: 6480000,
    remainingMonths: 142,
    status: 'Active',
    reminderEnabled: true,
    reminderDaysBefore: 3,
  },
  {
    id: '2',
    name: 'Car Loan',
    loanType: 'Car Loan',
    lender: 'ICICI Bank',
    totalAmount: 800000,
    interestRate: 9.2,
    monthlyEMI: 4200,
    downPayment: 200000,
    startDate: '2022-06-10',
    endDate: '2027-06-10',
    dueDay: 10,
    remainingBalance: 280000,
    amountPaid: 520000,
    totalPayable: 924000,
    remainingMonths: 36,
    status: 'Active',
    reminderEnabled: true,
    reminderDaysBefore: 2,
  },
  {
    id: '3',
    name: 'Bike Loan',
    loanType: 'Bike Loan',
    lender: 'Bajaj Finserv',
    totalAmount: 120000,
    interestRate: 11.5,
    monthlyEMI: 1800,
    downPayment: 30000,
    startDate: '2024-01-20',
    endDate: '2026-07-20',
    dueDay: 20,
    remainingBalance: 42000,
    amountPaid: 78000,
    totalPayable: 151200,
    remainingMonths: 2,
    status: 'Active',
    reminderEnabled: true,
    reminderDaysBefore: 3,
  },
  {
    id: '4',
    name: 'Personal Loan',
    loanType: 'Personal Loan',
    lender: 'Axis Bank',
    totalAmount: 300000,
    interestRate: 12.0,
    monthlyEMI: 3500,
    downPayment: 0,
    startDate: '2023-03-15',
    endDate: '2028-03-15',
    dueDay: 15,
    remainingBalance: 180000,
    amountPaid: 120000,
    totalPayable: 420000,
    remainingMonths: 48,
    status: 'Active',
    reminderEnabled: true,
    reminderDaysBefore: 5,
  },
  {
    id: '5',
    name: 'Laptop EMI',
    loanType: 'Credit EMI',
    lender: 'Amazon Pay',
    totalAmount: 80000,
    interestRate: 14.0,
    monthlyEMI: 5000,
    downPayment: 0,
    startDate: '2025-12-01',
    endDate: '2027-03-01',
    dueDay: 1,
    remainingBalance: 65000,
    amountPaid: 15000,
    totalPayable: 90000,
    remainingMonths: 13,
    status: 'Active',
    reminderEnabled: false,
    reminderDaysBefore: 0,
  },
  {
    id: '6',
    name: 'Phone EMI',
    loanType: 'Credit EMI',
    lender: 'Flipkart Pay Later',
    totalAmount: 50000,
    interestRate: 13.5,
    monthlyEMI: 2000,
    downPayment: 0,
    startDate: '2025-09-10',
    endDate: '2027-09-10',
    dueDay: 10,
    remainingBalance: 38000,
    amountPaid: 12000,
    totalPayable: 60000,
    remainingMonths: 19,
    status: 'Active',
    reminderEnabled: true,
    reminderDaysBefore: 2,
  },
];

export const emiPayments: EMIPayment[] = [
  {
    id: '1',
    emiId: '1',
    emiName: 'Home Loan',
    loanType: 'Home Loan',
    amount: 12000,
    date: '2026-05-05',
    remainingBalance: 3812000,
    status: 'Paid',
    principalPaid: 8200,
    interestPaid: 3800,
  },
  {
    id: '2',
    emiId: '2',
    emiName: 'Car Loan',
    loanType: 'Car Loan',
    amount: 4200,
    date: '2026-05-10',
    remainingBalance: 284200,
    status: 'Paid',
    principalPaid: 2800,
    interestPaid: 1400,
  },
  {
    id: '3',
    emiId: '1',
    emiName: 'Home Loan',
    loanType: 'Home Loan',
    amount: 12000,
    date: '2026-04-05',
    remainingBalance: 3824000,
    status: 'Paid',
    principalPaid: 8150,
    interestPaid: 3850,
  },
  {
    id: '4',
    emiId: '3',
    emiName: 'Bike Loan',
    loanType: 'Bike Loan',
    amount: 1800,
    date: '2026-05-20',
    remainingBalance: 43800,
    status: 'Paid',
    principalPaid: 1200,
    interestPaid: 600,
  },
  {
    id: '5',
    emiId: '4',
    emiName: 'Personal Loan',
    loanType: 'Personal Loan',
    amount: 3500,
    date: '2026-05-15',
    remainingBalance: 183500,
    status: 'Paid',
    principalPaid: 2300,
    interestPaid: 1200,
  },
];

export const emiYearlyData = [
  { year: '2020', amount: 144000 },
  { year: '2021', amount: 144000 },
  { year: '2022', amount: 194400 },
  { year: '2023', amount: 236400 },
  { year: '2024', amount: 258000 },
  { year: '2025', amount: 282000 },
  { year: '2026', amount: 342000 },
];

export const remainingBalanceTrend = [
  { date: 'Jan 2026', balance: 4420000 },
  { date: 'Mar 2026', balance: 4380000 },
  { date: 'Jun 2026', balance: 4205000 },
  { date: 'Sep 2026', balance: 4100000 },
  { date: 'Dec 2026', balance: 3950000 },
  { date: 'Mar 2027', balance: 3800000 },
  { date: 'Jun 2027', balance: 3650000 },
  { date: 'Sep 2027', balance: 3500000 },
  { date: 'Dec 2027', balance: 3350000 },
  { date: 'Mar 2028', balance: 3200000 },
  { date: 'Jun 2028', balance: 3050000 },
  { date: 'Dec 2028', balance: 2900000 },
];

export const emiBurdenTrend = [
  { year: '2020', burden: 12000 },
  { year: '2021', burden: 12000 },
  { year: '2022', burden: 16200 },
  { year: '2023', burden: 19700 },
  { year: '2024', burden: 21500 },
  { year: '2025', burden: 23500 },
  { year: '2026', burden: 28500 },
  { year: '2027', burden: 24500 },
  { year: '2028', burden: 15500 },
  { year: '2029', burden: 12000 },
];
