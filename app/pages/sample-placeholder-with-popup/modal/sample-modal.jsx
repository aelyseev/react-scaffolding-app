import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {noop} from 'lodash';
import PropTypes from 'prop-types';

export default class SampleModal extends Component {
    static propTypes = {
        close: PropTypes.func
    };

    static defaultProps = {
        success: noop,
        close: noop
    };

    render() {
        return (
            <div style={{width: '600px'}}>
                <p>
                    We have only to look on the map at the ragged coast-lines of Greece, Italy, and the British Isles to realize how
                    powerful a
                    factor the sea has been in great civilizations. Russia, like a thirsty giant, has for centuries been struggling to get
                    to
                    the tides which so generously wash the rest of Europe. During the earlier periods of her history she had not a foot of
                    seaboard; and even now she possesses only a meager portion of coast-line for such an extent of territory; one-half of
                    this
                    being, except for three months in the year, sealed up with ice.
                </p>
                <p>
                    <Button bsStyle="primary" onClick={this.props.close}>
                        Press Esc or click this button to close modal window
                    </Button>
                </p>
            </div>
        );
    }
}

