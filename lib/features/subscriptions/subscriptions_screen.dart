import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../core/models/sample_data.dart';
import '../../core/widgets/app_card.dart';
import '../../core/widgets/charts.dart';
import '../../core/widgets/components.dart';
import '../../core/widgets/module_page.dart';
import 'add_subscription_screen.dart';
import 'service_details_screen.dart';

class SubscriptionsScreen extends StatefulWidget {
  const SubscriptionsScreen({super.key, required this.onMenu});

  final VoidCallback onMenu;

  @override
  State<SubscriptionsScreen> createState() => _SubscriptionsScreenState();
}

class _SubscriptionsScreenState extends State<SubscriptionsScreen> {
  final _tab = ValueNotifier<int>(0);
  final _query = ValueNotifier<String>('');
  String _yearFilter = '3Y';

  @override
  void dispose() {
    _tab.dispose();
    _query.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(AppModule.subscriptions);
    return ModuleTabbedPage(
      module: AppModule.subscriptions,
      onMenu: widget.onMenu,
      title: 'Subscriptions',
      subtitle: 'June 2026',
      tabs: const ['Overview', 'Analytics', 'History', 'Reminders'],
      tab: _tab,
      floating: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const AddSubscriptionScreen()),
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
    final monthly = AppData.subscriptions.fold<double>(0, (sum, item) => sum + (item.billingType == 'Yearly' ? item.price / 12 : item.price));
    final yearly = monthly * 12;
    final top = [...AppData.subscriptions]..sort((a, b) => b.price.compareTo(a.price));
    return [
      AppCard(
        onTap: () => _tab.value = 1,
        padding: const EdgeInsets.all(28),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Total Yearly Spending', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
            const SizedBox(height: AppSpacing.sm),
            Text(money(yearly), style: Theme.of(context).textTheme.displaySmall),
            const SizedBox(height: AppSpacing.sm),
            StatusChip(label: 'Down 46% vs 2025', color: AppColors.success),
          ],
        ),
      ),
      ResponsiveGrid(children: [
        KpiCard(label: 'OTT', value: money(10716), caption: 'Highest', icon: Icons.tv_outlined, accent: palette.accent),
        KpiCard(label: 'Internet', value: money(9588), caption: '1 service', icon: Icons.wifi, accent: const Color(0xFF06B6D4)),
        KpiCard(label: 'Mobile', value: money(4788), caption: 'Monthly', icon: Icons.smartphone, accent: const Color(0xFF4F46E5)),
        KpiCard(label: 'Active', value: '5', caption: 'Services', icon: Icons.check_circle_outline, accent: AppColors.success),
      ]),
      InsightCard(
        title: 'OTT is your highest category',
        body: 'Streaming and entertainment services account for most subscription spending this year.',
        accent: palette.accent,
      ),
      ChartCard(title: 'Category Distribution', kind: ChartKind.donut, data: AppData.categoryDistribution(AppModule.subscriptions), colors: const [Color(0xFF7C3AED), Color(0xFF4F46E5), Color(0xFF06B6D4), Color(0xFF10B981)]),
      AppCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Top Services', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: AppSpacing.md),
            ...top.take(4).map((item) => _ListRow(
                  title: item.name,
                  subtitle: item.category,
                  value: '${money(item.billingType == 'Yearly' ? item.price / 12 : item.price.toDouble())}/mo',
                  accent: palette.accent,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ServiceDetailsScreen(subscription: item)),
                    );
                  },
                )),
          ],
        ),
      ),
    ];
  }

  List<Widget> _analytics(ModulePalette palette) => [
        ChartCard(title: 'Pie Chart: Category Share', kind: ChartKind.pie, data: AppData.categoryDistribution(AppModule.subscriptions), colors: const [Color(0xFF7C3AED), Color(0xFF4F46E5), Color(0xFF06B6D4), Color(0xFF10B981)]),
        AppCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(child: Text('Yearly Spending', style: Theme.of(context).textTheme.titleMedium)),
                  _FilterChips(active: _yearFilter, values: const ['1Y', '3Y', '5Y', '10Y'], color: palette.accent, onChanged: (value) => setState(() => _yearFilter = value)),
                ],
              ),
              const SizedBox(height: AppSpacing.lg),
              ChartCard(title: 'Bar Chart', kind: ChartKind.bar, data: AppData.yearlySpending, colors: [palette.accent], height: 170),
            ],
          ),
        ),
        ChartCard(title: 'Line Chart: Price Trend', kind: ChartKind.line, data: const [ChartPoint('Jan', 649), ChartPoint('Feb', 649), ChartPoint('Mar', 649), ChartPoint('Apr', 699), ChartPoint('May', 699), ChartPoint('Jun', 649)], colors: [palette.accentDark]),
        ChartCard(title: 'Top Services by Spending', kind: ChartKind.bar, data: AppData.subscriptions.map((e) => ChartPoint(e.name, e.price.toDouble())).toList(), colors: const [Color(0xFF06B6D4)]),
      ];

  List<Widget> _history(ModulePalette palette) => [
        AppSearchBar(hint: 'Search services', onChanged: (value) => _query.value = value),
        ValueListenableBuilder<String>(
          valueListenable: _query,
          builder: (context, query, _) {
            final items = AppData.subscriptions.where((item) => item.name.toLowerCase().contains(query.toLowerCase())).toList();
            return AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Payment History', style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: AppSpacing.md),
                  if (items.isEmpty)
                    const EmptyStateWidget(title: 'No service found', message: 'Try another search term.')
                  else
                    ...items.map((item) => _ListRow(
                          title: item.name,
                          subtitle: '${item.category} • ${item.nextDue}',
                          value: money(item.price.toDouble()),
                          accent: palette.accent,
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => ServiceDetailsScreen(subscription: item)),
                            );
                          },
                        )),
                ],
              ),
            );
          },
        ),
      ];

  List<Widget> _reminders(ModulePalette palette) => [
        ...AppData.subscriptions.map((item) => AppCard(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ServiceDetailsScreen(subscription: item)),
                );
              },
              child: Row(
                children: [
                  Icon(Icons.notifications_active_outlined, color: palette.accent),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(child: _TitleSubtitle(title: item.name, subtitle: 'Due ${item.nextDue} • ${item.billingType}')),
                  StatusChip(label: item.status, color: AppColors.success),
                ],
              ),
            )),
      ];
}

