import React from 'react';
import './mailForm.css'

class MailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Firstname: '',
            Lastname: '',
            Mail: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        //alert('Le nom a été soumis : ' + this.state.value);
        event.preventDefault();
        this.props.setUserInfo(this.state);
        this.props.handleSubmit();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>Se tenir informé de l'avancée du projet</p>
                <div className="Input">
                    <input type="text" id="Firstname" placeholder="Prénom" value={this.state.Firstname} onChange={this.handleChange} />
                    <input type="text" id="Lastname" placeholder="Nom" value={this.state.Lastname} onChange={this.handleChange} />
                    <input type="email" id="Mail" placeholder="Adresse mail" value={this.state.Mail} onChange={this.handleChange} />
                </div>
                <input type="submit" id="Submit" value="Je m'inscrit à la newsletter Microfit" />
            </form>
        );
    }

}

export default MailForm;