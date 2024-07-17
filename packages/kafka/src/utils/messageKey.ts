export function createMessageKey(): string {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 10);
  return `events-service-message-${timestamp}-${randomId}`;
}
