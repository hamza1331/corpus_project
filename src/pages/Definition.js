import React from "react";
export default function List() {
  return (
    <div>
      <div className="container">
        <br />
        <div className="container row">
          &nbsp;
          <div style={{ color: "#b03e41" }}>
            <h4>Definition of 'hunchback'</h4>
          </div>
          <div className="float-start col-md-4 col-sm-4">
            <br />
            <h2>hunchback</h2>
            <p>
              <span>
                <strong>Collins</strong>
              </span>{" "}
              COBUILD
            </p>
            <br />
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp;
          <div className="float-end col-md-4 col-sm-4">
            <br />
            <br />
            <h6>
              Word Frequency &nbsp;
              <i
                class="fa fa-ellipsis-h fa-2x"
                style={{ position: "absolute", color: "#b03e41" }}
                aria-hidden="true"
              ></i>
            </h6>

            <i class="fa fa-share-alt-square  fa-3x"></i>
          </div>
        </div>
        <div>
          &nbsp; &nbsp; &nbsp; Words forms: plural hunch backs &nbsp;{" "}
          <span>
            <i
              class="fa fa-volume-up fa-lg"
              style={{ color: "#b03e41" }}
              aria-hidden="true"
            ></i>{" "}
            &nbsp;{" "}
            <i
              class="fa fa-info-circle fa-lg"
              aria-hidden="true"
              style={{ color: "grey" }}
            ></i>
          </span>
          <br />
          <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          <span style={{ color: "#b03e41" }}>
            <strong>COUNTABLE NOUN</strong>
          </span>
          <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          <span>
            <strong>
              A <span style={{ color: "#b03e41" }}>hunch back</span> is someone who
              has a large lump on their back because their spine is curved.
            </strong>{" "}
          </span>
          <br />
          <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          <span>
            <strong>[Offensive, old-fashioned]</strong>{" "}
          </span>
        </div>
        <br />
        <span style={{ color: "#b03e41" }}>
          COBUILD ADVANCED ENGLISH DICTIONARY. Copy right &copy; HyperCollins
          Publishers
        </span>
      </div>
    </div>
  );
}
