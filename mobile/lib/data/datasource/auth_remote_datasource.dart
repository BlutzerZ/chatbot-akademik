import 'package:chatbot_bengkod/core/constants/url.dart';
import 'package:chatbot_bengkod/data/models/request/auth/login_request_model.dart';
import 'package:chatbot_bengkod/data/models/response/auth/login_response_model.dart';
import 'package:dartz/dartz.dart';
import 'package:http/http.dart' as http;

class AuthRemoteDatasource {
  Future<Either<String, LoginResponseModel>> login(
      LoginRequestModel loginRequestModel) async {
    final response = await http.post(
      Uri.parse('${Url.baseUrl}/auth/sign-in'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
      },
      body: loginRequestModel.toJson(),
    );

    if (response.statusCode == 200) {
      return Right(LoginResponseModel.fromJson(response.body));
    } else {
      return const Left('Login Gagal');
    }
  }
}
