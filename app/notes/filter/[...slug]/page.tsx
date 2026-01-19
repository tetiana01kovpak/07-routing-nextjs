import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { NoteTag } from "../../../../types/note";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "../../Notes.client";

const PER_PAGE = 12;

export const dynamic = "force-dynamic";

export default async function NotesByTagPage({
  params,
  searchParams,
}: {
  params: { slug: string[] } | Promise<{ slug: string[] }>;
  searchParams:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;

  const page = typeof pageParam === "string" ? Number(pageParam) || 1 : 1;
  const search = typeof searchParam === "string" ? searchParam : "";

  const routeTag = resolvedParams.slug?.[0];
  const tag = routeTag && routeTag !== "all" ? (routeTag as NoteTag) : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag ?? "all", page, PER_PAGE, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: search.trim() || undefined,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        key={tag ?? "all"}
        initialPage={page}
        initialSearch={search}
        initialTag={tag}
      />
    </HydrationBoundary>
  );
}
