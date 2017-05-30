import React, {Component} from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const styles = {
    main : {
        margin : "20px",
        width : "900px",
        minHeight : "400px"
    }
}

class AboutPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <Card style={styles.main} zDepth={1}>
                <CardTitle title="About" subtitle="Card subtitle" />
                <CardText>
                </CardText>
            </Card>
            </div>
        )       
    }
}

export default AboutPage;