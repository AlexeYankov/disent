import CountryClientPage from "@/clientPages/countryPage/countryPage";

export default function Page({ params }: { params: { name: string } }) {
  return <CountryClientPage countryName={params.name} />;
}
