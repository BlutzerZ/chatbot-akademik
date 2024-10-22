import 'dart:convert';

class LoginResponseModel {
  final int code;
  final String message;
  final Token data;

  LoginResponseModel({
    required this.code,
    required this.message,
    required this.data,
  });

  factory LoginResponseModel.fromJson(String str) =>
      LoginResponseModel.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory LoginResponseModel.fromMap(Map<String, dynamic> json) =>
      LoginResponseModel(
        code: json["code"],
        message: json["message"],
        data: Token.fromMap(json["data"]),
      );

  Map<String, dynamic> toMap() => {
        "code": code,
        "message": message,
        "data": data.toMap(),
      };
}

class Token {
  final String token;

  Token({
    required this.token,
  });

  factory Token.fromJson(String str) => Token.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Token.fromMap(Map<String, dynamic> json) => Token(
        token: json["token"],
      );

  Map<String, dynamic> toMap() => {
        "token": token,
      };
}
