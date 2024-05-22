import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import "./search.css";

import { Hit } from "../Hit";

const searchClient = algoliasearch(
    "ESHJYQKU33",
    "aea7fd7e6bb0aa76a919b3fef7ea4de5"
);

export const Search = () => {
    return (
        <InstantSearch searchClient={searchClient} indexName="airports">
            <Configure hitsPerPage={5} />
            <div className="ais-InstantSearch">
                <SearchBox />
                <Hits hitComponent={Hit} />
            </div>
        </InstantSearch>
    );
};
