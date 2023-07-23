export interface NavItem {
  id: string;
  title: string;
  url: string;
}

export interface NavMenu extends NavItem {
  subMenu?: NavItem[];
}

export interface Hover {
  isLoading: boolean;
  id: string;
}
