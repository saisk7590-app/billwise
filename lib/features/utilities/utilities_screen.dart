import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../core/models/sample_data.dart';
import '../../core/widgets/app_card.dart';
import '../../core/widgets/charts.dart';
import '../../core/widgets/components.dart';
import '../../core/widgets/module_page.dart';

class UtilitiesScreen extends StatefulWidget {
  const UtilitiesScreen({super.key, required this.onMenu});

  final VoidCallback onMenu;

  @override
  State<UtilitiesScreen> createState() => _UtilitiesScreenState();
}

class _UtilitiesScreenState extends State<UtilitiesScreen> {
  final _tab = ValueNotifier<int>(0);

  @override
  void dispose() {
    _tab.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(AppModule.utilities);
    return ModuleTabbedPage(
      module: AppModule.utilities,
      onMenu: widget.onMenu,
      title: 'Utilities',
      subtitle: 'Track electricity, water, gas bills',
      tabs: const ['Overview', 'Analytics', 'Bills'],
      tab: _tab,
      childrenBuilder: (tab) {
        if (tab == 1) return _analytics(palette);
        if (tab == 2) return _bills(palette);
        return _overview(palette);
      },
    );
  }

  List<Widget> _overview(ModulePalette palette) {
    final total = AppData.utilities.fold<int>(0, (sum, item) => sum + item.amount);
    return [
      AppCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(children: [Icon(Icons.bolt_outlined, color: palette.accent), const SizedBox(width: AppSpacing.sm), Text('Utility Burden', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted))]),
            const SizedBox(height: AppSpacing.sm),
            Text(money(total), style: Theme.of(context).textTheme.displaySmall),
            Text('Expected this month', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
          ],
        ),
      ),
      ResponsiveGrid(children: [
        KpiCard(label: 'Electricity', value: money(1860), caption: 'Due soon', icon: Icons.electric_bolt, accent: palette.accent),
        KpiCard(label: 'Water', value: money(420), caption: 'Scheduled', icon: Icons.water_drop_outlined, accent: const Color(0xFF06B6D4)),
        KpiCard(label: 'Gas', value: money(1120), caption: '45 days', icon: Icons.local_fire_department_outlined, accent: AppColors.warning),
        KpiCard(label: 'DTH', value: money(360), caption: 'Monthly', icon: Icons.satellite_alt_outlined, accent: palette.accentDark),
      ]),
      InsightCard(title: 'Power bill rose this month', body: 'Electricity is 49% of utilities. A threshold alert would catch seasonal spikes early.', accent: palette.accent, icon: Icons.warning_amber_rounded),
      ChartCard(title: 'Donut Chart: Utility Split', kind: ChartKind.donut, data: AppData.categoryDistribution(AppModule.utilities), colors: const [Color(0xFFF59E0B), Color(0xFF06B6D4), Color(0xFFEA580C), Color(0xFF7C3AED)]),
      _UtilityList(items: AppData.utilities, accent: palette.accent),
    ];
  }

  List<Widget> _analytics(ModulePalette palette) => [
        ChartCard(title: 'Line Chart: Bill Trend', kind: ChartKind.line, data: AppData.trend.map((p) => ChartPoint(p.label, 3200 + p.value / 2)).toList(), colors: [palette.accent]),
        ChartCard(title: 'Bar Chart: Category Spend', kind: ChartKind.bar, data: AppData.categoryDistribution(AppModule.utilities), colors: [palette.accentDark]),
        ChartCard(title: 'Stacked Bar: Fixed vs Variable', kind: ChartKind.stackedBar, data: const [ChartPoint('Power', 900, secondary: 960), ChartPoint('Water', 300, secondary: 120), ChartPoint('Gas', 700, secondary: 420), ChartPoint('DTH', 360, secondary: 0)], colors: [palette.accent, const Color(0xFF06B6D4)]),
      ];

  List<Widget> _bills(ModulePalette palette) => [
        AppSearchBar(hint: 'Search utility bills'),
        _UtilityList(items: AppData.utilities, accent: palette.accent),
      ];
}

class _UtilityList extends StatelessWidget {
  const _UtilityList({required this.items, required this.accent});

  final List<RecurringItem> items;
  final Color accent;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Tracked Bills', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.md),
          ...items.map((item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: AppSpacing.md),
                child: Row(
                  children: [
                    Container(width: 38, height: 38, decoration: BoxDecoration(color: accent.withValues(alpha: .12), borderRadius: BorderRadius.circular(AppRadius.sm)), child: Icon(Icons.receipt_outlined, color: accent, size: 18)),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(item.title, style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w800)),
                        Text('${item.category} • ${item.frequency}', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
                      ]),
                    ),
                    Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                      Text(money(item.amount), style: Theme.of(context).textTheme.titleMedium),
                      StatusChip(label: item.status, color: accent),
                    ]),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}
