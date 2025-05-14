export const parseLastPageFromLinkHeader = (linkHeader: string | undefined): number => {
  if (!linkHeader) return 1;
  const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
  return match ? parseInt(match[1], 10) : 1;
};