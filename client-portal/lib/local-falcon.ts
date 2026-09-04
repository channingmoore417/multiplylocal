// Server-only wrapper around the Local Falcon public API (v1).
// The API key never reaches the browser: importing this module from client
// code is a build-time error thanks to the "server-only" package.
import "server-only";

const BASE_URL = "https://api.localfalcon.com/v1";

export type LatestScan = {
  reportKey: string;
  date: string;
  keyword: string;
  /** ARP — average rank position across the scan grid (lower is better). */
  averageRank: number | null;
  /** SoLV — share of local voice, as a percentage 0–100. */
  shareOfLocalVoice: number | null;
  /** Grid visualization image, when the API provides one. */
  gridImageUrl: string | null;
};

function toNumber(value: unknown): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function lfGet(
  path: string,
  params: Record<string, string>
): Promise<Record<string, unknown>> {
  const apiKey = process.env.LOCAL_FALCON_API_KEY;
  if (!apiKey) {
    throw new Error("LOCAL_FALCON_API_KEY is not set");
  }

  const url = new URL(`${BASE_URL}/${path}/`);
  url.searchParams.set("api_key", apiKey);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error(`Local Falcon API ${path} responded ${res.status}`);
  }

  const json = (await res.json()) as Record<string, unknown>;
  // Responses arrive as { code, success, data: {...} }; unwrap when present.
  return (json.data as Record<string, unknown>) ?? json;
}

/**
 * Returns the most recent scan report for a Local Falcon location
 * (identified by its Google Place ID), or null when none exist.
 */
export async function getLatestScan(
  locationId: string
): Promise<LatestScan | null> {
  const data = await lfGet("reports", { place_id: locationId });

  const reports = (data.reports ?? []) as Array<Record<string, unknown>>;
  if (!Array.isArray(reports) || reports.length === 0) return null;

  // The API returns newest first; sort by timestamp defensively when present.
  const latest = [...reports].sort(
    (a, b) => (toNumber(b.timestamp) ?? 0) - (toNumber(a.timestamp) ?? 0)
  )[0];

  const reportKey = String(latest.report_key ?? "");

  // The list endpoint carries the metrics; the single-report endpoint carries
  // the grid image ("image", with "heatmap" as an alternative rendering).
  let gridImageUrl: string | null =
    typeof latest.image === "string" ? latest.image : null;
  if (!gridImageUrl && reportKey) {
    try {
      const full = await lfGet("report", { report_key: reportKey });
      const report = (full.report as Record<string, unknown>) ?? full;
      if (typeof report.image === "string") gridImageUrl = report.image;
      else if (typeof report.heatmap === "string")
        gridImageUrl = report.heatmap;
    } catch {
      // The metrics are still worth showing without the image.
    }
  }

  return {
    reportKey,
    date: String(latest.date ?? ""),
    keyword: String(latest.keyword ?? ""),
    averageRank: toNumber(latest.arp),
    shareOfLocalVoice: toNumber(latest.solv),
    gridImageUrl,
  };
}
