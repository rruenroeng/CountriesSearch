import React from "react";
import CountriesSearch from "./CountriesSearch";
import CollectionResult from "./CollectionResult";
import ResultsTable from "./ResultsTable";
import SearchCard from "./SearchCard";
import SearchTable from "./SearchTable";
import "./Styles/App.css";

class App extends React.Component {
  state = { countries: [] };
  handleSubmit = async (e) => {
    const data = await this.submitQuery(e);
    if (data.found !== 0) {
      /*State types:
      lastSearchType: string
      found: boolean
      countries: Array of country objects (see index.php definition)
      regions: Object {<region>:count,<region2>:count2}
      subregions: Object {<subregion>:count,<subregion2>:count2}
      */
      this.setState({
        lastSearchType: e[0],
        found: true,
        countries: data.countryData,
        regions: data.regions,
        subregions: data.subregions,
      });
    }
  };

  submitQuery = async (str) => {
    try {
      const res = await fetch("http://localhost:8765/api/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(str),
        mode: "cors",
      });

      const jsonData = await res.json();

      if (jsonData.error) {
        let error = new Error();
        error.status = jsonData.error.status || 500;
        error.message =
          jsonData.error.message || "There was an error fetching the data";
        throw error;
      } else {
        this.setState({
          lastSearchType: "",
          found: false,
          countries: [],
          regions: {},
          subregions: {},
        });
        return jsonData;
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: err });
    }
  };
  renderContent() {
    return (
      <div className="App">
        <h3> Countries Finder</h3>
        <div className="divider"></div>
        <div className="section">
          <CountriesSearch searchTitle="Search for a Country">
            <SearchTable>
              <SearchCard
                placeholder="Country Name"
                name="Name"
                id="name"
                type="text"
                class="validate"
                SubmitHandler={this.handleSubmit}
              />
              <SearchCard
                placeholder="Country Full Name"
                name="Full Name"
                id="full_name"
                type="text"
                class="validate"
                SubmitHandler={this.handleSubmit}
              />
              <SearchCard
                placeholder="Country Code"
                name="Code"
                id="code"
                type="text"
                class="validate"
                SubmitHandler={this.handleSubmit}
              />
            </SearchTable>
          </CountriesSearch>
        </div>
        <div className="section">
          <h4>{this.state.lastSearchType} Results </h4>
          {this.state.found === false && <h5>Sorry, no results.</h5>}
          <ResultsTable>
            {this.state.countries.map((country, index) => (
              <CollectionResult
                key={index}
                fullName={country.full_name}
                flagPng={country.flagPng}
                ac2={country.ac2}
                ac3={country.ac3}
                region={country.region}
                subRegion={country.subregion}
                pop={country.population}
                languages={country.languages}
              />
            ))}
            {this.state.found === true && (
              <h5>Total Countries Found: {this.state.countries.length}</h5>
            )}
            <div className="row">
              <div className="col s6">
                {this.state.found && <h6>{"Regions Represented:"}</h6>}
                {this.state.regions &&
                  Object.keys(this.state.regions).map((region, index) => (
                    <div key={index}>
                      {region + ": " + this.state.regions[region]}
                    </div>
                  ))}
              </div>
              <div className="col s6">
                {this.state.found && <h6>{"Subregions Represented:"}</h6>}
                {this.state.subregions &&
                  Object.keys(this.state.subregions).map((subregion, index) => (
                    <div key={index}>
                      {`${subregion}:${this.state.subregions[subregion]}`}
                    </div>
                  ))}
              </div>
            </div>
          </ResultsTable>
        </div>
      </div>
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default App;
