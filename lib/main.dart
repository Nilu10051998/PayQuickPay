import 'package:flutter/material.dart';
void main() => runApp(const PayQuickPayApp());

class PayQuickPayApp extends StatelessWidget {
  const PayQuickPayApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(debugShowCheckedModeBanner: false, title: 'PayQuickPay', home: const SplashScreen());
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}
class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 2), () {
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const LoginScreen()));
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(children: [
        Container(width: double.infinity, height: 60, color: const Color(0xFF2196F3), child: const Center(child: Text('PayQuickPay', style: TextStyle(color: Colors.white, fontSize: 20)))),
        const Spacer(),
        Center(child: Column(children: [
          Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: const Color(0xFF2196F3), borderRadius: BorderRadius.circular(12)), child: const Icon(Icons.wallet, color: Colors.white, size: 40)),
          const SizedBox(height: 20),
          const Text('PayQuickPay', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
          const Text('Fast & Secure Payments', style: TextStyle(color: Colors.grey)),
          const SizedBox(height: 30),
          const CircularProgressIndicator(),
        ])),
        const Spacer(),
      ]),
    );
  }
}

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});
  @override
  Widget build(BuildContext context) {
    final idCtrl = TextEditingController();
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: LinearGradient(colors: [Color(0xFF0D47A1), Color(0xFF1976D2)], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
        child: Center(child: SingleChildScrollView(padding: const EdgeInsets.all(24), child: Column(children: [
          Container(padding: const EdgeInsets.all(20), decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle), child: const Icon(Icons.flash_on, size: 50, color: Color(0xFF0D47A1))),
          const SizedBox(height: 12),
          const Text('PayQuickPay', style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.bold)),
          const SizedBox(height: 25),
          Container(padding: const EdgeInsets.all(20), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)), child: Column(children: [
            TextField(controller: idCtrl, decoration: InputDecoration(labelText: 'Retailer / Distributor ID', prefixIcon: const Icon(Icons.person), border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)))),
            const SizedBox(height: 12),
            TextField(obscureText: true, decoration: InputDecoration(labelText: 'Password', prefixIcon: const Icon(Icons.lock), border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)))),
            const SizedBox(height: 20),
            SizedBox(width: double.infinity, child: ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0D47A1), padding: const EdgeInsets.all(15)), onPressed: () {
              Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => HomeScreen(userId: idCtrl.text.isEmpty ? 'RET123' : idCtrl.text)));
            }, child: const Text('LOGIN', style: TextStyle(color: Colors.white)))),
          ])),
        ]))),
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
      appBar: AppBar(backgroundColor: const Color(0xFF0D47A1), foregroundColor: Colors.white, title: Text('PayQuickPay - $userId')),
      body: SingleChildScrollView(padding: const EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(width: double.infinity, padding: const EdgeInsets.all(20), decoration: BoxDecoration(gradient: const LinearGradient(colors: [Color(0xFF0D47A1), Color(0xFF42A5F5)]), borderRadius: BorderRadius.circular(16)), child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('Wallet Balance', style: TextStyle(color: Colors.white70)), Text('₹ 1,250.00', style: TextStyle(color: Colors.white, fontSize: 26, fontWeight: FontWeight.bold))])),
        const SizedBox(height: 16),
        GridView.count(crossAxisCount: 4, shrinkWrap: true, physics: const NeverScrollableScrollPhysics(), children: const [
          _Service(icon: Icons.phone_android, name: 'Mobile'),
          _Service(icon: Icons.tv, name: 'DTH'),
          _Service(icon: Icons.lightbulb, name: 'Electricity'),
          _Service(icon: Icons.directions_car, name: 'FASTag'),
        ]),
        const SizedBox(height: 16),
        Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)), child: Column(children: [
          TextField(decoration: InputDecoration(hintText: 'Mobile Number', border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)))),
          SizedBox(height: 10),
          SizedBox(width: double.infinity, child: ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: Color(0xFF0D47A1)), onPressed: null, child: Text('PROCEED TO RECHARGE', style: TextStyle(color: Colors.white)))),
        ])),
      ])),
    );
  }
}
class _Service extends StatelessWidget {
  final IconData icon; final String name;
  const _Service({required this.icon, required this.name});
  @override
  Widget build(BuildContext context) {
    return Column(children: [Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: Colors.blue.withOpacity(0.1), borderRadius: BorderRadius.circular(12)), child: Icon(icon, color: Colors.blue)), const SizedBox(height: 5), Text(name, style: const TextStyle(fontSize: 11))]);
  }
}
