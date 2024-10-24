/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ConversationDetail */
export interface ConversationDetail {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** CreateConversationOrMessageRequest */
export interface CreateConversationOrMessageRequest {
  /** Message */
  message: string;
}

/** CreateConversationOrMessageResponse */
export interface CreateConversationOrMessageResponse {
  /** Code */
  code: number;
  /** Message */
  message: string;
  /** Data */
  data: MessageDetail[];
}

/** DetailResponse */
export interface DetailResponse {
  /** Token */
  token: string;
}

/** GetAllConversationResponse */
export interface GetAllConversationResponse {
  /** Code */
  code: number;
  /** Message */
  message: string;
  /** Data */
  data: ConversationDetail[];
}

/** GetConversationByIDResponse */
export interface GetConversationByIDResponse {
  /** Code */
  code: number;
  /** Message */
  message: string;
  data: ConversationDetail;
}

/** GetConversationByIDWithMessageResponse */
export interface GetConversationByIDWithMessageResponse {
  /** Code */
  code: number;
  /** Message */
  message: string;
  /** Data */
  data: MessageDetail[];
}

/** GetMessageByIDResponse */
export interface GetMessageByIDResponse {
  /** Code */
  code: number;
  /** Message */
  message: string;
  data: MessageDetail;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** MessageDetail */
export interface MessageDetail {
  /**
   * Id
   * @format uuid
   */
  id: string;
  role: RoleEnum;
  /** Content */
  content: string;
  /**
   * Conversation Id
   * @format uuid
   */
  conversation_id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** RoleEnum */
export enum RoleEnum {
  ASSISTANT = "ASSISTANT",
  SYSTEM = "SYSTEM",
  USER = "USER",
}

/** UserAuthRequest */
export interface UserAuthRequest {
  /** Username */
  username: string;
  /** Password */
  password: string;
}

/** UserAuthResponse */
export interface UserAuthResponse {
  /** Code */
  code: number;
  /** Message */
  message: string;
  data: DetailResponse;
}

/** UserDetail */
export interface UserDetail {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Username */
  username: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** UserDetailResponse */
export interface UserDetailResponse {
  /** Code */
  code: number;
  /** Message */
  message: string;
  data: UserDetail;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title FastAPI
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags User
     * @name UserAuthenticationAuthSignInPost
     * @summary User Authentication
     * @request POST:/auth/sign-in
     */
    userAuthenticationAuthSignInPost: (
      data: UserAuthRequest,
      params: RequestParams = {},
    ) =>
      this.request<UserAuthResponse, HTTPValidationError>({
        path: `/auth/sign-in`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserDetailAuthMeGet
     * @summary User Detail
     * @request GET:/auth/me
     * @secure
     */
    userDetailAuthMeGet: (params: RequestParams = {}) =>
      this.request<UserDetailResponse, any>({
        path: `/auth/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name RefreshTokenAuthRefreshTokenGet
     * @summary Refresh Token
     * @request GET:/auth/refresh-token
     * @secure
     */
    refreshTokenAuthRefreshTokenGet: (params: RequestParams = {}) =>
      this.request<UserAuthResponse, any>({
        path: `/auth/refresh-token`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  conversations = {
    /**
     * No description
     *
     * @tags Conversation
     * @name GetAllConversationConversationsGet
     * @summary Get All Conversation
     * @request GET:/conversations
     * @secure
     */
    getAllConversationConversationsGet: (
      query: {
        /** Limit */
        limit: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetAllConversationResponse, HTTPValidationError>({
        path: `/conversations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name CreateConversationConversationsPost
     * @summary Create Conversation
     * @request POST:/conversations
     * @secure
     */
    createConversationConversationsPost: (
      data: CreateConversationOrMessageRequest,
      params: RequestParams = {},
    ) =>
      this.request<CreateConversationOrMessageResponse, HTTPValidationError>({
        path: `/conversations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name GetConversationByIdConversationsConvesationIdGet
     * @summary Get Conversation By Id
     * @request GET:/conversations/{convesation_id}
     * @secure
     */
    getConversationByIdConversationsConvesationIdGet: (
      convesationId: string,
      query: {
        /**
         * Conversation Id
         * @format uuid
         */
        conversation_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetConversationByIDResponse, HTTPValidationError>({
        path: `/conversations/${convesationId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name GetConversationByIdWithMessageConversationsConvesationIdMessagesGet
     * @summary Get Conversation By Id With Message
     * @request GET:/conversations/{convesation_id}/messages
     * @secure
     */
    getConversationByIdWithMessageConversationsConvesationIdMessagesGet: (
      convesationId: string,
      query: {
        /**
         * Conversation Id
         * @format uuid
         */
        conversation_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetConversationByIDWithMessageResponse, HTTPValidationError>(
        {
          path: `/conversations/${convesationId}/messages`,
          method: "GET",
          query: query,
          secure: true,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags Conversation
     * @name CreateMessageByCoverstaionIdConversationsConvesationIdMessagesPost
     * @summary Create Message By Coverstaion Id
     * @request POST:/conversations/{convesation_id}/messages
     * @secure
     */
    createMessageByCoverstaionIdConversationsConvesationIdMessagesPost: (
      convesationId: string,
      query: {
        /**
         * Conversation Id
         * @format uuid
         */
        conversation_id: string;
      },
      data: CreateConversationOrMessageRequest,
      params: RequestParams = {},
    ) =>
      this.request<CreateConversationOrMessageResponse, HTTPValidationError>({
        path: `/conversations/${convesationId}/messages`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name GetMessageWithConvetsationIdAndMessageIdConversationsConvesationIdMessagesMessageIdGet
     * @summary Get Message With Convetsation Id And Message Id
     * @request GET:/conversations/{convesation_id}/messages/{message_id}
     * @secure
     */
    getMessageWithConvetsationIdAndMessageIdConversationsConvesationIdMessagesMessageIdGet:
      (
        messageId: string,
        convesationId: string,
        query: {
          /**
           * Conversation Id
           * @format uuid
           */
          conversation_id: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetMessageByIDResponse, HTTPValidationError>({
          path: `/conversations/${convesationId}/messages/${messageId}`,
          method: "GET",
          query: query,
          secure: true,
          format: "json",
          ...params,
        }),
  };
}
