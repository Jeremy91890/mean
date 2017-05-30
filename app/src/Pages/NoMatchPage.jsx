import React, {Component} from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const styles = {
    main : {
        margin : "20px",
        width : "900px",
        minHeight : "400px"
    }
}

class NoMatchPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <Card style={styles.main} zDepth={1}>
                <CardTitle title="404 Page" subtitle="Card subtitle" />
                <CardText>
                Please Go back home
                </CardText>
            </Card>
            </div>
        )       
    }
}

export default NoMatchPage;