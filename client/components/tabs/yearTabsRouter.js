//client/components/tabs/yearTabsRouter.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Tab, Tabs } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
// class YearTabsRouter extends React.Component {
// 	constructor(){
// 	  		super();
// 	  		this.state={style:{'fontSize': '16px'}}
// 	}

// 	render(){
// 	   return (
// 	   		<Link to={{pathname: '/', search: '?month=All&year=' + this.props.year }} >
// 	     		<p style={this.state.style}>{this.props.year}</p>
// 	    	</Link>
// 	    )
// 	}
// }
// export default YearTabsRouter;







import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';



const MenuLink = ({label, to, activeOnlyWhenExact}) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({match}) => {
            var active = match? 'active': '';
            return (
                <li role="presentation" className={active}>
                    <Link to={to}>{label}</Link>
                </li>
            )
        }} />
    )
}



             {/*<MenuLink key={index} label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} />*/}


export default MenuLink;
