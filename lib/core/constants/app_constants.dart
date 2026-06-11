import 'package:flutter/material.dart';

enum AppModule {
  dashboard,
  subscriptions,
  emi,
  utilities,
  groceries,
}

class AppSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 20;
  static const double xxl = 24;
  static const double section = 32;
}

class AppRadius {
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 24;
  static const double hero = 28;
}

class ModulePalette {
  const ModulePalette({
    required this.accent,
    required this.accentDark,
    required this.soft,
    required this.heroStart,
    required this.heroEnd,
  });

  final Color accent;
  final Color accentDark;
  final Color soft;
  final Color heroStart;
  final Color heroEnd;
}

class AppColors {
  static const Color canvas = Color(0xFFF8FAFC);
  static const Color surface = Colors.white;
  static const Color ink = Color(0xFF111827);
  static const Color muted = Color(0xFF6B7280);
  static const Color faint = Color(0xFFE5E7EB);
  static const Color danger = Color(0xFFDC2626);
  static const Color success = Color(0xFF16A34A);
  static const Color warning = Color(0xFFF59E0B);

  static const Map<AppModule, ModulePalette> modules = {
    AppModule.dashboard: ModulePalette(
      accent: Color(0xFF374151),
      accentDark: Color(0xFF111827),
      soft: Color(0xFFF3F4F6),
      heroStart: Color(0xFF4B5563),
      heroEnd: Color(0xFF1F2937),
    ),
    AppModule.subscriptions: ModulePalette(
      accent: Color(0xFF7C3AED),
      accentDark: Color(0xFF4F46E5),
      soft: Color(0xFFF3E8FF),
      heroStart: Color(0xFF8B5CF6),
      heroEnd: Color(0xFF4F46E5),
    ),
    AppModule.emi: ModulePalette(
      accent: Color(0xFF2563EB),
      accentDark: Color(0xFF1D4ED8),
      soft: Color(0xFFDBEAFE),
      heroStart: Color(0xFF2563EB),
      heroEnd: Color(0xFF1E40AF),
    ),
    AppModule.utilities: ModulePalette(
      accent: Color(0xFFF59E0B),
      accentDark: Color(0xFFEA580C),
      soft: Color(0xFFFEF3C7),
      heroStart: Color(0xFFF59E0B),
      heroEnd: Color(0xFFEA580C),
    ),
    AppModule.groceries: ModulePalette(
      accent: Color(0xFF16A34A),
      accentDark: Color(0xFF15803D),
      soft: Color(0xFFDCFCE7),
      heroStart: Color(0xFF22C55E),
      heroEnd: Color(0xFF16A34A),
    ),
  };

  static ModulePalette palette(AppModule module) => modules[module]!;
}

String money(num value, {bool compact = false}) {
  if (compact && value.abs() >= 100000) {
    return '₹${(value / 100000).toStringAsFixed(1)}L';
  }
  final rounded = value.round().toString();
  final buffer = StringBuffer();
  var count = 0;
  for (var i = rounded.length - 1; i >= 0; i--) {
    buffer.write(rounded[i]);
    count++;
    if (i != 0 && (count == 3 || (count > 3 && (count - 3) % 2 == 0))) {
      buffer.write(',');
    }
  }
  return '₹${buffer.toString().split('').reversed.join()}';
}
