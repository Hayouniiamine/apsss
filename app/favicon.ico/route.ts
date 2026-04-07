export function GET(request: Request) {
  const iconUrl = new URL("/images/avicenne/logo.png", request.url);
  return Response.redirect(iconUrl, 307);
}
