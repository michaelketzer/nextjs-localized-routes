import { ReactElement, ReactNode, createContext } from "react";

import { RouteIdent } from "./routing";
import routeDefinitions from '../routing.json';

export interface RoutingState {
  alternateLanguages: string[];
  currentRouteIdent: RouteIdent;
  routes: typeof routeDefinitions;
}

export const RoutingContext = createContext<RoutingState>({
  alternateLanguages: Object.keys(routeDefinitions),
  currentRouteIdent: 'home',
  routes: routeDefinitions,
});

interface Props {
  children: ReactNode;
  currentRouteIdent: RouteIdent;
}

export default function RoutingContextProvider({ children, currentRouteIdent }: Props): ReactElement {
  return <RoutingContext.Provider value={{
    currentRouteIdent,
    alternateLanguages: Object.keys(routeDefinitions),
    routes: routeDefinitions,
  }}>
    {children}
  </RoutingContext.Provider>;
}