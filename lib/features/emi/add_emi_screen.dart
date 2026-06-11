import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../core/constants/app_constants.dart';
import '../../core/widgets/app_card.dart';

class AddEmiScreen extends StatefulWidget {
  const AddEmiScreen({super.key});

  @override
  State<AddEmiScreen> createState() => _AddEmiScreenState();
}

class _AddEmiScreenState extends State<AddEmiScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _lenderController = TextEditingController();
  final _totalController = TextEditingController();
  final _rateController = TextEditingController();
  final _emiController = TextEditingController();
  final _downPaymentController = TextEditingController();
  final _dueDayController = TextEditingController(text: '5');

  String _loanType = 'Home Loan';
  DateTime? _startDate;
  DateTime? _endDate;
  bool _reminderEnabled = true;
  int _reminderDaysBefore = 3;

  @override
  void dispose() {
    _nameController.dispose();
    _lenderController.dispose();
    _totalController.dispose();
    _rateController.dispose();
    _emiController.dispose();
    _downPaymentController.dispose();
    _dueDayController.dispose();
    super.dispose();
  }

  Future<void> _selectDate(bool isStartDate) async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: AppColors.palette(AppModule.emi).accent,
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
        if (isStartDate) {
          _startDate = picked;
        } else {
          _endDate = picked;
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final palette = AppColors.palette(AppModule.emi);
    final dateFormat = DateFormat('dd MMM yyyy');

    return Scaffold(
      backgroundColor: AppColors.canvas,
      appBar: AppBar(
        title: Text(
          'Add EMI',
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
              // Basic Details
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Basic Details',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: palette.accentDark,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _nameController,
                      style: const TextStyle(fontWeight: FontWeight.w600),
                      decoration: const InputDecoration(
                        labelText: 'EMI Name *',
                        hintText: 'e.g. Home Loan, Car EMI',
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Please enter EMI name';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: AppSpacing.md),
                    DropdownButtonFormField<String>(
                      initialValue: _loanType,
                      decoration: const InputDecoration(
                        labelText: 'Loan Type *',
                      ),
                      items:
                          [
                                'Home Loan',
                                'Car Loan',
                                'Bike Loan',
                                'Personal Loan',
                                'Credit EMI',
                              ]
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
                        if (val != null) setState(() => _loanType = val);
                      },
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _lenderController,
                      style: const TextStyle(fontWeight: FontWeight.w600),
                      decoration: const InputDecoration(
                        labelText: 'Lender *',
                        hintText: 'e.g. HDFC Bank, SBI',
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Please enter lender name';
                        }
                        return null;
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Financial Details
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Financial Details',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: palette.accentDark,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _totalController,
                      keyboardType: TextInputType.number,
                      style: const TextStyle(fontWeight: FontWeight.w700),
                      decoration: const InputDecoration(
                        labelText: 'Total Loan Amount *',
                        prefixText: '₹ ',
                        hintText: '0',
                      ),
                      validator: (value) {
                        if (value == null || double.tryParse(value) == null) {
                          return 'Please enter total loan amount';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _rateController,
                      keyboardType: const TextInputType.numberWithOptions(
                        decimal: true,
                      ),
                      style: const TextStyle(fontWeight: FontWeight.w700),
                      decoration: const InputDecoration(
                        labelText: 'Interest Rate (%) *',
                        suffixText: '%',
                        hintText: '8.5',
                      ),
                      validator: (value) {
                        if (value == null || double.tryParse(value) == null) {
                          return 'Please enter interest rate';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _emiController,
                      keyboardType: TextInputType.number,
                      style: const TextStyle(fontWeight: FontWeight.w700),
                      decoration: const InputDecoration(
                        labelText: 'Monthly EMI *',
                        prefixText: '₹ ',
                        hintText: '0',
                      ),
                      validator: (value) {
                        if (value == null || double.tryParse(value) == null) {
                          return 'Please enter monthly EMI amount';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _downPaymentController,
                      keyboardType: TextInputType.number,
                      style: const TextStyle(fontWeight: FontWeight.w700),
                      decoration: const InputDecoration(
                        labelText: 'Down Payment',
                        prefixText: '₹ ',
                        hintText: '0',
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Timeline Section
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Timeline',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: palette.accentDark,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    InkWell(
                      onTap: () => _selectDate(true),
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
                              ? dateFormat.format(_startDate!)
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
                    InkWell(
                      onTap: () => _selectDate(false),
                      borderRadius: BorderRadius.circular(AppRadius.md),
                      child: InputDecorator(
                        decoration: const InputDecoration(
                          labelText: 'End Date *',
                          suffixIcon: Icon(
                            Icons.calendar_today_outlined,
                            size: 20,
                          ),
                        ),
                        child: Text(
                          _endDate != null
                              ? dateFormat.format(_endDate!)
                              : 'Select end date',
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: _endDate != null
                                ? AppColors.ink
                                : AppColors.muted,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      controller: _dueDayController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'Due Day (1-31) *',
                        hintText: '5',
                      ),
                      validator: (value) {
                        final valInt = int.tryParse(value ?? '');
                        if (valInt == null || valInt < 1 || valInt > 31) {
                          return 'Please enter a valid due day (1-31)';
                        }
                        return null;
                      },
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
                          'Enable Reminders',
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 15,
                          ),
                        ),
                        Switch.adaptive(
                          value: _reminderEnabled,
                          activeThumbColor: palette.accent,
                          onChanged: (val) =>
                              setState(() => _reminderEnabled = val),
                        ),
                      ],
                    ),
                    if (_reminderEnabled) ...[
                      const SizedBox(height: AppSpacing.md),
                      DropdownButtonFormField<int>(
                        initialValue: _reminderDaysBefore,
                        decoration: const InputDecoration(
                          labelText: 'Reminder Days Before',
                        ),
                        items: [1, 2, 3, 5, 7]
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
                          if (val != null) {
                            setState(() => _reminderDaysBefore = val);
                          }
                        },
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.xl),

              // Submit Button
              FilledButton(
                onPressed: () {
                  if (_formKey.currentState!.validate() &&
                      _startDate != null &&
                      _endDate != null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          'Saved ${_nameController.text} EMI successfully!',
                        ),
                        backgroundColor: AppColors.success,
                      ),
                    );
                    Navigator.pop(context);
                  } else if (_startDate == null || _endDate == null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text(
                          'Please specify both Start and End Dates.',
                        ),
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
                  'Add EMI',
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
