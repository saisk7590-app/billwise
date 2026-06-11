import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../core/models/sample_data.dart';
import '../../core/widgets/app_card.dart';
import '../../core/widgets/charts.dart';

class EmiDetailsScreen extends StatelessWidget {
  const EmiDetailsScreen({super.key, required this.emi});

  final EmiItem emi;

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(AppModule.emi);

    // Dynamic calculations based on EmiItem properties
    final double totalAmount =
        emi.remainingBalance.toDouble() +
        (emi.monthlyEmi *
            emi.remainingMonths *
            0.7); // Estimated original principal
    final double amountPaid = totalAmount - emi.remainingBalance;
    final double totalPayable =
        emi.monthlyEmi * emi.remainingMonths.toDouble() + amountPaid;
    final double totalInterest = totalPayable - totalAmount;

    // Repayment progress
    final double principalPaidPercent = (amountPaid / totalAmount).clamp(
      0.0,
      1.0,
    );
    final double timeElapsedPercent =
        0.45; // Placeholder for elapsed time ratio

    // Build decay trend points
    final payoffTimeline = [
      ChartPoint('Jan 26', emi.remainingBalance.toDouble()),
      ChartPoint('Jun 26', emi.remainingBalance * 0.9),
      ChartPoint('Dec 26', emi.remainingBalance * 0.8),
      ChartPoint('Jun 27', emi.remainingBalance * 0.68),
      ChartPoint('Dec 27', emi.remainingBalance * 0.55),
      ChartPoint('Jun 28', emi.remainingBalance * 0.42),
    ];

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
                        'EMI Details',
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
                          emi.name,
                          style: Theme.of(context).textTheme.headlineMedium
                              ?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w900,
                              ),
                        ),
                        const SizedBox(height: AppSpacing.xs),
                        Row(
                          children: [
                            Text(
                              emi.lender,
                              style: Theme.of(context).textTheme.bodySmall
                                  ?.copyWith(
                                    color: Colors.white.withValues(alpha: .75),
                                  ),
                            ),
                            const SizedBox(width: AppSpacing.md),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 10,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: .18),
                                borderRadius: BorderRadius.circular(999),
                              ),
                              child: Text(
                                emi.type,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Main body list
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(AppSpacing.lg),
              children: [
                // Highlights Info Card
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
                                  'MONTHLY EMI',
                                  style: Theme.of(context).textTheme.labelSmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(
                                  money(emi.monthlyEmi.toDouble()),
                                  style: Theme.of(context).textTheme.titleLarge,
                                ),
                              ],
                            ),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'REMAINING BALANCE',
                                  style: Theme.of(context).textTheme.labelSmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(
                                  money(
                                    emi.remainingBalance.toDouble(),
                                    compact: true,
                                  ),
                                  style: Theme.of(context).textTheme.titleLarge,
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
                                  'NEXT DUE',
                                  style: Theme.of(context).textTheme.labelSmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(
                                  '0${emi.dueDay} Jun',
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
                                  'TERM REMAINING',
                                  style: Theme.of(context).textTheme.labelSmall
                                      ?.copyWith(color: AppColors.muted),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(
                                  '${emi.remainingMonths} months',
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

                // Financial Information Section
                AppCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Financial Information',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: AppSpacing.md),
                      _RowMetric(
                        label: 'Total Loan Amount',
                        value: money(totalAmount, compact: true),
                      ),
                      _RowMetric(
                        label: 'Total Payable',
                        value: money(totalPayable, compact: true),
                      ),
                      _RowMetric(
                        label: 'Principal Remaining',
                        value: money(
                          emi.remainingBalance.toDouble(),
                          compact: true,
                        ),
                        color: palette.accent,
                      ),
                      _RowMetric(
                        label: 'Total Interest',
                        value: money(totalInterest, compact: true),
                      ),
                      _RowMetric(label: 'Start Date', value: '15 Jan 2020'),
                      _RowMetric(
                        label: 'Estimated End Date',
                        value: '15 Jan 2035',
                        isLast: true,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),

                // Payoff Timeline Graph
                ChartCard(
                  title: 'Payoff Timeline',
                  kind: ChartKind.line,
                  data: payoffTimeline,
                  colors: [palette.accent],
                  height: 160,
                ),
                const SizedBox(height: AppSpacing.lg),

                // Repayment Progress Card
                AppCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Repayment Progress',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: AppSpacing.md),

                      // Principal Progress
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Principal Paid',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: AppColors.muted,
                            ),
                          ),
                          Text(
                            '${(principalPaidPercent * 100).round()}%',
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.xs),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(99),
                        child: LinearProgressIndicator(
                          value: principalPaidPercent,
                          minHeight: 8,
                          color: AppColors.success,
                          backgroundColor: AppColors.faint,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.lg),

                      // Time Progress
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Time Elapsed',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: AppColors.muted,
                            ),
                          ),
                          Text(
                            '${(timeElapsedPercent * 100).round()}%',
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.xs),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(99),
                        child: LinearProgressIndicator(
                          value: timeElapsedPercent,
                          minHeight: 8,
                          color: palette.accent,
                          backgroundColor: AppColors.faint,
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

class _RowMetric extends StatelessWidget {
  const _RowMetric({
    required this.label,
    required this.value,
    this.color,
    this.isLast = false,
  });

  final String label;
  final String value;
  final Color? color;
  final bool isLast;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        border: isLast
            ? null
            : const Border(
                bottom: BorderSide(color: AppColors.faint, width: 0.8),
              ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(color: AppColors.muted, fontSize: 14),
          ),
          Text(
            value,
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 14,
              color: color ?? AppColors.ink,
            ),
          ),
        ],
      ),
    );
  }
}
