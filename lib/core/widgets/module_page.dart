import 'package:flutter/material.dart';

import '../constants/app_constants.dart';
import 'components.dart';
import 'module_hero_card.dart';

class ModuleTabbedPage extends StatelessWidget {
  const ModuleTabbedPage({
    super.key,
    required this.module,
    required this.onMenu,
    required this.title,
    required this.subtitle,
    required this.tabs,
    required this.tab,
    required this.childrenBuilder,
    this.floating,
  });

  final AppModule module;
  final VoidCallback onMenu;
  final String title;
  final String subtitle;
  final List<String> tabs;
  final ValueNotifier<int> tab;
  final List<Widget> Function(int tab) childrenBuilder;
  final Widget? floating;

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<int>(
      valueListenable: tab,
      builder: (context, activeTab, _) {
        final children = childrenBuilder(activeTab);
        return Stack(
          children: [
            Column(
              children: [
                ModuleHeroCard(
                  module: module,
                  title: title,
                  subtitle: subtitle,
                  onMenu: onMenu,
                  tabs: tabs,
                  activeTab: activeTab,
                  onTabChanged: (index) => tab.value = index,
                ),
                Expanded(
                  child: ListView.separated(
                    key: PageStorageKey('$module-$activeTab'),
                    padding: const EdgeInsets.fromLTRB(16, 20, 16, 96),
                    itemBuilder: (context, index) => AnimatedEntry(delay: index * 30, child: children[index]),
                    separatorBuilder: (_, _) => const SizedBox(height: AppSpacing.xl),
                    itemCount: children.length,
                  ),
                ),
              ],
            ),
            if (floating != null) Positioned(right: 20, bottom: 20, child: floating!),
          ],
        );
      },
    );
  }
}
