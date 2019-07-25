import React, { Component } from "react";
import "../App.css";
import mockStudentsProfiles from "../mockStudentsProfiles.json";
import { getStudent } from "./Api"

import {
  Button, 
  Pane, 
  Combobox, 
  Table, 
  Avatar, 
  Heading,
  Text,
  Strong,
  Textarea,
  
  Paragraph } from "evergreen-ui"

export class FloatingMentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentSelected: '',
      moduleSelected: null,
      selectedStudentProfile: null,
      mentorComments: ' ',
      commentSubmitted: null
    };
  }

  // componentWillMount = async () => {
  //   if(this.state.studentSelected){
  //   const  studentSelected  = this.state.studentSelected
  //   console.log(studentSelected)
  //   const selectedStudentProfile = await getStudent(studentSelected)
  //   this.setState({
  //     selectedStudentProfile,
  //     loading: false
  //   })
  // }
  // }
  handleModuleSelection= selected => {
    this.setState({
      moduleSelected: selected,
      mentorComments: null
    });
  };

  handleStudentSelection = async(selected) => {
    const selectedStudentProfile = await getStudent(selected)

    this.setState({
      studentSelected: selected,
      mentorComments: null
    });

  };

handleComments = (e) => {
  this.setState({
    mentorComments: this.state.commentSubmitted,
    commentSubmitted: null

  })
};


  
  render() {
     var selectedStudentProfile = mockStudentsProfiles.find(s => {
       return s.name === this.state.studentSelected;
     });
     console.log(this.state.mentorComments);
     
    return (
      <div>
        <Pane
          // key={index}
          elevation={4}
          height="auto"
          width="auto"
          padding={20}
          position="center"
          display="flex"
          flexWrap = "wrap"
          alignItems="center"
          borderRadius={3}
          border="default"
          background="blueTint"
        >
          <Pane
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Combobox
             
              items={mockStudentsProfiles.map(s => s.name)}
              height={38}
              onChange={selected => this.handleStudentSelection(selected)}
              placeholder="Students"
              autocompleteProps={{
                title: "Students"
              }}
            />

          </Pane>

        {(selectedStudentProfile) &&   (
         <Pane
         display="flex"
         alignItems = "flex-start"
         marginTop = {5}
         > 
        <Pane height="auto" width={500} float="left">
        <Avatar
          src={
            selectedStudentProfile
              ? selectedStudentProfile.studentPhoto
              : null
          }
          name={
            selectedStudentProfile
              ? selectedStudentProfile.name
              : null
          }
          size={80}
        />
        <Table.Body>
          <Table.Head>
            <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0}>
              Student Name:
            </Table.TextCell>
            <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0}>
              {selectedStudentProfile &&
                selectedStudentProfile.name}
            </Table.TextCell>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0}>
                Students Soft Skill:
              </Table.TextCell>
              <Table.TextCell>
              {selectedStudentProfile &&
                  selectedStudentProfile.softSkills}
              </Table.TextCell>
            </Table.Row>
            <Table.Row>
              <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0}>
                Students Tech Skill:
              </Table.TextCell>
              <Table.TextCell>
                {selectedStudentProfile &&
                  selectedStudentProfile.techinalSkills}
              </Table.TextCell>
            </Table.Row>
            
            
            <Table.Row intent="success">
              <Table.TextCell flexBasis={200} flexShrink={1} flexGrow={0}>
              Evaluation Summary:
              </Table.TextCell >
              </Table.Row>
              <Table.Row height="auto" paddingY={12}>
              <Paragraph>
                {selectedStudentProfile &&
                  this.state.mentorComments}
                  </Paragraph>
            </Table.Row>
            </Table.Body>
            </Table.Body>

      </Pane>       
      
      <Pane
          width="auto"
          height="auto"
          marginLeft={20}
          padding={10}
          display="flex"
          flexDirection= "column"
          justifyContent = "space-between"
          borderRadius={3}
          background="blueTint"
        >
          <Heading is="h2">Mentors Comments: </Heading>
              {/* {console.log(this.state.moduleSelected)} */}
          {(this.state.moduleSelected) &&                                      
                      (selectedStudentProfile.floatingMentorcomments
                        .filter(mentorComments=>mentorComments.module===this.state.moduleSelected).map(floatingMentor=>{
                        return(
                          <Pane 
                          elevation={3}                            
                          marginLeft={2}
                          marginBottom = {10}
                          height="auto" 
                          padding={10}
                          width= {400}
                          background="tint2" 
                          borderRadius={3}
                          display="flex"
                          flexDirection="column">
                              <Paragraph  marginTop="default">

                            {floatingMentor.comment}
                            </Paragraph>
                            <Text padding={10} alignSelf= "flex-end"> 
                              <Strong> By </Strong> {floatingMentor.floatingMentorName} <Strong>on</Strong> {floatingMentor.date}</Text>
                            </Pane>

                       )} ))}

         </Pane>
         <Pane
          display="flex"
          height= {320}
          flexDirection= "column"
          marginLeft={20}
          justifyContent = "space-between"



    >
        <Heading is="h2">Student Evaluation Summary</Heading>

        <Combobox
             
              items={['HTML - CSS', 'JS-Core', 'JS-Core2', 'JS-Core3','React','Node DB']}
              height={38}
              onChange={selected => this.handleModuleSelection(selected)}
              placeholder="Select Module"
              autocompleteProps={{
              title: "Select Module"
              }}
            />
         <Textarea
      height={200}
      width={400}
      placeholder="Mentor evaluation summary"
      onChange={e => this.setState({ commentSubmitted: e.target.value })}
      // value={this.state.mentorComments}
    />
    
              <Button
                height={38}
                width={80}
                appearance="primary"
                marginTop={10}
                alignSelf= "flex-end"
                onClick={this.handleComments}
              >
                Submit
              </Button>
              </Pane>
    
      
      </Pane> )}                                   
      </Pane>

                          

      </div>
    );
  }
}
export default FloatingMentor;


/*


*/