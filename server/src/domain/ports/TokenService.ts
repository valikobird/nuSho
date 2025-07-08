export interface TokenService {
  generateToken(payload: TokenPayload): string;
  verifyToken(token: string): any;
}

export interface TokenPayload {
  userId: string;
}
