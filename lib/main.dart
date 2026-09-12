import 'package:flutter/material.dart';
void main(){ runApp(MaterialApp(debugShowCheckedModeBanner:false, home: Splash())); }

class Splash extends StatefulWidget{ const Splash({super.key}); @override State<Splash> createState()=> _S();}
class _S extends State<Splash>{
  @override
  void initState(){ super.initState(); Future.delayed(Duration(seconds:2), (){ if(mounted) Navigator.pushReplacement(context, MaterialPageRoute(builder:(_)=>Login())); }); }
  @override
  Widget build(BuildContext context){ return Scaffold(backgroundColor:Colors.white, body: Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [ Icon(Icons.wallet, size:80, color:Color(0xFF2196F3)), SizedBox(height:20), Text('PayQuickPay', style:TextStyle(fontSize:28, fontWeight:FontWeight.bold)), Text('Fast & Secure Payments', style:TextStyle(color:Colors.grey)), SizedBox(height:30), CircularProgressIndicator() ]))); }
}

class Login extends StatelessWidget{
  Login({super.key});
  final id = TextEditingController();
  @override
  Widget build(BuildContext context){
    return Scaffold(body: Container(width:double.infinity, height:double.infinity, decoration: BoxDecoration(gradient: LinearGradient(colors:[Color(0xFF0D47A1), Color(0xFF42A5F5)], begin:Alignment.topCenter, end:Alignment.bottomCenter)), child: Center(child: Padding(padding: EdgeInsets.all(24), child: Column(mainAxisSize:MainAxisSize.min, children: [
      Icon(Icons.flash_on, size:60, color:Colors.white), Text('PayQuickPay', style:TextStyle(color:Colors.white, fontSize:28, fontWeight:FontWeight.bold)),
      SizedBox(height:20),
      Container(padding:EdgeInsets.all(20), decoration:BoxDecoration(color:Colors.white, borderRadius:BorderRadius.circular(16)), child: Column(children: [
        TextField(controller:id, decoration:InputDecoration(labelText:'Retailer ID - RET123', border:OutlineInputBorder())),
        SizedBox(height:10),
        TextField(decoration:InputDecoration(labelText:'Password - 123', border:OutlineInputBorder()), obscureText:true),
        SizedBox(height:20),
        SizedBox(width:double.infinity, height:50, child: ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor:Color(0xFF0D47A1)), onPressed:(){ Navigator.pushReplacement(context, MaterialPageRoute(builder:(_)=>Home(userId:id.text.isEmpty?'RET123':id.text))); }, child:Text('LOGIN', style:TextStyle(color:Colors.white, fontSize:18))))
      ]))
    ])))));
  }
}

class Home extends StatelessWidget{
  final String userId; const Home({super.key, required this.userId});
  @override
  Widget build(BuildContext context){
    return Scaffold(appBar: AppBar(title:Text('Hi $userId'), backgroundColor:Color(0xFF0D47A1), foregroundColor:Colors.white), body: Center(child: Column(mainAxisAlignment:MainAxisAlignment.center, children: [Text('Wallet: ₹1250.00', style:TextStyle(fontSize:24, fontWeight:FontWeight.bold)), SizedBox(height:20), Text('Login Success! Home Clear Dekhagala', style:TextStyle(color:Colors.green)) ])));
  }
}
