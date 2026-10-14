/**
 * 旧URL（<worker名>.<アカウント>.workers.dev）へのアクセスを、
 * カスタムドメイン（kmrvidskills.dev）の同じパスへ 301 で転送する。
 * それ以外のリクエストは静的アセット（dist）をそのまま返す。
 *
 * assets.run_worker_first = true のため、すべてのリクエストでこの Worker が先に動く。
 * Version Preview URL（<id>-<worker名>.<アカウント>.workers.dev）は転送しない。
 * HTML レスポンスには、エージェントが発見に使う Link ヘッダ（RFC 8288）を付ける。
 */
const CANONICAL_HOST = 'kmrvidskills.dev'
const LEGACY_HOST_PREFIX = 'kmrvid-claude-skills.'
const LINK_HEADER = '</sitemap.xml>; rel="sitemap"; type="application/xml"'

export default {
  /**
   * @param {Request} request
   * @param {{ ASSETS: { fetch: (request: Request) => Promise<Response> } }} env
   */
  async fetch(request, env) {
    const url = new URL(request.url)

    if (
      url.hostname.endsWith('.workers.dev') &&
      url.hostname.startsWith(LEGACY_HOST_PREFIX)
    ) {
      url.protocol = 'https:'
      url.hostname = CANONICAL_HOST
      url.port = ''
      return Response.redirect(url.toString(), 301)
    }

    const response = await env.ASSETS.fetch(request)
    if (!response.headers.get('Content-Type')?.startsWith('text/html')) {
      return response
    }

    const withLink = new Response(response.body, response)
    withLink.headers.append('Link', LINK_HEADER)
    return withLink
  },
}
