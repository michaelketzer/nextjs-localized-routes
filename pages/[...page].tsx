import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { RouteIdent, collectRoutePaths, getRouteIdentFromPagePaths } from '../components/routing'

import Page from '../components/page'
import { ReactElement } from 'react'
import RoutingContextProvider from '../components/routingContext'

interface Props {
  currentRouteIdent: RouteIdent;
}

export default function BasePage({ currentRouteIdent }: Props): ReactElement {
  return <RoutingContextProvider currentRouteIdent={currentRouteIdent}>
    <Page />
  </RoutingContextProvider>
}


export async function getStaticProps({
  locale,
  params: { page },
}: GetStaticPropsContext<{ page: string[] }>): Promise<GetStaticPropsResult<Props>> {
  const currentRouteIdent = getRouteIdentFromPagePaths(locale, page);
  return {
    props: {
      currentRouteIdent,
    },
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const paths = collectRoutePaths(locales);
  return {
    paths,
    fallback: false,
  };
}