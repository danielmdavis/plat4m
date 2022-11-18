import React from 'react';
import Card from '@material-ui/core/Card';

export default function Proposition(props) {


    return (
        <Card className="Proposition">
            <span>{props.text}</span>
        </Card>
    )
}