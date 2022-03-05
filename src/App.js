import React, { Component, Fragment } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api';

import Spinner from './components/UI/Spinner';
import styles from './App.module.css';
import Error from './components/UI/Error';
import image from './images/image.png';

class App extends Component {
  state = {
    data: {},
    country: '',
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    let content;
    if (JSON.stringify(data) === '{}') content = <Spinner />;
    else
      content = (
        <Fragment>
          <Cards data={data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </Fragment>
      );
    if (data.message === 'Request failed with status code 404' || data.message === 'Network Error') return <Error />;
    return (
      <div className={styles.container}>
        <img src={image} alt="covid-19-image" style={{ width: '400px', marginTop: '40px', marginBottom: '30px' }} />
        {content}
      </div>
    );
  }
}

export default App;
