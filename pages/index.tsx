import Page from '../components/page';
import { ReactElement } from 'react'
import RoutingContextProvider from '../components/routingContext';

export default function Home(): ReactElement {
  return <RoutingContextProvider currentRouteIdent={'home'}>
    <Page />
  </RoutingContextProvider>
}