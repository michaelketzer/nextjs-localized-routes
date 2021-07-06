import { GetStaticPathsResult } from "next";
import routeDefinitions from '../routing.json';

export type RouteIdent = keyof typeof routeDefinitions['en'];

export function collectRoutePaths(locales: string[]): GetStaticPathsResult<{ page: string[] }>['paths'] {
  return locales.reduce((acc, locale) => {
    // get all available route definitions in that locale
    const localePaths: Record<string, string> = routeDefinitions.hasOwnProperty(locale) ? routeDefinitions[locale] : {};

    // check whether we have definitions
    if (Object.keys(localePaths).length) {
      // collect all general routes, skip homepage as it is solved in index.tsx
      const relevantPaths = Object.values(localePaths)
        .filter((path) => path !== '/')
        .map((path) => ({ locale, params: { page: path.substr(1).split('/').filter(Boolean) } }))

      // append all route definitions to the paths array
      acc.push(...relevantPaths)
    }
    return acc;
  }, []);  
}

export function getRouteIdentFromPagePaths(locale: string, page: string[]): RouteIdent {
  const requestedPath = `/${page.join('/')}`;
  const entry = Object.entries(routeDefinitions[locale]).find(([, path]) => path === requestedPath);
  return entry[0] as RouteIdent;
}