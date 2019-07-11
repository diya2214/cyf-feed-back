import React, { Component } from "react";
import { getMessage } from "../service";
import { Button, Pane } from 'evergreen-ui'; 
import {Link} from 'react-router-dom'
import "../App.css";

export class MainPage extends Component {

  state = { message: "Loading..." };

  componentDidMount() {
    getMessage().then((message) => this.setState({ message }));
  }

  render() {
    const { message } = this.state;
    return (
      <Pane
      width="100%"
      height={700}
      display = "flex"
      justifyContent="center"
      alignItems="center"
      >
<Pane
      // key={index}
      elevation={4}
      height={250}
      width={800}
      padding={16}
      display = "flex"
      alignItems="center"
      borderRadius={3}
      border="default"
      background="blueTint"
      >
      
      <Pane width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">

<Button
appearance="primary"
height={40}
margin={24}
onClick={() => handleStudent()}
>
Student  </Button>

<Button
appearance="primary"
height={40}
margin={24}
>
Floating Mentor  </Button>

<Button
  appearance="primary"
  height={40}
  margin={24}
  >
  <Link to='/mentor'>CYF Mentor </Link>
 </Button>
</Pane>
</Pane>

</Pane>
   );
  }
}
export default MainPage;
