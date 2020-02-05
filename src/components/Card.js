import React from "react";
import './card.css';
import persona from '../persona.js';

var classNames = require('classnames');



class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            isClicked: false
        };



    }

    cardClick() {
        let newState = !this.state.isClicked;
        if (newState) {
            this.props.addSelectedCards(this.props.name);
        } else {
            this.props.removeSelectedCards(this.props.name);
        }
        this.setState({
            isClicked: !this.state.isClicked
        });
    }

    cardHover() {
        this.setState({
            isHovered: !this.state.isHovered
        });
    }

    render() {

        this.cardClasses = classNames({
            'card': true,
            'card-clicked': this.state.isClicked,
            'card-hover': !this.state.isClicked && this.state.isHovered
        });
        return (

            <div className={this.cardClasses} onClick={() => this.cardClick()} onMouseEnter={() => this.cardHover()} onMouseLeave={() => this.cardHover()} >
                <h1 className='title'>{persona[this.props.name].title}</h1>
                <p>{persona[this.props.name].desc}</p>
                <img src={persona[this.props.name].icon} alt={persona[this.props.name].title} />
            </div>

        );
    }
}

export default Card;