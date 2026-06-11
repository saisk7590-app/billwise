import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../core/models/sample_data.dart';
import '../../core/widgets/app_card.dart';
import '../../core/widgets/charts.dart';

class ServiceDetailsScreen extends StatelessWidget {
  const ServiceDetailsScreen({super.key, required this.subscription});

  final SubscriptionItem subscription;

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(AppModule.subscriptions);

    // Mock price history matching sample data
    final priceHistory = [
      const ChartPoint('Jan', 649),
      const ChartPoint('Feb', 649),
      const ChartPoint('Mar', 649),
      const ChartPoint('Apr', 649),
      const ChartPoint('May', 649),
      const ChartPoint('Jun', 649),
    ];

    // Mock payments matching sample data for this service
    final recentPayments = [
      (date: '20 Jun 2026', amount: subscription.price),
      (date: '20 May 2026', amount: subscription.price),
      (date: '20 Apr 2026', amount: subscription.price),
      (date: '20 Mar 2026', amount: subscription.price),
    ];

    final totalSpent = recentPayments.fold<int>(0, (sum, p) => sum + p.amount);

    return Scaffold(
      backgroundColor: AppColors.canvas,
      body: Column(
        children: [
          // Styled Header (Gradient banner)
          Container(
            padding: const EdgeInsets.fromLTRB(16, 28, 16, 24),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [palette.heroStart, palette.heroEnd],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: const BorderRadius.vertical(
                bottom: Radius.circular(AppRadius.hero),
              ),
            ),
            child: SafeArea(
              bottom: false,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      IconButton(
                        onPressed: () => Navigator.pop(context),
                        icon: const Icon(Icons.arrow_back, color: Colors.white),
                        style: IconButton.styleFrom(
                          backgroundColor: Colors.white.withValues(alpha: .12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(AppRadius.sm),
                          ),
                        ),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      Text(
                        'Details',
                        style: Theme.of(
                          context,
                        ).textTheme.titleLarge?.copyWith(color: Colors.white),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  Padding(
                    padding: const EdgeInsets.only(left: 8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          subscription.name,
                          style: Theme.of(context).textTheme.headlineMedium
                              ?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w900,
                              ),
                        ),
                        const SizedBox(height: AppSpacing.xs),
                        Text(
                          subscription.category,
                          style: Theme.of(context).textTheme.bodySmall
                              ?.copyWith(
                                color: Colors.white.withValues(alpha: .75),
                              ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Main body scrollable list
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(AppSpacing.lg),
              children: [
                // Info grid card
                AppCard(
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'CURRENT PRICE',
                                  style: Theme.of(context).textTheme.labelSmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(
                                  money(subscription.price.toDouble()),
                                  style: Theme.of(context).textTheme.titleLarge,
                                ),
                                Text(
                                  subscription.billingType,
                                  style: Theme.of(context).textTheme.bodySmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                              ],
                            ),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'TOTAL SPENT',
                                  style: Theme.of(context).textTheme.labelSmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(
                                  money(totalSpent.toDouble()),
                                  style: Theme.of(context).textTheme.titleLarge,
                                ),
                                Text(
                                  'All time tracked',
                                  style: Theme.of(context).textTheme.bodySmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.lg),
                      Container(height: 1, color: AppColors.faint),
                      const SizedBox(height: AppSpacing.lg),
                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'START DATE',
                                  style: Theme.of(context).textTheme.labelSmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(
                                  '15 Jan 2024',
                                  style: Theme.of(context).textTheme.bodyMedium
                                      ?.copyWith(fontWeight: FontWeight.w700),
                                ),
                              ],
                            ),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'NEXT DUE',
                                  style: Theme.of(context).textTheme.labelSmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(
                                  subscription.nextDue,
                                  style: Theme.of(context).textTheme.bodyMedium
                                      ?.copyWith(fontWeight: FontWeight.w700),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),

                // Price Timeline Chart
                ChartCard(
                  title: 'Price History',
                  kind: ChartKind.line,
                  data: priceHistory,
                  colors: [palette.accent],
                  height: 160,
                ),
                const SizedBox(height: AppSpacing.lg),

                // Recent Payments List
                AppCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Recent Payments',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: AppSpacing.md),
                      ...recentPayments.map(
                        (payment) => Padding(
                          padding: const EdgeInsets.symmetric(
                            vertical: AppSpacing.sm,
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Icon(
                                    Icons.check_circle,
                                    color: AppColors.success,
                                    size: 18,
                                  ),
                                  const SizedBox(width: AppSpacing.sm),
                                  Text(
                                    payment.date,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                              Text(
                                money(payment.amount.toDouble()),
                                style: const TextStyle(
                                  fontWeight: FontWeight.w700,
                                  color: AppColors.ink,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
