export interface GlobalContextType {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
}

export interface ActionProps {
  request: Request;
}

export interface GeneralApiResponse {
  msg: string;
}
