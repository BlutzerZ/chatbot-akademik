import 'package:shared_preferences/shared_preferences.dart';

import '../models/response/auth/login_response_model.dart';

class AuthLocaldatasource {
  Future<void> saveAuthData(LoginResponseModel loginResponseModel) async {
    final pref = await SharedPreferences.getInstance();
    await pref.setString('auth_data', loginResponseModel.toJson());
  }

  Future<void> removeAuthData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_data');
  }

  Future<LoginResponseModel> getAuthData() async {
    final prefs = await SharedPreferences.getInstance();
    final authData = prefs.getString('auth_data');

    return LoginResponseModel.fromJson(authData!);
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    final authData = prefs.getString('auth_data');

    if (authData != null) {
      final loginResponse = LoginResponseModel.fromJson(authData);

      // Misalnya kita ambil token pertama dari daftar data
      if (loginResponse.data.token.isNotEmpty) {
        return loginResponse.data.token;
      }
    }

    return null; // Jika authData atau data kosong
  }

  Future<bool> isAuth() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.containsKey('auth_data');
  }
}
