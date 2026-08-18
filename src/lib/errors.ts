/**
 * Pull a human-readable message off an unknown thrown value.
 * Supabase rejects with an object carrying `message`, but a network failure
 * throws a plain Error and a stray `throw "boom"` is legal too — so narrow
 * rather than assuming any particular shape.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message: unknown };
    if (typeof message === "string") return message;
  }

  return String(error);
}
