import 'package:flutter/material.dart';

void main() {
  runApp(const PayQuickPayApp());
}

class PayQuickPayApp extends StatelessWidget {
  const PayQuickPayApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PayQuickPay',
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('PayQuickPay'),
          backgroundColor: Colors.blue,
        ),
        body: const Center(
          child: Text(
            'Welcome to PayQuickPay!',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }
}
