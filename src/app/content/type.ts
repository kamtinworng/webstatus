export interface Root {
  metaData: MetaData;
  requestSettings: RequestSettings;
  response: Response;
}

export interface MetaData {
  version: string;
  responseTime: number;
  dateTime: string;
}

export interface RequestSettings {
  custom: Custom;
  fixed: Fixed;
}

export interface Custom {
  requestUrl: string;
  https: boolean;
  followRedirect: boolean;
  maxRedirects: number;
  validateTlsCertificate: boolean;
  dnsLookupIpVersion: number;
  responseBody: boolean;
  responseHeaders: boolean;
  requestHeaders: boolean;
  timings: boolean;
  parsedUrl: boolean;
  parsedHostname: boolean;
  rawRequest: boolean;
  userAgent: string;
}

export interface Fixed {
  httpVersion: string;
  method: string;
  timeout: number;
  setHost: string;
  http2: boolean;
  encoding: string;
  decompress: boolean;
}

export interface Response {
  numberOfRedirects: number;
  chain: Chain[];
}

export interface Chain {
  url: string;
  statusCode: number;
  statusMessage: string;
  redirectFrom?: string;
  redirectTo?: string;
  ip: string;
  latency?: number;
  redirectType?: string;
}
