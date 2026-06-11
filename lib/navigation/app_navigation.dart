import 'package:flutter/material.dart';

import '../core/constants/app_constants.dart';
import '../features/dashboard/dashboard_screen.dart';
import '../features/emi/emi_screen.dart';
import '../features/groceries/groceries_screen.dart';
import '../features/subscriptions/subscriptions_screen.dart';
import '../features/utilities/utilities_screen.dart';

class AppNavigationShell extends StatefulWidget {
  const AppNavigationShell({super.key});

  static AppNavigationShellState? of(BuildContext context) {
    return context.findAncestorStateOfType<AppNavigationShellState>();
  }

  @override
  State<AppNavigationShell> createState() => AppNavigationShellState();
}

class AppNavigationShellState extends State<AppNavigationShell> {
  final ValueNotifier<AppModule> _module = ValueNotifier(AppModule.dashboard);

  void setModule(AppModule module) {
    _module.value = module;
  }

  @override
  void dispose() {
    _module.dispose();
    super.dispose();
  }

  void _openDrawer() {
    Scaffold.of(context).openDrawer();
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<AppModule>(
      valueListenable: _module,
      builder: (context, active, _) {
        return Scaffold(
          drawer: AppSidebar(
            active: active,
            onSelect: (module) {
              _module.value = module;
              Navigator.of(context).pop();
            },
          ),
          body: IndexedStack(
            index: AppModule.values.indexOf(active),
            children: [
              DashboardScreen(onMenu: _openDrawer),
              SubscriptionsScreen(onMenu: _openDrawer),
              EmiScreen(onMenu: _openDrawer),
              UtilitiesScreen(onMenu: _openDrawer),
              GroceriesScreen(onMenu: _openDrawer),
            ],
          ),
        );
      },
    );
  }
}

class AppSidebar extends StatelessWidget {
  const AppSidebar({super.key, required this.active, required this.onSelect});

  final AppModule active;
  final ValueChanged<AppModule> onSelect;

  static const _items = [
    (AppModule.dashboard, Icons.home_filled, 'Dashboard'),
    (AppModule.subscriptions, Icons.notifications_active_outlined, 'Subscriptions'),
    (AppModule.emi, Icons.credit_card, 'EMI'),
    (AppModule.utilities, Icons.bolt_outlined, 'Utilities'),
    (AppModule.groceries, Icons.shopping_cart_outlined, 'Groceries'),
  ];

  @override
  Widget build(BuildContext context) {
    return Drawer(
      width: 288,
      backgroundColor: Colors.white,
      child: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(AppSpacing.xxl),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        width: 56,
                        height: 56,
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(colors: [Color(0xFF3B82F6), Color(0xFF8B5CF6)]),
                          borderRadius: BorderRadius.circular(28),
                        ),
                        child: const Center(child: Text('S', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800))),
                      ),
                      IconButton(onPressed: () => Navigator.of(context).pop(), icon: const Icon(Icons.close)),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Text('Sai Kiran', style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    'Recurring spending stable this month.',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.muted),
                  ),
                ],
              ),
            ),
            const Divider(height: 1),
            Padding(
              padding: const EdgeInsets.all(AppSpacing.md),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'MODULES',
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(color: AppColors.muted, letterSpacing: .8),
                ),
              ),
            ),
            ..._items.map((item) => _SidebarTile(
                  icon: item.$2,
                  label: item.$3,
                  selected: active == item.$1,
                  accent: AppColors.palette(item.$1).accent,
                  onTap: () => onSelect(item.$1),
                )),
            const Spacer(),
            const Divider(height: 1),
            _SidebarTile(icon: Icons.settings_outlined, label: 'Settings', selected: false, accent: AppColors.ink, onTap: () {}),
            _SidebarTile(icon: Icons.logout, label: 'Logout', selected: false, accent: AppColors.danger, onTap: () {}),
            const SizedBox(height: AppSpacing.lg),
          ],
        ),
      ),
    );
  }
}

class _SidebarTile extends StatelessWidget {
  const _SidebarTile({required this.icon, required this.label, required this.selected, required this.accent, required this.onTap});

  final IconData icon;
  final String label;
  final bool selected;
  final Color accent;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 3),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadius.md),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg, vertical: AppSpacing.md),
          decoration: BoxDecoration(
            color: selected ? accent.withValues(alpha: .10) : Colors.transparent,
            borderRadius: BorderRadius.circular(AppRadius.md),
          ),
          child: Row(
            children: [
              Icon(icon, color: selected ? accent : AppColors.muted, size: 21),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Text(
                  label,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: selected ? accent : AppColors.ink,
                        fontWeight: selected ? FontWeight.w800 : FontWeight.w600,
                      ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
