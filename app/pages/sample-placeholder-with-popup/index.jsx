import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';

import SampleModal from 'pages/sample-placeholder-with-popup/modal/sample-modal';

import Portal from '../../components/portal/index';

export default class SamplePlaceholderWithPopup extends Component {
    state = {
        modal: false
    };

    close = () => this.setState({modal: false});

    render() {
        return (
            <div>
                <h1>Primitive Conditions and Races</h1>
                <p>
                    The topography of a country is to some extent a prophecy of its future. Had there been no Mississippi coursing for three
                    thousand miles through the North American Continent, no Ohio and Missouri bisecting it from east to west, no great
                    inland seas indenting and watering it, no fertile prairies stretching across its vast areas, how different would have
                    been the history of our own land.
                </p>
                <p>
                    Russia is the strange product of strange physical conditions. Nature was not in impetuous mood when she created this
                    greater half of Europe, nor was she generous, except in the matter of space. She was slow, sluggish, but inexorable. No
                    volcanic energies threw up rocky ridges and ramparts in Titanic rage, and then repentantly clothed them with lovely
                    verdure as in Spain, Italy, and elsewhere. No hungry sea rushed in and tore her coast into fragments. It would seem to
                    have been just a cold-blooded experiment in subjecting a vast region to the most rigorous and least generous conditions
                    possible, leaving it unshielded alike from Polar winds in winter or scorching heat in summer, divesting it of beauty and
                    of charm, and then casting this arid, frigid, torpid land to a branch[…]
                </p>
                <Alert onClick={() => this.setState({modal: true})}>
                    Click to see more with popup
                </Alert>
                <Portal requestToClose={this.close} visibility={this.state.modal}>
                    <SampleModal close={this.close} />
                </Portal>
            </div>
        );
    }
}
