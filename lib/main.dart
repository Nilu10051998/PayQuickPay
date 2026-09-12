import 'package:flutter/material.dart';
void main() => runApp(const PayQuickPayApp());
class PayQuickPayApp extends StatelessWidget {
  const PayQuickPayApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(debugShowCheckedModeBanner: false, title: 'PayQuickPay', theme: ThemeData(primarySwatch: Colors.blue, fontFamily: 'Roboto'), home: const LoginScreen());
  }
}
class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});
  @override
  Widget build(BuildContext context) {
    final id = TextEditingController();
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: LinearGradient(colors: [Color(0xFF0D47A1), Color(0xFF1976D2)], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
        child: Center(
          child: SingleChildScrollView(padding: const EdgeInsets.all(24), child: Column(children: [
            Container(padding: const EdgeInsets.all(20), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(100)), child: const Icon(Icons.flash_on, size: 60, color: Color(0xFF0D47A1))),
            const SizedBox(height: 15),
            const Text('PayQuickPay', style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold, letterSpacing: 1)),
            const Text('Retailer Business App', style: TextStyle(color: Colors.white70, fontSize: 14)),
            const SizedBox(height: 30),
            Container(padding: const EdgeInsets.all(20), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)), child: Column(children: [
              TextField(controller: id, decoration: InputDecoration(labelText: 'Retailer / Distributor ID', prefixIcon: const Icon(Icons.person), border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)))),
              const SizedBox(height: 12),
              TextField(obscureText: true, decoration: InputDecoration(labelText: 'Password', prefixIcon: const Icon(Icons.lock), border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)))),
              const SizedBox(height: 20),
              SizedBox(width: double.infinity, child: ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0D47A1), foregroundColor: Colors.white, padding: const EdgeInsets.all(15), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))), onPressed: () {
                if(id.text.toUpperCase() == 'ADMIN'){ ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Admin login alaga website re!'))); return; }
                Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => HomeScreen(userId: id.text.isEmpty ? 'RET123' : id.text)));
              }, child: const Text('LOGIN SECURELY', style: TextStyle(fontWeight: FontWeight.bold)))),
            ])),
            const SizedBox(height: 20),
            const Text('Demo ID: RET123 / DIST123\nPass: 123', style: TextStyle(color: Colors.white70, fontSize: 11), textAlign: TextAlign.center),
          ])),
        ),
      ),
    );
  }
}
class HomeScreen extends StatelessWidget {
  final String userId;
  const HomeScreen({super.key, required this.userId});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FB),
      appBar: AppBar(elevation: 0, backgroundColor: const Color(0xFF0D47A1), foregroundColor: Colors.white, title: Row(children: [Container(padding: const EdgeInsets.all(6), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)), child: const Icon(Icons.flash_on, color: Color(0xFF0D47A1), size: 20)), const SizedBox(width: 8), const Text('PayQuickPay', style: TextStyle(fontWeight: FontWeight.bold))]), actions: [IconButton(icon: const Icon(Icons.notifications), onPressed: () {})]),
      body: SingleChildScrollView(padding: const EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(width: double.infinity, padding: const EdgeInsets.all(20), decoration: BoxDecoration(gradient: const LinearGradient(colors: [Color(0xFF0D47A1), Color(0xFF42A5F5)]), borderRadius: BorderRadius.circular(16)), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('Welcome, $userId', style: const TextStyle(color: Colors.white70, fontSize: 12)), const SizedBox(height: 4), const Text('Wallet Balance', style: TextStyle(color: Colors.white70, fontSize: 13)), const SizedBox(height: 4), const Text('₹ 1,250.00', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)), const SizedBox(height: 12), Row(children: [ElevatedButton.icon(icon: const Icon(Icons.add, size: 16), label: const Text('Add Money'), style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: const Color(0xFF0D47A1)), onPressed: () {}), const SizedBox(width: 10), OutlinedButton.icon(icon: const Icon(Icons.history, size: 16, color: Colors.white), label: const Text('History', style: TextStyle(color: Colors.white)), onPressed: () {}, style: OutlinedButton.styleFrom(side: const BorderSide(color: Colors.white)) )])])),
        const SizedBox(height: 20),
        const Text('Recharge & Bill Pay', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        const SizedBox(height: 12),
        GridView.count(crossAxisCount: 4, shrinkWrap: true, physics: const NeverScrollableScrollPhysics(), children: [
          _service(Icons.phone_android, 'Mobile', '2% Comm', Colors.blue),
          _service(Icons.tv, 'DTH', '2.5%', Colors.orange),
          _service(Icons.lightbulb, 'Electricity', '0.5%', Colors.green),
          _service(Icons.directions_car, 'FASTag', '1%', Colors.purple),
          _service(Icons.water_drop, 'Water', '0.5%', Colors.cyan),
          _service(Icons.phone, 'Postpaid', '1.5%', Colors.indigo),
          _service(Icons.credit_card, 'Credit Card', '0.2%', Colors.red),
          _service(Icons.more_horiz, 'More', '', Colors.grey),
        ]),
        const SizedBox(height: 20),
        const Text('Quick Recharge', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        const SizedBox(height: 12),
        Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)]), child: Column(children: [
          TextField(decoration: InputDecoration(hintText: 'Mobile Number / DTH No / Consumer No', border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), prefixIcon: const Icon(Icons.search))),
          const SizedBox(height: 12),
          DropdownButtonFormField(decoration: InputDecoration(border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), prefixIcon: const Icon(Icons.cell_tower)), hint: const Text('Select Operator'), items: const [DropdownMenuItem(value: 'jio', child: Text('Jio - 2% Commission')), DropdownMenuItem(value: 'airtel', child: Text('Airtel - 1.5%')), DropdownMenuItem(value: 'vi', child: Text('Vi - 1.8%')), DropdownMenuItem(value: 'tataplay', child: Text('TataPlay - 2.5%'))], onChanged: (v) {}),
          const SizedBox(height: 12),
          TextField(decoration: InputDecoration(hintText: 'Amount ₹', border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), prefixIcon: const Icon(Icons.currency_rupee))),
          const SizedBox(height: 15),
          SizedBox(width: double.infinity, child: ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0D47A1), foregroundColor: Colors.white, padding: const EdgeInsets.all(16), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))), onPressed: () {}, child: const Text('PROCEED TO RECHARGE - SAFE BBPS', style: TextStyle(fontWeight: FontWeight.bold)))),
        ])),
        const SizedBox(height: 20),
        const Text('Recent Transactions', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        const SizedBox(height: 8),
        _txnTile('9178xxxxxx', 'Jio ₹299', 'Success - Comm ₹5.98', true),
        _txnTile('TataPlay', 'DTH ₹350', 'Success - Comm ₹8.75', true),
        _txnTile('TPCODL', 'Elec ₹1250', 'Failed - Refunded', false),
      ])),
      bottomNavigationBar: BottomNavigationBar(type: BottomNavigationBarType.fixed, selectedItemColor: const Color(0xFF0D47A1), items: const [BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'), BottomNavigationBarItem(icon: Icon(Icons.receipt_long), label: 'History'), BottomNavigationBarItem(icon: Icon(Icons.wallet), label: 'Wallet'), BottomNavigationBarItem(icon: Icon(Icons.support_agent), label: 'Support')]),
    );
  }
  Widget _service(IconData i, String t, String c, Color col) => Column(children: [Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: col.withOpacity(0.1), borderRadius: BorderRadius.circular(12)), child: Icon(i, color: col)), const SizedBox(height: 6), Text(t, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500)), if(c.isNotEmpty) Text(c, style: TextStyle(fontSize: 9, color: Colors.green.shade700, fontWeight: FontWeight.bold))]);
  Widget _txnTile(String a, String b, String c, bool ok) => Card(margin: const EdgeInsets.only(bottom: 8), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)), child: ListTile(leading: CircleAvatar(backgroundColor: ok? Colors.green.withOpacity(0.1) : Colors.red.withOpacity(0.1), child: Icon(ok? Icons.check : Icons.close, color: ok? Colors.green : Colors.red, size: 18)), title: Text('$a - $b', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)), subtitle: Text(c, style: const TextStyle(fontSize: 11)), trailing: const Icon(Icons.arrow_forward_ios, size: 12)));
}
