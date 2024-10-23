// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:chatbot_bengkod/data/datasource/auth_remote_datasource.dart';

import '../../data/models/request/auth/login_request_model.dart';
import '../../data/models/response/auth/login_response_model.dart';

part 'auth_bloc.freezed.dart';
part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthRemoteDatasource authRemoteDatasource;
  AuthBloc(
    this.authRemoteDatasource,
  ) : super(const _Initial()) {
    on<_Login>((event, emit) async {
      emit(const _Loading());

      final response =
          await authRemoteDatasource.login(event.loginRequestModel);

      response.fold(
        (l) => emit(_Error(l)),
        (r) => emit(_LoginSuccess(r)),
      );
    });
  }
}
