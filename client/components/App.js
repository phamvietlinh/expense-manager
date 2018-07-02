//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs } from 'react-bootstrap';
import Yeartabsrouter from './tabs/yearTabsRouter';


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedMonth: 'Jan',
            selectedYear: 2016,
            data: [],
            key: 2016
        };
        this.getData = this.getData.bind(this);
    }
    
    componentDidMount() {
        // console.log('componentDidMount - App')


        if(location.search){
            var search = location.search;
            search = search.substring(1);
            var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
            this.setState({
                selectedYear: searchObj.year
            });
            this.getData(this, searchObj.year);
        }else {
            this.getData(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps - App')
        if(nextProps.history.location.search){
            var search = nextProps.history.location.search;
            search = search.substring(1);
            var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
            this.setState({
                selectedYear: searchObj.year
            });
            this.getData(this, searchObj.year);
        }else {
            this.getData(this);
        }

    }

    handleSelect(key) {
        this.setState({
            key: key,
        });
    }


    getData(ev, year, month){
        if(year){
            axios.get('/getAll?year=' + year.toString())
            .then(function(response) {
                ev.setState({data: response.data});
            });
        }else {
            axios.get('/getAll')
            .then(function(response) {
                ev.setState({data: response.data});
            });
        }
        
    }

    

    

    

    


    

    render() {
        var yearParam;
        if(this.props.location.search){
            yearParam = this.props.location.search.split("=")[1];
        }else {
            yearParam = ''
        }
        // console.log(yearParam);

        return (
            <div>
                
                <ul className="nav nav-tabs">
                    <Yeartabsrouter label='All' to='/' />
                    <Yeartabsrouter label='2016' to='?year=2016' />
                    <Yeartabsrouter label='2017' to='?year=2017' />
                    <Yeartabsrouter label='2018' to='?year=2018' />
                    <Yeartabsrouter label='2019' to='?year=2019' />
                    <Yeartabsrouter label='2020' to='?year=2020' />
                    
                </ul>
                
                <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th className='desc-col'>Description</th>
                            <th className='button-col'>Amount</th>
                            <th className='button-col'>Month</th>
                            <th className='button-col'>Year</th>
                            <th className='button-col'>Update</th>
                            <th className='button-col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        this.state.data.map(function(exp, index){
                            // console.log(exp);
                            return  <tr key={index}>
                                        <td className='counterCell'></td>
                                        <td className='desc-col'>{exp.description}</td>
                                        <td className='button-col'>{exp.amount}</td>
                                        <td className='button-col'>{exp.month}</td>
                                        <td className='button-col'>{exp.year}</td>
                                        <td className='button-col'><Update expense={exp} /></td>
                                        <td className='button-col'><Delete id={exp._id} year={yearParam} /></td>
                                    </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}