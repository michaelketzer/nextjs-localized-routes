import { ReactElement, ReactNode, createContext, useContext, useMemo } from "react";

import Link from 'next/link';
import { RouteIdent } from "./routing";
import { RoutingContext } from "./routingContext";
import { useRouter } from "next/dist/client/router";

interface Props {
  children: ReactNode;
  locale?: string;
  routeIdent?: RouteIdent;
}

export default function Route({ children, locale, routeIdent }: Props): ReactElement {
  const routeContext = useContext(RoutingContext);
  const router = useRouter();
  const relevantLocale = useMemo(() => locale ?? router.locale, [router, locale]);
  const relevantIdent = useMemo(() => routeIdent ?? routeContext.currentRouteIdent, [routeIdent, routeContext]);
  const route = useMemo(() => routeContext.routes[relevantLocale][relevantIdent], [relevantLocale, routeContext, relevantIdent]);

  return (
    <Link href={route} locale={relevantLocale} key={`${route}-${relevantLocale}`}>
      <a>
        {children}
      </a>
    </Link>
  );
}