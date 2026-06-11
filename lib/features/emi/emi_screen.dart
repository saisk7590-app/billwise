import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../core/models/sample_data.dart';
import '../../core/widgets/app_card.dart';
import '../../core/widgets/charts.dart';
import '../../core/widgets/components.dart';
import '../../core/widgets/module_page.dart';
import 'add_emi_screen.dart';
import 'emi_details_screen.dart';

class EmiScreen extends StatefulWidget {
  const EmiScreen({super.key, required this.onMenu});

  final VoidCallback onMenu;

  @override
  State<EmiScreen> createState() => _EmiScreenState();
}

class _EmiScreenState extends State<EmiScreen> {
  final _tab = ValueNotifier<int>(0);

  @override
  void dispose() {
    _tab.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(AppModule.emi);
    return ModuleTabbedPage(
      module: AppModule.emi,
      onMenu: widget.onMenu,
      title: 'EMI',
      subtitle: 'Loan intelligence',
      tabs: const ['Overview', 'Analytics', 'History', 'Reminders'],
      tab: _tab,
      floating: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const AddEmiScreen()),
          );
        },
        backgroundColor: palette.accent,
        foregroundColor: Colors.white,
        child: const Icon(Icons.add),
      ),
      childrenBuilder: (tab) {
        if (tab == 1) return _analytics(palette);
        if (tab == 2) return _history(palette);
        if (tab == 3) return _reminders(palette);
        return _overview(palette);
      },
    );
  }

  List<Widget> _overview(ModulePalette palette) {
    final total = AppData.emis.fold<int>(0, (sum, item) => sum + item.monthlyEmi);
    final remaining = AppData.emis.fold<int>(0, (sum, item) => sum + item.remainingBalance);
    final highest = [...AppData.emis]..sort((a, b) => b.monthlyEmi.compareTo(a.monthlyEmi));
    final ending = [...AppData.emis]..sort((a, b) => a.remainingMonths.compareTo(b.remainingMonths));
    return [
      AppCard(
        color: palette.accent,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Monthly EMI Burden', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70)),
            const SizedBox(height: AppSpacing.sm),
            Text(money(total.toDouble()), style: Theme.of(context).textTheme.displaySmall?.copyWith(color: Colors.white)),
            const SizedBox(height: AppSpacing.md),
            Row(
              children: [
                Expanded(child: _HeroMetric(label: 'Remaining', value: money(remaining.toDouble(), compact: true))),
                Expanded(child: _HeroMetric(label: 'Active EMIs', value: '${AppData.emis.length}')),
              ],
            ),
            const SizedBox(height: AppSpacing.lg),
            Text('Debt-free date • Jan 2035', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70)),
          ],
        ),
      ),
      ResponsiveGrid(children: [
        KpiCard(
          label: 'Highest EMI',
          value: highest.first.name,
          caption: money(highest.first.monthlyEmi.toDouble()),
          accent: palette.accent,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => EmiDetailsScreen(emi: highest.first)),
            );
          },
        ),
        KpiCard(
          label: 'Ending Soon',
          value: ending.first.name,
          caption: '${ending.first.remainingMonths} months left',
          accent: AppColors.success,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => EmiDetailsScreen(emi: ending.first)),
            );
          },
        ),
        KpiCard(label: 'Interest', value: money(1600000, compact: true), caption: 'Remaining', accent: AppColors.warning),
        KpiCard(label: 'Due Week', value: money(17000), caption: 'This week', accent: palette.accent),
      ]),
      InsightCard(
        title: 'Home Loan contributes 42% of EMI burden',
        body: 'Your largest monthly commitment is ${money(highest.first.monthlyEmi.toDouble())}. Consider prepayment simulations before adding new debt.',
        accent: palette.accent,
        icon: Icons.insights,
      ),
      ChartCard(title: 'EMI Type Distribution', kind: ChartKind.donut, data: AppData.categoryDistribution(AppModule.emi), colors: const [Color(0xFF1D4ED8), Color(0xFF2563EB), Color(0xFF60A5FA), Color(0xFF93C5FD)]),
      _EmiList(title: 'Top EMIs', items: highest.take(4).toList(), accent: palette.accent),
    ];
  }

  List<Widget> _analytics(ModulePalette palette) => [
        ChartCard(title: 'Line Chart: Remaining Balance', kind: ChartKind.line, data: const [ChartPoint('Jan', 4420000), ChartPoint('Mar', 4380000), ChartPoint('Jun', 4205000), ChartPoint('Sep', 4100000), ChartPoint('Dec', 3950000)], colors: [palette.accent]),
        ChartCard(title: 'Bar Chart: EMI Burden', kind: ChartKind.bar, data: AppData.trend.map((p) => ChartPoint(p.label, p.secondary)).toList(), colors: [palette.accentDark]),
        ChartCard(title: 'Stacked Bar: Principal vs Interest', kind: ChartKind.stackedBar, data: const [ChartPoint('Home', 8200, secondary: 3800), ChartPoint('Car', 2800, secondary: 1400), ChartPoint('Bike', 1200, secondary: 600), ChartPoint('Personal', 2300, secondary: 1200)], colors: [palette.accent, AppColors.warning]),
      ];

  List<Widget> _history(ModulePalette palette) => [
        _EmiList(title: 'Recent EMI Payments', items: AppData.emis, accent: palette.accent),
      ];

  List<Widget> _reminders(ModulePalette palette) => [
        ...AppData.emis.map((emi) => AppCard(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => EmiDetailsScreen(emi: emi)),
                );
              },
              child: Row(
                children: [
                  Icon(Icons.alarm, color: palette.accent),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(child: Text('${emi.name} due on day ${emi.dueDay}', style: Theme.of(context).textTheme.bodyMedium)),
                  StatusChip(label: '${emi.remainingMonths} left', color: palette.accent),
                ],
              ),
            )),
      ];
}

class _HeroMetric extends StatelessWidget {
  const _HeroMetric({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white70)),
        Text(value, style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white)),
      ],
    );
  }
}

class _EmiList extends StatelessWidget {
  const _EmiList({required this.title, required this.items, required this.accent});

  final String title;
  final List<EmiItem> items;
  final Color accent;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.md),
          ...items.map((emi) => Padding(
                padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
                child: InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => EmiDetailsScreen(emi: emi)),
                    );
                  },
                  borderRadius: BorderRadius.circular(AppRadius.sm),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4.0),
                    child: Row(
                      children: [
                        Container(width: 36, height: 36, decoration: BoxDecoration(color: accent.withValues(alpha: .12), shape: BoxShape.circle), child: Icon(Icons.credit_card, color: accent, size: 18)),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(emi.name, style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w800)),
                              Text(emi.lender, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
                            ],
                          ),
                        ),
                        Text('${money(emi.monthlyEmi.toDouble())}/mo', style: Theme.of(context).textTheme.titleMedium),
                      ],
                    ),
                  ),
                ),
              )),
        ],
      ),
    );
  }
}
