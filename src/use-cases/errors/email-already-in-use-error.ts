export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('That e-mail is already in use.')
  }
}
