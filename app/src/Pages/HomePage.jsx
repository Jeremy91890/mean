import React, {Component} from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const styles = {
    main : {
        margin : "20px",
        width : "900px",
        minHeight : "400px"
    },
    second : {
        margin : "20px",
        width : "900px"
    }
}

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <div>
            <Card style={styles.main} zDepth={1}>
                <CardTitle title="Home Page" subtitle="Card subtitle" />
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>
            <Card style={styles.second} zDepth={1}>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>
            </div>
        )
    }
}

export default HomePage;