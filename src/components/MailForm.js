import React from 'react';
import './mailForm.css'
import Grid from '@material-ui/core/Grid';

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
                    <Grid item xs={50}>
                        <Grid container justify="center" spacing='4'>
                            <Grid key='First' item>
                                <input type="text" id="Firstname" placeholder="Prénom" value={this.state.Firstname} onChange={this.handleChange} />
                            </Grid>
                            <Grid key='Last' item>
                                <input type="text" id="Lastname" placeholder="Nom" value={this.state.Lastname} onChange={this.handleChange} />
                            </Grid>
                            <Grid key='mail' item>
                                <input type="email" id="Mail" placeholder="Adresse mail" value={this.state.Mail} onChange={this.handleChange} />
                            </Grid>
                        </Grid>
                    </Grid>



                </div>
                <input type="submit" id="Submit" value="S'inscrire à la newsletter" />
            </form >
        );
    }

}

export default MailForm;