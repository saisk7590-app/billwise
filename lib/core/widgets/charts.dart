import 'dart:math';

import 'package:flutter/material.dart';

import '../constants/app_constants.dart';
import '../models/sample_data.dart';
import 'app_card.dart';

enum ChartKind { pie, donut, line, bar, stackedBar }

class ChartCard extends StatelessWidget {
  const ChartCard({
    super.key,
    required this.title,
    required this.kind,
    required this.data,
    required this.colors,
    this.height = 210,
  });

  final String title;
  final ChartKind kind;
  final List<ChartPoint> data;
  final List<Color> colors;
  final double height;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      padding: const EdgeInsets.all(AppSpacing.xl),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            height: height,
            child: CustomPaint(
              size: Size.infinite,
              painter: _ChartPainter(kind: kind, data: data, colors: colors),
            ),
          ),
          if (kind == ChartKind.pie || kind == ChartKind.donut) ...[
            const SizedBox(height: AppSpacing.md),
            ...data.take(5).toList().asMap().entries.map(
                  (entry) => Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Row(
                      children: [
                        Container(
                          width: 10,
                          height: 10,
                          decoration: BoxDecoration(color: colors[entry.key % colors.length], shape: BoxShape.circle),
                        ),
                        const SizedBox(width: AppSpacing.sm),
                        Expanded(child: Text(entry.value.label, style: Theme.of(context).textTheme.bodySmall)),
                        Text(money(entry.value.value), style: Theme.of(context).textTheme.bodySmall?.copyWith(fontWeight: FontWeight.w700)),
                      ],
                    ),
                  ),
                ),
          ],
        ],
      ),
    );
  }
}

class _ChartPainter extends CustomPainter {
  _ChartPainter({required this.kind, required this.data, required this.colors});

  final ChartKind kind;
  final List<ChartPoint> data;
  final List<Color> colors;

  @override
  void paint(Canvas canvas, Size size) {
    switch (kind) {
      case ChartKind.pie:
      case ChartKind.donut:
        _paintPie(canvas, size, donut: kind == ChartKind.donut);
      case ChartKind.line:
        _paintLine(canvas, size);
      case ChartKind.bar:
        _paintBars(canvas, size, stacked: false);
      case ChartKind.stackedBar:
        _paintBars(canvas, size, stacked: true);
    }
  }

  void _paintGrid(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.faint
      ..strokeWidth = 1;
    for (var i = 1; i < 4; i++) {
      final y = size.height * i / 4;
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }

  void _paintPie(Canvas canvas, Size size, {required bool donut}) {
    final total = data.fold<double>(0, (sum, point) => sum + point.value);
    final side = min(size.width, size.height);
    final rect = Rect.fromCenter(center: Offset(size.width / 2, size.height / 2), width: side * .78, height: side * .78);
    var start = -pi / 2;
    for (var i = 0; i < data.length; i++) {
      final sweep = total == 0 ? 0.0 : (data[i].value / total) * pi * 2;
      canvas.drawArc(rect, start, sweep, true, Paint()..color = colors[i % colors.length]);
      start += sweep;
    }
    if (donut) {
      canvas.drawCircle(Offset(size.width / 2, size.height / 2), side * .23, Paint()..color = AppColors.surface);
    }
  }

  void _paintLine(Canvas canvas, Size size) {
    _paintGrid(canvas, size);
    final maxValue = data.map((e) => e.value).reduce(max);
    final path = Path();
    for (var i = 0; i < data.length; i++) {
      final x = data.length == 1 ? size.width / 2 : i * size.width / (data.length - 1);
      final y = size.height - ((data[i].value / maxValue) * (size.height - 18)) - 8;
      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
      canvas.drawCircle(Offset(x, y), 3, Paint()..color = colors.first);
    }
    canvas.drawPath(
      path,
      Paint()
        ..color = colors.first
        ..strokeWidth = 3
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round,
    );
  }

  void _paintBars(Canvas canvas, Size size, {required bool stacked}) {
    _paintGrid(canvas, size);
    final maxValue = data.map((e) => stacked ? e.value + e.secondary + e.third : e.value).reduce(max);
    final slot = size.width / data.length;
    final barWidth = min(34.0, slot * .48);
    for (var i = 0; i < data.length; i++) {
      var bottom = size.height;
      final values = stacked ? [data[i].value, data[i].secondary, data[i].third] : [data[i].value];
      for (var j = 0; j < values.length; j++) {
        if (values[j] <= 0) continue;
        final height = (values[j] / maxValue) * (size.height - 12);
        final rect = RRect.fromRectAndRadius(
          Rect.fromLTWH((slot * i) + (slot - barWidth) / 2, bottom - height, barWidth, height),
          const Radius.circular(8),
        );
        canvas.drawRRect(rect, Paint()..color = colors[j % colors.length]);
        bottom -= height;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _ChartPainter oldDelegate) => oldDelegate.kind != kind || oldDelegate.data != data;
}
