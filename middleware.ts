import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 定义无需登录即可访问的页面路径
const publicPaths = ['/login'];

// 检查路径是否为公共路径
function isPublicPath(path: string) {
  return publicPaths.some((publicPath) => path.startsWith(publicPath));
}

export function middleware(request: NextRequest) {
  console.log('middleware', request);

  // 假设通过检查请求头中的 token 来判断用户是否登录
  const isLoggedIn = !!request.headers.get('Authorization');

  const path = request.nextUrl.pathname;

  // 如果用户未登录且访问的不是公共路径
  if (!isLoggedIn && !isPublicPath(path)) {
    // 重定向到登录页面
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 匹配需要进行中间件处理的路径
export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
