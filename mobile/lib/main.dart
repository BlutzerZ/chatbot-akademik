import 'package:chatbot_bengkod/bloc/bloc/auth_bloc.dart';
import 'package:chatbot_bengkod/data/datasource/auth_local_datasource.dart';
import 'package:chatbot_bengkod/data/datasource/auth_remote_datasource.dart';
import 'package:chatbot_bengkod/presentasion/auth/login_page.dart';
import 'package:chatbot_bengkod/presentasion/chat/chat_page.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => AuthBloc(AuthRemoteDatasource()),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'ChatBot',
        theme: ThemeData(
          // colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: FutureBuilder<bool>(
          future: AuthLocaldatasource().isAuth(),
          builder: (context, snapshot) {
            if (snapshot.hasData && snapshot.data == true) {
              return const ChatPage();
            } else {
              return const LoginPage();
            }
          },
        ),
      ),
    );
  }
}
