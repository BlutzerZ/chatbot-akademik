import 'package:chatbot_bengkod/component/custom_textfield.dart';
import 'package:chatbot_bengkod/data/datasource/auth_local_datasource.dart';
import 'package:chatbot_bengkod/presentasion/chat/chat_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../bloc/bloc/auth_bloc.dart';
import '../../data/models/request/auth/login_request_model.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final usernameController = TextEditingController();
  final passController = TextEditingController();

  @override
  void dispose() {
    usernameController.dispose();
    passController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.symmetric(
            horizontal: 30,
          ),
          children: [
            const SizedBox(
              height: 130,
            ),
            const Center(
              child: Text(
                'bngky.',
                style: TextStyle(
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF1153A1),
                ),
              ),
            ),
            const SizedBox(
              height: 16,
            ),
            const Center(
              child: Text(
                "Selamat Datang Di Chatbot Akademik",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF1153A1),
                ),
              ),
            ),
            const SizedBox(
              height: 60,
            ),
            CustomTextfield(
              controller: usernameController,
              label: 'Nomor Induk Mahasiswa',
              hintText: 'Nomor Induk Mahasiswa',
            ),
            const SizedBox(
              height: 10,
            ),
            CustomTextfield(
              controller: passController,
              label: 'Password',
              hintText: 'Password',
              keyboardType: TextInputType.visiblePassword,
              obscureText: true,
            ),
            const SizedBox(
              height: 20,
            ),
            BlocConsumer<AuthBloc, AuthState>(
              listener: (context, state) {
                state.maybeWhen(
                  orElse: () {},
                  loginSuccess: (loginResponseModel) {
                    AuthLocaldatasource().saveAuthData(loginResponseModel);

                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const ChatPage(),
                      ),
                    );

                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        backgroundColor: Colors.green,
                        content: Text(
                          'Login Success',
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                    );
                  },
                  error: (message) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        backgroundColor: Colors.red,
                        content: Text(
                          message,
                          style: const TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                    );
                  },
                );
              },
              builder: (context, state) {
                return state.maybeWhen(
                  loading: () => const Center(
                    child: CircularProgressIndicator(),
                  ),
                  orElse: () {
                    return ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF1153A1),
                        minimumSize:
                            Size(MediaQuery.of(context).size.width, 45),
                      ),
                      onPressed: () {
                        final loginRequest = LoginRequestModel(
                          username: usernameController.text,
                          password: passController.text,
                        );

                        context
                            .read<AuthBloc>()
                            .add(AuthEvent.login(loginRequest));

                        usernameController.clear();
                        passController.clear();
                      },
                      child: const Text(
                        'Masuk',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                        ),
                      ),
                    );
                  },
                );
              },
            ),
            Align(
              alignment: Alignment.center,
              child: TextButton(
                onPressed: () {},
                child: const Text(
                  'Lupa kata sandi?',
                  style: TextStyle(
                    color: Color(0xFF1153A1),
                    fontSize: 16,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
