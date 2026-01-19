import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

const PER_PAGE = 12;

export const dynamic = "force-dynamic";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const pageParam = searchParams.page;
  const searchParam = searchParams.search;

  const page = typeof pageParam === "string" ? Number(pageParam) || 1 : 1;
  const search = typeof searchParam === "string" ? searchParam : "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, PER_PAGE, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: search.trim() || undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={page} initialSearch={search} />
    </HydrationBoundary>
  );
}
