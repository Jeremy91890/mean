import React, {Component} from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const styles = {
    main : {
        margin : "20px",
        width : "900px",
        minHeight : "400px"
    }
}

class PleaseLoginPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <Card style={styles.main} zDepth={1}>
                <CardTitle title="Not Authorized" />
                <CardText>
                Please login before trying to access this section
                </CardText>
            </Card>
            </div>
        )       
    }
}
export default PleaseLoginPage;