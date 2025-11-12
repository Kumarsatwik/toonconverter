import NextDynamic from "next/dynamic"

export const dynamic = "force-static"

const ConverterClient = NextDynamic(() => import("@/components/converter-client"), {
  loading: () => <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">Loading…</div>,
})

export default function Home() {
  return <ConverterClient />
}
