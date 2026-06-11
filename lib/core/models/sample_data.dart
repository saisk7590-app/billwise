import '../constants/app_constants.dart';

class SubscriptionItem {
  const SubscriptionItem({
    required this.name,
    required this.category,
    required this.price,
    required this.billingType,
    required this.nextDue,
    required this.status,
  });

  final String name;
  final String category;
  final int price;
  final String billingType;
  final String nextDue;
  final String status;
}

class EmiItem {
  const EmiItem({
    required this.name,
    required this.type,
    required this.lender,
    required this.monthlyEmi,
    required this.remainingBalance,
    required this.remainingMonths,
    required this.dueDay,
  });

  final String name;
  final String type;
  final String lender;
  final int monthlyEmi;
  final int remainingBalance;
  final int remainingMonths;
  final int dueDay;
}

class RecurringItem {
  const RecurringItem({
    required this.title,
    required this.category,
    required this.amount,
    required this.frequency,
    required this.status,
  });

  final String title;
  final String category;
  final int amount;
  final String frequency;
  final String status;
}

class ChartPoint {
  const ChartPoint(this.label, this.value, {this.secondary = 0, this.third = 0});

  final String label;
  final double value;
  final double secondary;
  final double third;
}

class AppData {
  static const subscriptions = <SubscriptionItem>[
    SubscriptionItem(name: 'Netflix', category: 'OTT', price: 649, billingType: 'Monthly', nextDue: '20 Jun', status: 'Active'),
    SubscriptionItem(name: 'Airtel', category: 'Mobile', price: 399, billingType: 'Monthly', nextDue: '01 Jul', status: 'Active'),
    SubscriptionItem(name: 'WiFi', category: 'Internet', price: 799, billingType: 'Monthly', nextDue: '10 Jul', status: 'Active'),
    SubscriptionItem(name: 'Spotify', category: 'OTT', price: 119, billingType: 'Monthly', nextDue: '01 Jul', status: 'Active'),
    SubscriptionItem(name: 'Amazon Prime', category: 'OTT', price: 1499, billingType: 'Yearly', nextDue: '01 Jun', status: 'Active'),
  ];

  static const emis = <EmiItem>[
    EmiItem(name: 'Home Loan', type: 'Home Loan', lender: 'HDFC Bank', monthlyEmi: 12000, remainingBalance: 3800000, remainingMonths: 142, dueDay: 5),
    EmiItem(name: 'Car Loan', type: 'Car Loan', lender: 'ICICI Bank', monthlyEmi: 4200, remainingBalance: 280000, remainingMonths: 36, dueDay: 10),
    EmiItem(name: 'Bike Loan', type: 'Bike Loan', lender: 'Bajaj Finserv', monthlyEmi: 1800, remainingBalance: 42000, remainingMonths: 2, dueDay: 20),
    EmiItem(name: 'Personal Loan', type: 'Personal Loan', lender: 'Axis Bank', monthlyEmi: 3500, remainingBalance: 180000, remainingMonths: 48, dueDay: 15),
    EmiItem(name: 'Laptop EMI', type: 'Credit EMI', lender: 'Amazon Pay', monthlyEmi: 5000, remainingBalance: 65000, remainingMonths: 13, dueDay: 1),
  ];

  static const utilities = <RecurringItem>[
    RecurringItem(title: 'Electricity', category: 'Power', amount: 1860, frequency: 'Monthly', status: 'Due soon'),
    RecurringItem(title: 'Water Board', category: 'Water', amount: 420, frequency: 'Monthly', status: 'Scheduled'),
    RecurringItem(title: 'Gas Cylinder', category: 'Gas', amount: 1120, frequency: '45 days', status: 'Stable'),
    RecurringItem(title: 'DTH', category: 'Entertainment', amount: 360, frequency: 'Monthly', status: 'Active'),
  ];

  static const groceries = <RecurringItem>[
    RecurringItem(title: 'BigBasket Staples', category: 'Staples', amount: 3200, frequency: 'Monthly', status: 'Optimized'),
    RecurringItem(title: 'Milk & Dairy', category: 'Fresh', amount: 1850, frequency: 'Monthly', status: 'Active'),
    RecurringItem(title: 'Vegetables', category: 'Fresh', amount: 2200, frequency: 'Weekly', status: 'High'),
    RecurringItem(title: 'Household Care', category: 'Home', amount: 1450, frequency: 'Monthly', status: 'Stable'),
  ];

  static const yearlySpending = <ChartPoint>[
    ChartPoint('2024', 45000),
    ChartPoint('2025', 52000),
    ChartPoint('2026', 28000),
  ];

  static const trend = <ChartPoint>[
    ChartPoint('Jan', 2200, secondary: 12000, third: 4800),
    ChartPoint('Feb', 2250, secondary: 14400, third: 5200),
    ChartPoint('Mar', 2280, secondary: 16200, third: 6100),
    ChartPoint('Apr', 2320, secondary: 19700, third: 5700),
    ChartPoint('May', 2330, secondary: 23500, third: 6800),
    ChartPoint('Jun', 2492, secondary: 28500, third: 7200),
  ];

  static List<ChartPoint> categoryDistribution(AppModule module) {
    switch (module) {
      case AppModule.subscriptions:
        return const [
          ChartPoint('OTT', 893),
          ChartPoint('Internet', 799),
          ChartPoint('Mobile', 399),
          ChartPoint('Software', 260),
        ];
      case AppModule.emi:
        return const [
          ChartPoint('Home', 12000),
          ChartPoint('Credit', 7000),
          ChartPoint('Car', 4200),
          ChartPoint('Personal', 3500),
          ChartPoint('Bike', 1800),
        ];
      case AppModule.utilities:
        return const [
          ChartPoint('Power', 1860),
          ChartPoint('Gas', 1120),
          ChartPoint('Water', 420),
          ChartPoint('DTH', 360),
        ];
      case AppModule.groceries:
        return const [
          ChartPoint('Staples', 3200),
          ChartPoint('Fresh', 4050),
          ChartPoint('Home', 1450),
          ChartPoint('Snacks', 900),
        ];
      case AppModule.dashboard:
        return const [
          ChartPoint('Subs', 2492),
          ChartPoint('EMI', 28500),
          ChartPoint('Utilities', 3760),
          ChartPoint('Groceries', 9600),
        ];
    }
  }
}