class _FilterChips extends StatelessWidget {
  const _FilterChips({required this.active, required this.values, required this.color, required this.onChanged});

  final String active;
  final List<String> values;
  final Color color;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: values.map((value) {
        final selected = value == active;
        return Padding(
          padding: const EdgeInsets.only(left: 4),
          child: ChoiceChip(
            label: Text(value),
            selected: selected,
            onSelected: (_) => onChanged(value),
            selectedColor: color,
            labelStyle: TextStyle(color: selected ? Colors.white : AppColors.muted, fontSize: 11, fontWeight: FontWeight.w700),
            side: BorderSide.none,
          ),
        );
      }).toList(),
    );
  }
}

class _ListRow extends StatelessWidget {
  const _ListRow({required this.title, required this.subtitle, required this.value, required this.accent, this.onTap});

  final String title;
  final String subtitle;
  final String value;
  final Color accent;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.md),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadius.sm),
        child: Row(
          children: [
            Container(width: 38, height: 38, decoration: BoxDecoration(color: accent.withValues(alpha: .12), borderRadius: BorderRadius.circular(AppRadius.sm)), child: Icon(Icons.receipt_long, color: accent, size: 19)),
            const SizedBox(width: AppSpacing.md),
            Expanded(child: _TitleSubtitle(title: title, subtitle: subtitle)),
            Text(value, style: Theme.of(context).textTheme.titleMedium),
          ],
        ),
      ),
    );
  }
}

class _TitleSubtitle extends StatelessWidget {
  const _TitleSubtitle({required this.title, required this.subtitle});

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, maxLines: 1, overflow: TextOverflow.ellipsis, style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w800)),
        Text(subtitle, maxLines: 1, overflow: TextOverflow.ellipsis, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
      ],
    );
  }
}
