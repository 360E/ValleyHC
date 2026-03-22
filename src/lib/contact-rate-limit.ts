import "server-only";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const globalStore = globalThis as typeof globalThis & {
  __valleyhcRateLimitStore?: Map<string, RateLimitEntry>;
};

const requestStore = globalStore.__valleyhcRateLimitStore ?? new Map<string, RateLimitEntry>();
globalStore.__valleyhcRateLimitStore = requestStore;

export function getRateLimitKey(request: Request, routeKey: string) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || "unknown";

  return `${routeKey}:${ipAddress}`;
}

export function enforceRateLimit(key: string) {
  const now = Date.now();
  const existingEntry = requestStore.get(key);

  if (!existingEntry || existingEntry.resetAt <= now) {
    requestStore.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return { allowed: true, retryAfterSeconds: Math.ceil(WINDOW_MS / 1000) };
  }

  if (existingEntry.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(Math.ceil((existingEntry.resetAt - now) / 1000), 1),
    };
  }

  existingEntry.count += 1;
  requestStore.set(key, existingEntry);

  return {
    allowed: true,
    retryAfterSeconds: Math.max(Math.ceil((existingEntry.resetAt - now) / 1000), 1),
  };
}
