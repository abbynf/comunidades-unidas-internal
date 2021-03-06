import React from "react";
import AddLeadRow from "./add-lead-row.component";
import { useCss } from "kremling";
import easyFetch from "../util/easy-fetch";
import { FullPartner } from "../admin/partners/partners.component";
import { handlePromiseError } from "../util/error-helpers";

export default function AddLeadsTable({
  leads,
  deleteLead,
  updateLead,
}: AddLeadsTableProps) {
  const scope = useCss(css);
  const [services, setServices] = React.useState([]);
  const [partners, setPartners] = React.useState<FullPartner[]>([]);

  React.useEffect(() => {
    const abortController = new AbortController();
    easyFetch(`/api/services`, {
      signal: abortController.signal,
    })
      .then((data) => {
        setServices(data.services);
      })
      .catch((err) => {
        setTimeout(() => {
          throw err;
        });
      });
  }, []);

  React.useEffect(() => {
    const ac = new AbortController();
    easyFetch(`/api/partners`, { signal: ac.signal })
      .then(setPartners)
      .catch(handlePromiseError);

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <table style={{ width: "100%" }} {...scope}>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>First</th>
          <th style={{ width: "15%" }}>Last</th>
          <th style={{ width: "13%" }}>Phone</th>
          <th style={{ width: "10%" }}>Zip</th>
          <th style={{ width: "6%" }}>Age</th>
          <th style={{ width: "13%" }}>Gender</th>
          <th style={{ width: "10%" }}>Interests</th>
          <th style={{ width: "10%" }}>Referrals</th>
          <th style={{ width: "5%" }}>SMS</th>
          <th style={{ width: "3%" }}></th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead, i) => (
          <AddLeadRow
            key={lead.uuid}
            lead={lead}
            updateLead={(field, value) => updateLead(i, field, value)}
            deleteLead={() => deleteLead(i)}
            canDelete={leads.length > 1}
            isFirstLead={i === 0}
            isLastLead={i === leads.length - 1}
            services={services}
            partners={partners}
          />
        ))}
      </tbody>
    </table>
  );
}

type AddLeadsTableProps = {
  leads: any[];
  deleteLead(index: number): any;
  updateLead(index: number, field: string, value: string): any;
};

const css = `
  & table {
    border-spacing: 0;
    table-layout: fixed;
  }
  & table td, & table th {
    border-collapse: collapse;
    padding: 0;
  }

  & tr select {
    -webkit-appearance: none;
    font-size: 1.8rem;
    padding: .4rem .6rem;
    border-radius: 0;
  }

  & tr input, & tr select {
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgb(238, 238, 238, 0.75);
  }

  & tr:focus-within input, & tr:hover input, & tr:focus-within select, & tr:hover select {
    background: white;
    border: 1px solid var(--very-light-gray);
  }
`;
