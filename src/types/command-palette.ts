export interface CommandAction {
  id: string;
  title: string;
  section: string;
  perform: () => void;
  keywords?: string;
  shortcut?: string;
}
