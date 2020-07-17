import React from 'react';
import './App.css';

import {  combineLatest, timer } from 'rxjs';
import { repeat, map } from 'rxjs/operators';

class App extends React.Component {

    subscribe = [];
    max = 2000;
    min = 100;

    temperature$ = timer(Math.round(Math.random() * (this.max - this.min) + this.min)).pipe(
        repeat(),
        map(() => {
            return {
                value: Math.round(Math.random() * (40 - 20) + 20),
                name: 'temperature',
                time: Date.now()
            }
        }),
    );

    airPressure$ = timer(Math.round(Math.random() * (this.max - this.min) + this.min)).pipe(
        repeat(),
        map(() => {
            return {
                value: Math.round(Math.random() * (800 - 700) + 700),
                name: 'air_pressure',
                time: Date.now()
            }
        })
    );

    humidity$ = timer(Math.round(Math.random() * (this.max - this.min) + this.min)).pipe(
        repeat(),
        map(() => {
            return {
                value: Math.round(Math.random() * (100 - 20) + 20),
                name: 'humidity',
                time: Date.now()
            }
        }),
    );

    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            air_pressure: 0,
            humidity: 0
        }
    };

    componentDidMount() {
        this.subscribe =
            combineLatest(this.temperature$, this.airPressure$, this.humidity$)
                .subscribe(
                    (data) => {
                        data.map((item) => {
                            this.setState({
                                [item.name]: ((item.time + 1000) > Date.now()) ? item.value : 0
                            });
                        });
                    }
            );
    }

    componentWillUnmount() {
        this.subscribe.unsubscribe();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Temperature: <b>{this.state.temperature ? (this.state.temperature + ' C') : 'N.A.'}</b>
                    </p>
                    <p>
                        Air pressure: <b>{this.state.air_pressure ? (this.state.air_pressure + ' Pa') : 'N.A.'}</b>
                    </p>
                    <p>
                        Humidity: <b>{this.state.humidity ? (this.state.humidity + ' %') : 'N.A.'}</b>
                    </p>
                </header>
            </div>
        );
    }
}

export default App;
