import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Bar from "../components/Bar";
import { url } from "../components/Variable";
import { supabase } from "../supabaseClient";
import Copyright from "../components/Copyright";

export default function Publication() {
  const [data, setdata] = useState([]);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [sections, setSections] = useState([]);
  const [isLoadingSections, setIsLoadingSections] = useState(false);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  useEffect(() => {
    let data = localStorage.getItem("corpusUserData");
    if (data !== null) {
      setIsloggedIn(true);
    }
    // Fetch publication sections and their publications from Supabase
    const fetchSections = async () => {
      setIsLoadingSections(true);
      try {
        const { data, error } = await supabase
          .from('publication_sections')
          .select('*, publications(*)')
          .order('order', { ascending: true });

        if (error) {
          console.error('Supabase fetch error:', error);
        } else if (data) {
          // Ensure publications are sorted by their order field
          const normalized = data.map((sec) => ({
            ...sec,
            publications: (sec.publications || []).sort((a, b) => (a.order || 0) - (b.order || 0)),
          }));
          setSections(normalized);
        }
      } catch (e) {
        console.error('Error fetching sections', e);
      } finally {
        setIsLoadingSections(false);
      }
    };

    fetchSections();
  }, []);

  const downloadFile = (e) => {
    if (isLoggedIn) {
      window.open(
        url + "/corpus/getCorpusFile/" + e.target.innerText.toLowerCase(),
        "_blank"
      );
    }
  };

  const renderSection = (section) => {
    const items = section.publications || [];

    // For other sections render an ordered list of citation strings
    return (
      <div className="table-responsive">
        <ol>
          {items.map((it, idx) => (
            <li key={it.id || idx} className="mb-3">
              {it.content || it.title}
              {it.url && (
                <span>
                  {' '}
                  <a href={it.url} target="_blank" rel="noreferrer">
                    [link]
                  </a>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div>
      <Bar />
      <div style={{ backgroundColor: "#f0faef", height: "100%" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 p-5">
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                <h2 className="d-flex justify-content-center">
                  <strong>PUBLICATIONS</strong>
                </h2>
                <br />

                <p>
                  PakLocCorp is an ongoing research project based on previous
                  research. Pakistani English has unique characteristics and the
                  addition of Urduized words with and without English morphemes
                  is observed in the current discourse. Researchers willing to
                  explore this corpus, can access data through registration.
                </p>
                <p>
                  PakLocCorp is open for contributions and freely available for
                  research purposes.
                </p>

                <br />
                {isLoadingSections ? (
                  <p>Loading publications...</p>
                ) : (
                  sections.map((section) => (
                    <div key={section.id} className="mb-5">
                      <h4>
                        <strong>{toTitleCase(section.name)}</strong>
                      </h4>
                      {renderSection(section)}
                    </div>
                  ))
                )}
                <Copyright />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}