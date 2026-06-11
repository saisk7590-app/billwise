import 'package:flutter/material.dart';

import '../constants/app_constants.dart';

class ModuleHeroCard extends StatelessWidget {
  const ModuleHeroCard({
    super.key,
    required this.module,
    required this.title,
    required this.subtitle,
    required this.onMenu,
    this.tabs,
    this.activeTab,
    this.onTabChanged,
  });

  final AppModule module;
  final String title;
  final String subtitle;
  final VoidCallback onMenu;
  final List<String>? tabs;
  final int? activeTab;
  final ValueChanged<int>? onTabChanged;

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(module);
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 34, 20, 22),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [palette.heroStart, palette.heroEnd],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(AppRadius.hero)),
      ),
      child: SafeArea(
        bottom: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                IconButton(
                  onPressed: onMenu,
                  icon: const Icon(Icons.menu, color: Colors.white),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.white.withValues(alpha: .12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadius.sm)),
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: Text(
                    title,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(left: 58, top: AppSpacing.xs),
              child: Text(
                subtitle,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white.withValues(alpha: .78)),
              ),
            ),
            if (tabs != null && tabs!.isNotEmpty) ...[
              const SizedBox(height: AppSpacing.xl),
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: .15),
                  borderRadius: BorderRadius.circular(AppRadius.md),
                ),
                child: Row(
                  children: List.generate(tabs!.length, (index) {
                    final selected = index == activeTab;
                    return Expanded(
                      child: InkWell(
                        onTap: () => onTabChanged?.call(index),
                        borderRadius: BorderRadius.circular(AppRadius.sm),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 180),
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            color: selected ? Colors.white : Colors.transparent,
                            borderRadius: BorderRadius.circular(AppRadius.sm),
                            boxShadow: selected
                                ? const [BoxShadow(color: Color(0x1A111827), blurRadius: 12, offset: Offset(0, 4))]
                                : null,
                          ),
                          child: Text(
                            tabs![index],
                            textAlign: TextAlign.center,
                            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                  color: selected ? palette.accentDark : Colors.white,
                                ),
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
