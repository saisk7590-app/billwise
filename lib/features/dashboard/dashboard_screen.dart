import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../core/models/sample_data.dart';
import '../../core/widgets/app_card.dart';
import '../../core/widgets/charts.dart';
import '../../core/widgets/components.dart';
import '../../core/widgets/module_page.dart';
import '../../navigation/app_navigation.dart';
import '../emi/add_emi_screen.dart';
import '../subscriptions/add_subscription_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key, required this.onMenu});

  final VoidCallback onMenu;

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final _tab = ValueNotifier<int>(0);
  bool _fabOpen = false;

  @override
  void dispose() {
    _tab.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final subscriptionSpend = AppData.subscriptions.fold<double>(0, (sum, item) => sum + (item.billingType == 'Yearly' ? item.price / 12 : item.price));
    final emiSpend = AppData.emis.fold<int>(0, (sum, item) => sum + item.monthlyEmi);
    final utilitySpend = AppData.utilities.fold<int>(0, (sum, item) => sum + item.amount);
    final grocerySpend = AppData.groceries.fold<int>(0, (sum, item) => sum + item.amount);
    final total = subscriptionSpend + emiSpend + utilitySpend + grocerySpend;

    return ModuleTabbedPage(
      module: AppModule.dashboard,
      onMenu: widget.onMenu,
      title: 'Dashboard',
      subtitle: 'Financial command center',
      tabs: const ['Overview', 'Analytics', 'Insights', 'Stats'],
      tab: _tab,
      floating: _FloatingActions(
        open: _fabOpen,
        onToggle: () => setState(() => _fabOpen = !_fabOpen),
      ),
      childrenBuilder: (tab) {
        if (tab == 1) {
          return [
            const ChartCard(title: 'Monthly Burn Rate', kind: ChartKind.line, data: AppData.trend, colors: [Color(0xFF374151)]),
            ChartCard(title: 'Recurring Mix', kind: ChartKind.donut, data: AppData.categoryDistribution(AppModule.dashboard), colors: _chartColors),
            const ChartCard(title: 'Stacked Obligations', kind: ChartKind.stackedBar, data: AppData.trend, colors: _chartColors),
          ];
        }
        if (tab == 2) {
          return [
            const InsightCard(
              title: 'Duplicate OTT bundle found',
              body: 'Netflix and Prime overlap with your family plan. Consolidating could save ₹800/month.',
              accent: Color(0xFF7C3AED),
              icon: Icons.auto_awesome,
            ),
            const InsightCard(
              title: 'EMI load is the main pressure',
              body: 'EMI commitments account for most recurring spend. Prepayment planning can reduce interest.',
              accent: Color(0xFF2563EB),
              icon: Icons.trending_down,
            ),
            const InsightCard(
              title: 'Groceries trending upward',
              body: 'Fresh items rose 14% over the previous month. Watch weekly purchase frequency.',
              accent: Color(0xFF16A34A),
              icon: Icons.shopping_basket_outlined,
            ),
          ];
        }
        if (tab == 3) {
          return [
            const ResponsiveGrid(children: [
              KpiCard(label: 'Health Score', value: '78/100', caption: 'Stable', icon: Icons.favorite_outline, accent: AppColors.success),
              KpiCard(label: 'Savings Found', value: '₹800', caption: 'Potential', icon: Icons.savings_outlined, accent: Color(0xFF7C3AED)),
              KpiCard(label: 'Due Week', value: '₹3,967', caption: '6 items', icon: Icons.event_outlined, accent: AppColors.warning),
              KpiCard(label: 'Active Items', value: '18', caption: 'Recurring', icon: Icons.sync, accent: AppColors.ink),
            ]),
            const ChartCard(title: 'Yearly Projection', kind: ChartKind.bar, data: AppData.yearlySpending, colors: [Color(0xFF374151)]),
          ];
        }
        return [
          AppCard(
            color: AppColors.ink,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Monthly Recurring', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70)),
                const SizedBox(height: AppSpacing.sm),
                Text(money(total), style: Theme.of(context).textTheme.displaySmall?.copyWith(color: Colors.white)),
                Text('${money(total * 12)}/year', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white60)),
                const SizedBox(height: AppSpacing.lg),
                ClipRRect(
                  borderRadius: BorderRadius.circular(99),
                  child: const LinearProgressIndicator(value: .78, color: AppColors.success, backgroundColor: Colors.white12, minHeight: 6),
                ),
                const SizedBox(height: AppSpacing.sm),
                Text('Financial Health 78/100', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70)),
              ],
            ),
          ),
          ResponsiveGrid(children: [
            const KpiCard(label: 'Due This Week', value: '₹3,967', caption: '6 items', accent: AppColors.warning),
            const KpiCard(label: 'Active Items', value: '18', caption: 'Recurring', accent: AppColors.ink),
            KpiCard(label: 'This Month', value: money(total), caption: 'On track', accent: AppColors.success),
            const KpiCard(label: 'Savings Found', value: '₹800', caption: 'Potential', accent: Color(0xFF7C3AED)),
          ]),
          const InsightCard(
            title: 'Duplicate OTT bundle found',
            body: 'You can reduce overlap in streaming subscriptions and save about ₹800/month.',
            accent: Color(0xFF7C3AED),
          ),
          _ModuleGlance(subscriptionSpend: subscriptionSpend, emiSpend: emiSpend, utilitySpend: utilitySpend, grocerySpend: grocerySpend),
          const ChartCard(title: 'Monthly Burn Rate', kind: ChartKind.line, data: AppData.trend, colors: _chartColors),
          _UpcomingDues(),
        ];
      },
    );
  }
}

