import 'package:flutter/material.dart';

void main() { runApp(const PayQuickPayApp()); }

class PayQuickPayApp extends StatelessWidget {
  const PayQuickPayApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PayQuickPay',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue, useMaterial3: true),
      home: const RechargeHome(),
    );
  }
}

class RechargeHome extends StatefulWidget {
  const RechargeHome({super.key});
  @override
  State<RechargeHome> createState() => _RechargeHomeState();
}

class _RechargeHomeState extends State<RechargeHome> {
  final _mobileController = TextEditingController();
  String _selectedOperator = 'Jio';
  int _selectedPlan = 299;

  final List<int> plans = [19, 149, 199, 299, 399, 719, 899];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(title: const Text('PayQuickPay'), backgroundColor: Colors.blue, foregroundColor: Colors.white, centerTitle: true),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Wallet Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: Colors.blue, borderRadius: BorderRadius.circular(16)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Wallet Balance', style: TextStyle(color: Colors.white70)),
                      SizedBox(height: 5),
                      Text('₹ 1,250.00', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  ElevatedButton(onPressed: () {}, child: const Text('Add Money')),
                ],
              ),
            ),
            const SizedBox(height: 20),
            // Services
            const Text('Recharge & Bill Pay', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _serviceIcon(Icons.phone_android, 'Mobile'),
                _serviceIcon(Icons.live_tv, 'DTH'),
                _serviceIcon(Icons.lightbulb, 'Electricity'),
                _serviceIcon(Icons.directions_car, 'FASTag'),
              ],
            ),
            const SizedBox(height: 20),
            // Mobile Input
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextField(
                    controller: _mobileController,
                    keyboardType: TextInputType.phone,
                    decoration: const InputDecoration(labelText: 'Enter Mobile Number', prefixText: '+91 ', border: OutlineInputBorder()),
                    maxLength: 10,
                  ),
                  const SizedBox(height: 10),
                  DropdownButtonFormField(
                    value: _selectedOperator,
                    items: ['Jio', 'Airtel', 'Vi', 'BSNL'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                    onChanged: (v) => setState(() => _selectedOperator = v!),
                    decoration: const InputDecoration(labelText: 'Operator', border: OutlineInputBorder()),
                  ),
                  const SizedBox(height: 20),
                  const Text('Popular Plans', style: TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: plans.map((plan) {
                      bool selected = _selectedPlan == plan;
                      return GestureDetector(
                        onTap: () => setState(() => _selectedPlan = plan),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                          decoration: BoxDecoration(
                            color: selected? Colors.blue : Colors.white,
                            border: Border.all(color: Colors.blue),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text('₹$plan', style: TextStyle(color: selected? Colors.white : Colors.blue, fontWeight: FontWeight.bold)),
                        ),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.blue, foregroundColor: Colors.white, padding: const EdgeInsets.all(15)),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('₹$_selectedPlan Recharge for ${_mobileController.text} - $_selectedOperator - Success!')));
                      },
                      child: Text('Recharge Now - ₹$_selectedPlan', style: const TextStyle(fontSize: 16)),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Text('Recent Recharges', style: TextStyle(fontWeight: FontWeight.bold)),
            const ListTile(leading: Icon(Icons.history), title: Text('9178XXXXXX - ₹299'), subtitle: Text('Jio - Today'), trailing: Text('Success', style: TextStyle(color: Colors.green))),
            const ListTile(leading: Icon(Icons.history), title: Text('DTH - 123456789 - ₹350'), subtitle: Text('Tata Play - Yesterday'), trailing: Text('Success', style: TextStyle(color: Colors.green))),
          ],
        ),
      ),
    );
  }

  Widget _serviceIcon(IconData icon, String label) {
    return Column(
      children: [
        Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: Colors.blue.shade100, borderRadius: BorderRadius.circular(10)), child: Icon(icon, color: Colors.blue)),
        const SizedBox(height: 5),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }
}
