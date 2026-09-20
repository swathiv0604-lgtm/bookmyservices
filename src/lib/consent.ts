export const TERMS_VERSION = "3/8/2026";
export const CONSENT_STORAGE_KEY = "bys-terms-consent";

export type ConsentRecord = {
  termsAccepted: boolean;
  termsVersion: string;
  acceptedAt: string;
};

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      parsed &&
      parsed.termsAccepted === true &&
      typeof parsed.termsVersion === "string" &&
      typeof parsed.acceptedAt === "string"
    ) {
      return parsed as ConsentRecord;
    }
    return null;
  } catch {
    return null;
  }
}

export function hasCurrentConsent(): boolean {
  const record = readConsent();
  return !!record && record.termsVersion === TERMS_VERSION;
}

export function recordConsent(): ConsentRecord {
  const record: ConsentRecord = {
    termsAccepted: true,
    termsVersion: TERMS_VERSION,
    acceptedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable — consent stays for this session only */
  }
  return record;
}
