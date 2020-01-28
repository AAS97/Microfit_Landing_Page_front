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
        alert('Le nom a été soumis : ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>Se tenir informer de l'avancé du projet</p>
                <div className="Input">
                    <input type="text" id="Firstname" placeholder="Prénom" value={this.state.Firstname} onChange={this.handleChange} />
                    <input type="text" id="Lastname" placeholder="Nom" value={this.state.Lastname} onChange={this.handleChange} />
                    <input type="email" id="Mail" placeholder="Adresse mail" value={this.state.Mail} onChange={this.handleChange} />
                </div>
                <input type="submit" id="Submit" value="Envoyer" />
            </form>
        );
    }

}

export default MailForm;