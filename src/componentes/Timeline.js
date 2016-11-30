import React, { Component } from 'react';
import FotoItem from './FotoItem';
import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';
import TimelineStore from '../actions/TimelineStore';


export default class Timeline extends Component {
	

	constructor(props){
		super();
		let urlTimeline;
		if(props.login === undefined) {
			urlTimeline = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
		} else {
			urlTimeline = `http://localhost:8080/api/public/fotos/${props.login}`;
		}	

		this.urlTimeline = urlTimeline;		
		this.state = {fotos:[]};										 		
	}	

	componentWillMount(){
		this.props.store.subscribe(() => {			
			this.setState({fotos:this.props.store.getState()});
		});		 
	}

	componentDidMount(){			
		this.props.store.dispatch(TimelineStore.lista(this.urlTimeline));
	}

	componentWillReceiveProps(nextProps){		
		if(nextProps.login !== undefined){
			this.urlTimeline = `http://localhost:8080/api/public/fotos/${nextProps.login}`;
			this.props.timelineStore.lista(this.urlTimeline);
		}
	}

  like(fotoId,likeada) {		
	this.props.store.like(Timeline.like(fotoId,likeada));	  
  }

  comenta(fotoId,texto){		
	  this.props.timelineStore.comenta(fotoId,texto);
  }



	render(){
        return (<div className="fotos container">
			<ReactCSSTransitionGroup 
			transitionName="timeline"
		    transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>		
						{
							this.state.fotos.map(foto => {
								return <FotoItem key={foto.id} foto={foto} comentaCallback={this.comenta.bind(this)} likeCallback={this.like.bind(this)}/>;
							})
						} 
			</ReactCSSTransitionGroup>         			                   		
		</div>        
        		);
	}
}