const _chartColors = [Color(0xFF8B5CF6), Color(0xFF2563EB), Color(0xFFF59E0B), Color(0xFF16A34A)];

class _ModuleGlance extends StatelessWidget {
  const _ModuleGlance({required this.subscriptionSpend, required this.emiSpend, required this.utilitySpend, required this.grocerySpend});

  final double subscriptionSpend;
  final int emiSpend;
  final int utilitySpend;
  final int grocerySpend;

  @override
  Widget build(BuildContext context) {
    final items = [
      (Icons.notifications_active_outlined, 'Subscriptions', subscriptionSpend, AppModule.subscriptions, '5 active'),
      (Icons.credit_card, 'EMI', emiSpend.toDouble(), AppModule.emi, '5 active'),
      (Icons.bolt_outlined, 'Utilities', utilitySpend.toDouble(), AppModule.utilities, '4 tracked'),
      (Icons.shopping_cart_outlined, 'Groceries', grocerySpend.toDouble(), AppModule.groceries, '4 groups'),
    ];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Modules'),
        const SizedBox(height: AppSpacing.md),
        SizedBox(
          height: 158,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemBuilder: (context, index) {
              final item = items[index];
              final palette = AppColors.palette(item.$4);
              return SizedBox(
                width: 162,
                child: AppCard(
                  onTap: () {
                    // Navigate to the respective module programmatically
                    AppNavigationShell.of(context)?.setModule(item.$4);
                  },
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(colors: [palette.heroStart, palette.heroEnd]),
                          borderRadius: BorderRadius.circular(AppRadius.md),
                        ),
                        child: Icon(item.$1, color: Colors.white),
                      ),
                      const Spacer(),
                      Text(item.$2, style: Theme.of(context).textTheme.titleMedium),
                      Text(money(item.$3), style: Theme.of(context).textTheme.titleLarge),
                      Text(item.$5, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
                    ],
                  ),
                ),
              );
            },
            separatorBuilder: (_, _) => const SizedBox(width: AppSpacing.md),
            itemCount: items.length,
          ),
        ),
      ],
    );
  }
}

class _UpcomingDues extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final items = [
      ('15 Jun', 'Netflix + Prime due', 1148, AppColors.danger),
      ('22 Jun', 'WiFi + DTH renewal', 2598, AppColors.warning),
      ('30 Jun', 'Mobile recharge', 719, AppColors.success),
    ];
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Upcoming Dues', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.md),
          ...items.map((item) => Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.md),
                child: Row(
                  children: [
                    Container(width: 8, height: 8, decoration: BoxDecoration(color: item.$4, shape: BoxShape.circle)),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(item.$2, style: Theme.of(context).textTheme.bodyMedium),
                          Text(item.$1, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
                        ],
                      ),
                    ),
                    Text(money(item.$3.toDouble()), style: Theme.of(context).textTheme.titleMedium),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}

class _FloatingActions extends StatelessWidget {
  const _FloatingActions({required this.open, required this.onToggle});

  final bool open;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.bottomRight,
      children: [
        if (open)
          Positioned(
            right: 0,
            bottom: 72,
            child: AppCard(
              padding: const EdgeInsets.all(AppSpacing.sm),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _FabAction(
                    icon: Icons.notifications_active_outlined,
                    label: 'Add Subscription',
                    color: const Color(0xFF7C3AED),
                    onTap: () {
                      onToggle();
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const AddSubscriptionScreen()),
                      );
                    },
                  ),
                  _FabAction(
                    icon: Icons.credit_card,
                    label: 'Add EMI',
                    color: const Color(0xFF2563EB),
                    onTap: () {
                      onToggle();
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const AddEmiScreen()),
                      );
                    },
                  ),
                  _FabAction(
                    icon: Icons.bolt_outlined,
                    label: 'Add Utility',
                    color: const Color(0xFFF59E0B),
                    onTap: () {
                      onToggle();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Utilities module coming soon!')),
                      );
                    },
                  ),
                  _FabAction(
                    icon: Icons.shopping_cart_outlined,
                    label: 'Add Grocery',
                    color: const Color(0xFF16A34A),
                    onTap: () {
                      onToggle();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Groceries module coming soon!')),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        FloatingActionButton(
          onPressed: onToggle,
          backgroundColor: AppColors.ink,
          foregroundColor: Colors.white,
          child: AnimatedRotation(
            turns: open ? .125 : 0,
            duration: const Duration(milliseconds: 180),
            child: const Icon(Icons.add),
          ),
        ),
      ],
    );
  }
}

class _FabAction extends StatelessWidget {
  const _FabAction({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadius.sm),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.sm),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: color, size: 18),
            const SizedBox(width: AppSpacing.md),
            Text(label, style: Theme.of(context).textTheme.bodyMedium),
          ],
        ),
      ),
    );
  }
}
