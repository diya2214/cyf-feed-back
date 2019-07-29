import React from "react"
import { Link } from "react-router-dom"
import logo_CYF_square from '../images/logo-CYF-square.png'

import { Pane, Heading, Text } from 'evergreen-ui'; 

export default () => (

      <Pane 
       borderBottom 
       width="100%" 
       height={60}
       display="flex"
        justifyContent="space-around"
        alignItems="center" >
            <img src={logo_CYF_square} alt="logo" width="80" height="50" />

        <Link
          to={`/`}
          style={{
            textDecoration: "none",
            color: "black"
          }}
        >          
          <h2>
          CYF Feedback </h2>
        </Link>
        <Pane
         width="10%" 
         display="flex"
        justifyContent="space-around"

        >
          
        <Link
          to={`/`}
          style={{
            textDecoration: "none",
            color: "black"
          }}
        >          
          <Heading is="h3">
            Maria </Heading>
        </Link> <Text> | </Text>
        <Link
          to={`/`}
          style={{
            textDecoration: "none",
            color: "black"
          }}
        >          
<Heading is="h3">        
     Register </Heading>
        </Link>
        
        </Pane>
        </Pane>
)
