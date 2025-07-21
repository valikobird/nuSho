export interface TokenService {
  generateToken(payload: TokenPayload): string;
  verifyToken(token: string): unknown;
}

export interface TokenPayload {
  userId: string;
}
