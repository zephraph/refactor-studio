interface RefactorAction {
  requiresClone: boolean;
  execute: () => void;
}
