import 'package:flutter/material.dart';

void main() => runApp(const PayQuickPayApp());

class PayQuickPayApp extends StatelessWidget {
  const PayQuickPayApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'PayQuickPay Business',
      theme: ThemeData(useMaterial3: true, primarySwatch: Colors.blue),
      home: const LoginScreen(),
    );
  }
}

// 1. LOGIN SCREEN - RETAILER ID
class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.account_balance_wallet, size: 80, color: Colors.blue),
            const SizedBox(height: 20),
            const Text('PayQuickPay Business', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const Text('Retailer / Distributor Login', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 30),
            const TextField(decoration: InputDecoration(labelText: 'Retailer ID / Mobile', border: OutlineInputBorder(), prefixIcon: Icon(Icons.person))),
            const SizedBox(height: 15),
            const TextField(obscureText: true, decoration: InputDecoration(labelText: 'Password', border: OutlineInputBorder(), prefixIcon: Icon(Icons.lock))),
            const SizedBox(height: 20),
            SizedBox(width: double.infinity, child: ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: Colors.blue, foregroundColor: Colors.white, padding: const EdgeInsets.all(15)), onPressed: () { Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const BusinessHome())); }, child: const Text('LOGIN'))),
            const SizedBox(height: 10),
            const Text('Support: 91XXXXXXXX | Refund in 2 Hours if Failed', style: TextStyle(fontSize: 11, color: Colors.grey), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}

// 2. BUSINESS HOME
class BusinessHome extends StatefulWidget {
  const BusinessHome({super.key});
  @override
  State<BusinessHome> createState() => _BusinessHomeState();
}

class _BusinessHomeState extends State<BusinessHome> {
  double wallet = 1250.0;
  final List<Map<String, dynamic>> history = [
    {'no': '9178XXXX01', 'amt': 299, 'op': 'Jio', 'status': 'Success', 'id': 'TXN12345'},
    {'no': 'DTH 12345', 'amt': 350, 'op': 'TataPlay', 'status': 'Failed', 'id': 'TXN12344'},
  ];

  void _recharge(String number, int amt, String op) {
    setState(() {
      if (wallet >= amt) {
        wallet -= amt;
        history.insert(0, {'no': number, 'amt': amt, 'op': op, 'status': 'Success', 'id': 'TXN${DateTime.now().millisecondsSinceEpoch}'});
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('PayQuickPay'),
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
          bottom: const TabBar(tabs: [Tab(text: 'Recharge'), Tab(text: 'History'), Tab(text: 'Support')]),
        ),
        body: TabBarView(children: [
          // TAB 1 - RECHARGE
          SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: Colors.blue, borderRadius: BorderRadius.circular(12)),
                child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  Column(crossAxisAlignment: CrossAxisAlignment.start, children: [const Text('Wallet Balance', style: TextStyle(color: Colors.white70)), Text('₹ ${wallet.toStringAsFixed(2)}', style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold))]),
                  ElevatedButton(onPressed: () { setState(() => wallet += 1000); }, child: const Text('Add ₹1000')),
                ]),
              ),
              const SizedBox(height: 20),
              const RechargeForm(),
            ]),
          ),
          // TAB 2 - HISTORY - SAFE
          ListView.builder(
            itemCount: history.length,
            itemBuilder: (_, i) {
              var h = history[i];
              return Card(
                child: ListTile(
                  title: Text('${h['no']} - ₹${h['amt']}'),
                  subtitle: Text('${h['op']} | ID: ${h['id']} | ${h['status'] == 'Success'? 'Commission: ₹${(h['amt']*0.02).toStringAsFixed(2)}' : 'Refund: Will credit in 2Hrs'}'),
                  trailing: Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: h['status'] == 'Success'? Colors.green : Colors.red, borderRadius: BorderRadius.circular(4)), child: Text(h['status'], style: const TextStyle(color: Colors.white, fontSize: 12))),
                ),
              );
            },
          ),
          // TAB 3 - SUPPORT - NO COMPLAINT RISK
          const Padding(
            padding: EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('Safe Business Policy', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              SizedBox(height: 10),
              Text('1. Recharge fail hele 2 ghanta bhitare wallet re paisa feriba.\n\n2. Har transaction re Transaction ID miliba - Proof.\n\n3. Bill Fetch heba pare hi pay kariba - Bhul amount haba nahi.\n\n4. Customer ku receipt share karipariba.\n\n5. Support: Raise Complaint -> Admin dekhba.'),
              SizedBox(height: 20),
              Card(child: ListTile(leading: Icon(Icons.support_agent), title: Text('Raise Complaint'), subtitle: Text('TXN ID deiki complaint karantu'))),
              Card(child: ListTile(leading: Icon(Icons.receipt), title: Text('Refund Policy'), subtitle: Text('100% Safe - Auto Refund'))),
            ]),
          ),
        ]),
      ),
    );
  }
}

class RechargeForm extends StatefulWidget {
  const RechargeForm({super.key});
  @override
  State<RechargeForm> createState() => _RechargeFormState();
}

class _RechargeFormState extends State<RechargeForm> {
  final _num = TextEditingController();
  String _op = 'Jio';
  int _amt = 299;
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 5)]),
      child: Column(children: [
        TextField(controller: _num, keyboardType: TextInputType.phone, decoration: const InputDecoration(labelText: 'Mobile / DTH No / Consumer No', border: OutlineInputBorder())),
        const SizedBox(height: 10),
        DropdownButtonFormField(value: _op, items: ['Jio', 'Airtel', 'Vi', 'BSNL', 'TataPlay', 'Electricity - TPCODL'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(), onChanged: (v) => setState(() => _op = v!), decoration: const InputDecoration(labelText: 'Operator / Biller', border: OutlineInputBorder())),
        const SizedBox(height: 10),
        Wrap(spacing: 8, children: [19, 149, 199, 299, 399, 719].map((p) => ChoiceChip(label: Text('₹$p'), selected: amt == p, onSelected: () => setState(() => _amt = p))).toList()),
        const SizedBox(height: 15),
        SizedBox(width: double.infinity, child: ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: Colors.blue, foregroundColor: Colors.white, padding: const EdgeInsets.all(15)), onPressed: () { if (_num.text.length > 5) { ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Recharge Initiated - ID: TXN${DateTime.now().millisecond} - Checking with BBPS...'))); } }, child: Text('Pay ₹$_amt - Safe & Secure'))),
        const SizedBox(height: 8),
        const Text('✓ BBPS Verified | ✓ Instant Refund if Failed | ✓ Receipt will Generate', style: TextStyle(fontSize: 10, color: Colors.green)),
      ]),
    );
  }
}
