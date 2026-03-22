import "server-only";

import { Resend } from "resend";

import { getResendApiKey } from "./env.ts";

export const resend = new Resend(getResendApiKey());
