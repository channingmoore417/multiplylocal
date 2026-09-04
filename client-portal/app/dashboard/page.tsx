import Image from "next/image";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { getLatestScan, type LatestScan } from "@/lib/local-falcon";
import { createClient } from "@/lib/supabase/server";

type Client = {
  id: string;
  name: string;
  gbp_place_id: string | null;
  local_falcon_location_id: string | null;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS guarantees this only ever returns the signed-in user's client.
  const { data: client } = await supabase
    .from("clients")
    .select("id, name, gbp_place_id, local_falcon_location_id")
    .limit(1)
    .maybeSingle<Client>();

  let scan: LatestScan | null = null;
  let scanError: string | null = null;
  if (client?.local_falcon_location_id) {
    try {
      scan = await getLatestScan(client.local_falcon_location_id);
    } catch {
      scanError = "Rankings are temporarily unavailable. Check back soon.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header signedIn />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-10">
        {!client ? (
          <p className="text-ink/60">
            Your account isn&apos;t linked to a client yet. Contact Multiply
            Local and we&apos;ll get you set up.
          </p>
        ) : (
          <>
            <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">
              {client.name}
            </h1>

            {/*
              PLACEHOLDER — "What This Means" interpretation block.
              Written analysis gets added here later. Keep this section
              above the numbers.
            */}
            <section className="mt-10 border-l-4 border-accent bg-white p-6">
              <h2 className="font-display text-2xl uppercase tracking-wide">
                What This Means
              </h2>
              <p className="mt-2 italic text-ink/40">
                [Placeholder — written interpretation of this month&apos;s
                numbers goes here.]
              </p>
            </section>

            <section className="mt-10">
              <h2 className="font-display text-3xl uppercase tracking-wide">
                Rankings
              </h2>

              {scanError && <p className="mt-4 text-ink/60">{scanError}</p>}

              {!scanError && !scan && (
                <p className="mt-4 text-ink/60">
                  No scans yet — your first rankings report is coming soon.
                </p>
              )}

              {scan && (
                <div className="mt-6 space-y-6">
                  <p className="text-sm uppercase tracking-widest text-ink/50">
                    Latest scan · {scan.date}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="border border-ink/10 bg-white p-5">
                      <p className="text-xs uppercase tracking-widest text-ink/50">
                        Keyword
                      </p>
                      <p className="mt-2 text-xl font-semibold">
                        {scan.keyword}
                      </p>
                    </div>
                    <div className="border border-ink/10 bg-white p-5">
                      <p className="text-xs uppercase tracking-widest text-ink/50">
                        Average Rank
                      </p>
                      <p className="mt-2 font-display text-4xl text-accent">
                        {scan.averageRank !== null
                          ? scan.averageRank.toFixed(1)
                          : "—"}
                      </p>
                    </div>
                    <div className="border border-ink/10 bg-white p-5">
                      <p className="text-xs uppercase tracking-widest text-ink/50">
                        Share of Local Voice
                      </p>
                      <p className="mt-2 font-display text-4xl text-accent">
                        {scan.shareOfLocalVoice !== null
                          ? `${scan.shareOfLocalVoice.toFixed(1)}%`
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {scan.gridImageUrl && (
                    <div className="border border-ink/10 bg-white p-5">
                      <p className="text-xs uppercase tracking-widest text-ink/50">
                        Ranking Grid
                      </p>
                      <Image
                        src={scan.gridImageUrl}
                        alt={`Local ranking grid for "${scan.keyword}"`}
                        width={800}
                        height={800}
                        className="mt-4 h-auto w-full"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
