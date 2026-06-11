import 'package:flutter/material.dart';

import '../constants/app_constants.dart';

class AppTheme {
  static ThemeData light() {
    const textTheme = TextTheme(
      displaySmall: TextStyle(fontSize: 36, fontWeight: FontWeight.w800, height: 1.1),
      headlineMedium: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, height: 1.15),
      titleLarge: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, height: 1.25),
      titleMedium: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, height: 1.35),
      bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w500, height: 1.45),
      bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, height: 1.45),
      bodySmall: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, height: 1.35),
      labelLarge: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, height: 1.2),
      labelSmall: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, height: 1.2),
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.modules[AppModule.subscriptions]!.accent,
        brightness: Brightness.light,
        surface: AppColors.surface,
      ),
      scaffoldBackgroundColor: AppColors.canvas,
      fontFamily: 'Roboto',
      textTheme: textTheme.apply(bodyColor: AppColors.ink, displayColor: AppColors.ink),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.canvas,
        elevation: 0,
        foregroundColor: AppColors.ink,
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        color: AppColors.surface,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadius.lg)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFFF3F4F6),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          borderSide: BorderSide.none,
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
    );
  }
}
