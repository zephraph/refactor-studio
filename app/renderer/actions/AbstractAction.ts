interface ActionUI {
  title: string;
  description: string;
  icon: string;
}

export interface Action extends ActionUI {
  requiresClone: boolean;
}
