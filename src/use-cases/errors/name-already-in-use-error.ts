export class NameAlreadyInUseError extends Error {
  constructor() {
    super('That name is already in use.')
  }
}
