import React from "react";
import PageHeader from "../page-header.component";
import { useFullWidth } from "../navbar/use-full-width.hook";
import { Router, Redirect } from "@reach/router";
import SelectReport from "./select-report.component";
import { useCss } from "kremling";
import InteractionHoursByClientParams from "./interaction-hours-by-client/interaction-hours-by-client-params.component";
import InteractionHoursByClientResults from "./interaction-hours-by-client/interaction-hours-by-client-results.component";
import InteractionsByServiceParams from "./interactions-by-service/interactions-by-service-params.component";
import InteractionsByServiceResults from "./interactions-by-service/interactions-by-service-results.component";
import PovertyLineParams from "./poverty-line/poverty-line-params.component";
import PovertyLineResults from "./poverty-line/poverty-line-results.component";
import GenderParams from "./gender/gender-params.component";
import GenderResults from "./gender/gender-results.component";
import EnglishLevelsParams from "./english-levels/english-levels-params.component";
import EnglishLevelsResults from "./english-levels/english-levels-results.component";
import CountryOfOriginParams from "./country-of-origin/country-of-origin-params.component";
import CountryOfOriginResults from "./country-of-origin/country-of-origin-results.component";
import ClientSourcesParams from "./client-sources/client-sources-params.component";
import ClientSourcesResults from "./client-sources/client-sources-results.component";
import AgesParams from "./ages/ages-params.component";
import AgesResults from "./ages/ages-results.components";

export default function Reports(props: ReportsProps) {
  useFullWidth();
  const scope = useCss(css);

  return (
    <>
      <PageHeader title="Reports" fullScreen />
      <div className="card padding-0" {...scope}>
        <SelectReport>
          <Router>
            <Redirect
              from="/"
              to="/reports/interaction-hours-by-client"
              replace
              noThrow
            />
            <InteractionHoursByClientParams
              path="interaction-hours-by-client"
              title="Interaction Hours By Client"
            />
            <InteractionHoursByClientResults path="interaction-hours-by-client/results" />
            <InteractionsByServiceParams
              path="interactions-by-service"
              title="Interactions by Service"
            />
            <InteractionsByServiceResults path="interactions-by-service/results" />
            <PovertyLineParams
              path="poverty-line"
              title="Client Poverty Line"
            />
            <PovertyLineResults path="poverty-line/results" />
            <EnglishLevelsParams
              path="english-levels"
              title="Client English Levels"
            />
            <EnglishLevelsResults path="english-levels/results" />
            <CountryOfOriginParams
              path="countries-of-origin"
              title="Client Countries of Origin"
            />
            <CountryOfOriginResults path="countries-of-origin/results" />
            <ClientSourcesParams path="client-sources" title="Client Sources" />
            <ClientSourcesResults path="client-sources/results" />
            <AgesParams path="ages" title="Age" />
            <AgesResults path="ages/results" />
            <GenderParams path="genders" title="Gender" />
            <GenderResults path="genders/results" />
          </Router>
        </SelectReport>
      </div>
    </>
  );
}

type ReportsProps = {
  path: string;
};

const css = `
& .report-input {
  display: flex;
  align-items: center;
  padding: 1.6rem 3.2rem 0 3.2rem;
}

& .report-input label {
  margin-right: .8rem;
}

& .actions {
  display: flex;
  justify-content: center;
  padding: 1.6rem 0;
}
`;
