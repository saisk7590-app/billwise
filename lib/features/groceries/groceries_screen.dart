import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../core/models/sample_data.dart';
import '../../core/widgets/app_card.dart';
import '../../core/widgets/charts.dart';
import '../../core/widgets/components.dart';
import '../../core/widgets/module_page.dart';

class GroceriesScreen extends StatefulWidget {
  const GroceriesScreen({super.key, required this.onMenu});

  final VoidCallback onMenu;

  @override
  State<GroceriesScreen> createState() => _GroceriesScreenState();
}

class _GroceriesScreenState extends State<GroceriesScreen> {
  final _tab = ValueNotifier<int>(0);
  final _query = ValueNotifier<String>('');

  @override
  void dispose() {
    _tab.dispose();
    _query.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(AppModule.groceries);
    return ModuleTabbedPage(
      module: AppModule.groceries,
      onMenu: widget.onMenu,
      title: 'Groceries',
      subtitle: 'Household groceries tracker',
      tabs: const ['Overview', 'Analytics', 'Items'],
      tab: _tab,
      childrenBuilder: (tab) {
        if (tab == 1) return _analytics(palette);
        if (tab == 2) return _itemsList(palette);
        return _overview(palette);
      },
    );
  }

  List<Widget> _overview(ModulePalette palette) {
    final total = AppData.groceries.fold<int>(0, (sum, item) => sum + item.amount);
    return [
      // Total Spend Card
      AppCard(
        onTap: () => _tab.value = 1,
        padding: const EdgeInsets.all(28),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Monthly Grocery Spend', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
            const SizedBox(height: AppSpacing.sm),
            Text(money(total.toDouble()), style: Theme.of(context).textTheme.displaySmall),
            const SizedBox(height: AppSpacing.sm),
            StatusChip(label: 'Within budget (92%)', color: AppColors.success),
          ],
        ),
      ),

      // KPI Grid
      ResponsiveGrid(children: [
        KpiCard(label: 'Staples', value: money(3200), caption: 'BigBasket', icon: Icons.shopping_basket_outlined, accent: palette.accent),
        KpiCard(label: 'Fresh Dairy', value: money(4050), caption: 'Local vendor', icon: Icons.local_dining_outlined, accent: const Color(0xFFEA580C)),
        KpiCard(label: 'Household', value: money(1450), caption: 'Monthly care', icon: Icons.home_repair_service_outlined, accent: const Color(0xFF06B6D4)),
        KpiCard(label: 'Deliveries', value: '8 / mo', caption: 'Frequency', icon: Icons.local_shipping_outlined, accent: palette.accentDark),
      ]),

      // Insight
      InsightCard(
        title: 'Vegetables rose 14% this month',
        body: 'Fresh vegetables purchased weekly showed a significant pricing increase. Opting for bi-weekly bulk markets may save ₹400.',
        accent: palette.accent,
        icon: Icons.trending_up,
      ),

      // Donut Chart
      ChartCard(
        title: 'Category split',
        kind: ChartKind.donut,
        data: AppData.categoryDistribution(AppModule.groceries),
        colors: const [Color(0xFF16A34A), Color(0xFFEA580C), Color(0xFF06B6D4), Color(0xFFF59E0B)],
      ),

      // Recurrent list
      _GroceryList(items: AppData.groceries, accent: palette.accent),
    ];
  }

  List<Widget> _analytics(ModulePalette palette) => [
        ChartCard(
          title: 'Grocery Spending Trends',
          kind: ChartKind.line,
          data: AppData.trend.map((p) => ChartPoint(p.label, 4800 + p.value * 0.8)).toList(),
          colors: [palette.accent],
        ),
        ChartCard(
          title: 'Category Distribution Share',
          kind: ChartKind.bar,
          data: AppData.categoryDistribution(AppModule.groceries),
          colors: [palette.accentDark],
        ),
        ChartCard(
          title: 'Fixed Staples vs Variable Fresh',
          kind: ChartKind.stackedBar,
          data: const [
            ChartPoint('Jan', 2900, secondary: 1900),
            ChartPoint('Feb', 3100, secondary: 2100),
            ChartPoint('Mar', 3000, secondary: 3100),
            ChartPoint('Apr', 3200, secondary: 2500),
            ChartPoint('May', 3200, secondary: 3600),
            ChartPoint('Jun', 3200, secondary: 4050),
          ],
          colors: [palette.accent, const Color(0xFFEA580C)],
        ),
      ];

  List<Widget> _itemsList(ModulePalette palette) => [
        AppSearchBar(
          hint: 'Search grocery list groups',
          onChanged: (val) => _query.value = val,
        ),
        ValueListenableBuilder<String>(
          valueListenable: _query,
          builder: (context, query, _) {
            final items = AppData.groceries.where((item) => item.title.toLowerCase().contains(query.toLowerCase())).toList();
            return AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Shopping Groups', style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: AppSpacing.md),
                  if (items.isEmpty)
                    const EmptyStateWidget(title: 'No list found', message: 'Try another search term.')
                  else
                    ...items.map(
                      (item) => Padding(
                        padding: const EdgeInsets.symmetric(vertical: AppSpacing.md),
                        child: Row(
                          children: [
                            Container(
                              width: 38,
                              height: 38,
                              decoration: BoxDecoration(color: palette.accent.withValues(alpha: .12), borderRadius: BorderRadius.circular(AppRadius.sm)),
                              child: Icon(Icons.shopping_cart, color: palette.accent, size: 18),
                            ),
                            const SizedBox(width: AppSpacing.md),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(item.title, style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w800)),
                                  Text('${item.category} • ${item.frequency}', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
                                ],
                              ),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text(money(item.amount.toDouble()), style: Theme.of(context).textTheme.titleMedium),
                                StatusChip(label: item.status, color: palette.accent),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            );
          },
        ),
      ];
}

class _GroceryList extends StatelessWidget {
  const _GroceryList({required this.items, required this.accent});

  final List<RecurringItem> items;
  final Color accent;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Recurring Deliveries', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.md),
          ...items.map((item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: AppSpacing.md),
                child: Row(
                  children: [
                    Container(width: 38, height: 38, decoration: BoxDecoration(color: accent.withValues(alpha: .12), borderRadius: BorderRadius.circular(AppRadius.sm)), child: Icon(Icons.shopping_basket_outlined, color: accent, size: 18)),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(item.title, style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w800)),
                        Text('${item.category} • ${item.frequency}', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted)),
                      ]),
                    ),
                    Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                      Text(money(item.amount.toDouble()), style: Theme.of(context).textTheme.titleMedium),
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
