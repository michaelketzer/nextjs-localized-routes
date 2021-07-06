import { ReactElement, useContext, useMemo } from "react";

import Route from './route';
import { RoutingContext } from "./routingContext";
import { useRouter } from "next/dist/client/router";

export default function Page(): ReactElement {
  const ctx = useContext(RoutingContext);
  const { locale, asPath } = useRouter();

  const altLocales = useMemo(() => ctx.alternateLanguages.filter((lang) => lang !== locale), [ctx.alternateLanguages, locale]);

  return <main>
    <h2>Current route</h2>
    Locale: <b>{locale}</b>, RouteIdent: <b>{ctx.currentRouteIdent}</b>, Pathname: <b>{asPath}</b>

    <br /><br />
    <h2>Alternative Locales for currentRouteIdent</h2>
    {altLocales.map((locale) => <Route key={locale} locale={locale}>
      <button>Switch to locale <b>{locale}</b></button>
    </Route>)}


    <h2>{'Routes for "home" route ident'}</h2>
    {ctx.alternateLanguages.map((locale) => <Route key={locale} locale={locale} routeIdent={'home'}>
      <button>Switch to routeIdent: <b>home</b>, locale: <b>{locale}</b></button>
    </Route>)}

    <br /><br />
    <h2>{'Routes for "other_page" route ident'}</h2>
    {ctx.alternateLanguages.map((locale) => <Route key={locale} locale={locale} routeIdent={'other_page'}>
      <button>Switch to routeIdent: <b>other_page</b>, locale: <b>{locale}</b></button>
    </Route>)}

    <br /><br />
    <h2>{'Routes for "just_another_page" route ident'}</h2>
    {ctx.alternateLanguages.map((locale) => <Route key={locale} locale={locale} routeIdent={'just_another_page'}>
      <button>Switch to routeIdent: <b>just_another_page</b>, locale: <b>{locale}</b></button>
    </Route>)}
  </main>
}