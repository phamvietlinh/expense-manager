//client/components/Delete.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Delete extends React.Component {
	constructor(){
	  	super();
	  	this.state = {id: ''};
	  	// this.onClick = this.onClick.bind(this);
	  	this.delete = this.delete.bind(this);
	}

	componentDidMount() {
	    this.setState({
	      	id: this.props.id
	    })
	    // console.log('abc')
	}

	componentWillReceiveProps(nextProps) {
      	
      	this.setState({
	      	id: nextProps.id
	    })
	    // console.log('nextProps - delete');
    }

	delete(){
	    // this.props.onClick(this.state.id);
	    axios.get('/delete?id=' + this.state.id)
	      .then(function(response) {
	          
	    });
	}

	render(){
	    var year = this.props.year;
	    var search = (this.props.year === '')? '': '?year=' + this.props.year;
	    // console.log(this.props.year);
	    return (
	        <Button bsStyle="danger" bsSize="small" onClick={this.delete}>
	            <Link to={{pathname: '', search: search }} style={{ textDecoration: 'none' }}>
	                <span className="glyphicon glyphicon-remove"></span>
	            </Link>
	        </Button>
	    )
 	}
}
export default Delete;