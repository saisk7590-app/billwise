import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../core/widgets/app_card.dart';

class AddSubscriptionScreen extends StatefulWidget {
  const AddSubscriptionScreen({super.key});

  @override
  State<AddSubscriptionScreen> createState() => _AddSubscriptionScreenState();
}

class _AddSubscriptionScreenState extends State<AddSubscriptionScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _priceController = TextEditingController();
  final _remarkController = TextEditingController();
  final _durationController = TextEditingController(text: '30');

  String _category = 'OTT';
  String _billingType = 'Monthly';
  DateTime? _startDate;
  DateTime? _nextDueDate;
  bool _reminderEnabled = true;
  int _reminderDays = 3;

  @override
  void dispose() {
    _nameController.dispose();
    _priceController.dispose();
    _remarkController.dispose();
    _durationController.dispose();
    super.dispose();
  }

  void _calculateNextDueDate() {
    if (_startDate == null) {
      setState(() {
        _nextDueDate = null;
      });
      return;
    }

    final start = _startDate!;
    DateTime due;
    if (_billingType == 'Monthly') {
      due = DateTime(start.year, start.month + 1, start.day);
    } else if (_billingType == 'Yearly') {
      due = DateTime(start.year + 1, start.month, start.day);
    } else {
      // Custom duration
      final days = int.tryParse(_durationController.text) ?? 30;
      due = start.add(Duration(days: days));
    }

    setState(() {
      _nextDueDate = due;
    });
  }

  Future<void> _selectStartDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _startDate ?? DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2100),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: AppColors.palette(AppModule.subscriptions).accent,
              onPrimary: Colors.white,
              onSurface: AppColors.ink,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null) {
      setState(() {
        _startDate = picked;
      });
      _calculateNextDueDate();
    }
  }

  String _formatDate(DateTime? date) {
    if (date == null) return '';
    final months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return "${date.day.toString().padLeft(2, '0')} ${months[date.month - 1]} ${date.year}";
  }

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(AppModule.subscriptions);

    return Scaffold(
      backgroundColor: AppColors.canvas,
      appBar: AppBar(
        title: Text(
          'Add Subscription',
          style: Theme.of(
            context,
          ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(color: AppColors.faint, height: 1),
        ),
      ),
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: ListView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            children: [
              // Basic Information Section
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Basic Information',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: palette.accentDark,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _nameController,
                      style: const TextStyle(fontWeight: FontWeight.w600),
                      decoration: const InputDecoration(
                        labelText: 'Service Name *',
                        hintText: 'e.g. Netflix, Spotify',
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Please enter service name';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: AppSpacing.md),
                    DropdownButtonFormField<String>(
                      initialValue: _category,
                      decoration: const InputDecoration(
                        labelText: 'Category *',
                      ),
                      items:
                          [
                                'OTT',
                                'Mobile',
                                'Internet',
                                'Software',
                                'Cloud Storage',
                                'Gaming',
                              ]
                              .map(
                                (cat) => DropdownMenuItem(
                                  value: cat,
                                  child: Text(
                                    cat,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                              )
                              .toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _category = val);
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Billing Details Section
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Billing Details',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: palette.accentDark,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _priceController,
                      keyboardType: TextInputType.number,
                      style: const TextStyle(fontWeight: FontWeight.w700),
                      decoration: const InputDecoration(
                        labelText: 'Price (₹) *',
                        prefixText: '₹ ',
                        hintText: '0',
                      ),
                      validator: (value) {
                        if (value == null || double.tryParse(value) == null) {
                          return 'Please enter a valid price';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: AppSpacing.md),
                    DropdownButtonFormField<String>(
                      initialValue: _billingType,
                      decoration: const InputDecoration(
                        labelText: 'Billing Type',
                      ),
                      items: ['Monthly', 'Yearly', 'Custom']
                          .map(
                            (type) => DropdownMenuItem(
                              value: type,
                              child: Text(
                                type,
                                style: const TextStyle(
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          )
                          .toList(),
                      onChanged: (val) {
                        if (val != null) {
                          setState(() => _billingType = val);
                          _calculateNextDueDate();
                        }
                      },
                    ),
                    if (_billingType == 'Custom') ...[
                      const SizedBox(height: AppSpacing.md),
                      TextFormField(
                        controller: _durationController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Duration (days) *',
                          hintText: '30',
                        ),
                        onChanged: (_) => _calculateNextDueDate(),
                        validator: (value) {
                          if (_billingType == 'Custom' &&
                              (value == null || int.tryParse(value) == null)) {
                            return 'Please enter duration in days';
                          }
                          return null;
                        },
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Date Information Section
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Date Information',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: palette.accentDark,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    InkWell(
                      onTap: _selectStartDate,
                      borderRadius: BorderRadius.circular(AppRadius.md),
                      child: InputDecorator(
                        decoration: const InputDecoration(
                          labelText: 'Start Date *',
                          suffixIcon: Icon(
                            Icons.calendar_today_outlined,
                            size: 20,
                          ),
                        ),
                        child: Text(
                          _startDate != null
                              ? _formatDate(_startDate!)
                              : 'Select start date',
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: _startDate != null
                                ? AppColors.ink
                                : AppColors.muted,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    InputDecorator(
                      decoration: const InputDecoration(
                        labelText: 'Next Due Date (Auto-calculated)',
                        filled: true,
                        fillColor: Color(0xFFF3F4F6),
                        suffixIcon: Icon(
                          Icons.lock_outline,
                          size: 18,
                          color: AppColors.muted,
                        ),
                      ),
                      child: Text(
                        _nextDueDate != null
                            ? _formatDate(_nextDueDate!)
                            : 'Select start date first',
                        style: const TextStyle(
                          fontWeight: FontWeight.w600,
                          color: AppColors.muted,
                        ),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    const Text(
                      'Calculated automatically based on start date and billing frequency.',
                      style: TextStyle(fontSize: 11, color: AppColors.muted),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Additional Info Section
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Additional Info',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: palette.accentDark,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _remarkController,
                      maxLines: 3,
                      decoration: const InputDecoration(
                        labelText: 'Remark',
                        hintText: 'e.g. Premium Plan, Family tier...',
                        alignLabelWithHint: true,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Reminder Settings Section
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Reminder Settings',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: palette.accentDark,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Enable Reminder',
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 15,
                          ),
                        ),
                        Switch.adaptive(
                          value: _reminderEnabled,
                          activeThumbColor: Colors.white,
                          activeTrackColor: palette.accent,
                          onChanged: (val) =>
                              setState(() => _reminderEnabled = val),
                        ),
                      ],
                    ),
                    if (_reminderEnabled) ...[
                      const SizedBox(height: AppSpacing.md),
                      DropdownButtonFormField<int>(
                        initialValue: _reminderDays,
                        decoration: const InputDecoration(
                          labelText: 'Remind me before',
                        ),
                        items: [3, 5, 7]
                            .map(
                              (days) => DropdownMenuItem(
                                value: days,
                                child: Text(
                                  '$days days prior',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            )
                            .toList(),
                        onChanged: (val) {
                          if (val != null) setState(() => _reminderDays = val);
                        },
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.xl),

              // Save Button
              FilledButton(
                onPressed: () {
                  if (_formKey.currentState!.validate() && _startDate != null) {
                    // Success logic
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          'Saved ${_nameController.text} subscription successfully!',
                        ),
                        backgroundColor: AppColors.success,
                      ),
                    );
                    Navigator.pop(context);
                  } else if (_startDate == null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Please select a start date.'),
                        backgroundColor: AppColors.danger,
                      ),
                    );
                  }
                },
                style: FilledButton.styleFrom(
                  backgroundColor: palette.accent,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(AppRadius.md),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text(
                  'Save Subscription',
                  style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
