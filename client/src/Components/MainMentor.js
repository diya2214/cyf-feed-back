import React, { Component } from "react";
import "../App.css";
import swal from "sweetalert";
import { getStudents, getSkills, insertComments } from "./Api"
import moment from "moment"


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
  const scrolling = {
    overflow: "auto"
  };

export class MainMentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentSelected: '',
      moduleSelected: null,
      studentsProfile: [],
      techSkills: null,
      mentorComments: ' ',
      commentSubmitted: null,
      moduleSelectionMsg:null,
      student: null 

    };
  }

  componentDidMount = async () => {
    const studentsProfile = await getStudents()
    const techSkills = await getSkills()
    this.setState({
      studentsProfile: studentsProfile,
      techSkills,
      loading: false
    })  
  }
  handleModuleSelection= selected => {
    this.setState({
      moduleSelected: selected,
      mentorComments: null,
      moduleSelectionMsg: null
    });
  };

  handleStudentSelection = (selected) => {
    const student = this.state.studentsProfile.find(s => {
      return s.name === selected;
    });
    this.setState({
      studentSelected: selected,
      student: student, 
      mentorComments: null
    });

  };

handleComments = (e) => {
  if(this.state.moduleSelected === null){    
    this.setState({moduleSelectionMsg : 'Please choose a module by using above dropdown menu'})
    return
}
   const commentData={comments:this.state.commentSubmitted,
      module: this.state.moduleSelected}
      insertComments(this.state.student.name,commentData)
      this.setState({
        mentorComments: this.state.commentSubmitted,
        commentSubmitted: null,
        moduleSelectionMsg: null
       })
};

  render() {
      const studentsProfile = this.state.studentsProfile
      const student = this.state.student
     
    return (
      <div>
        <Pane
          // key={index}
          elevation={4}
          height="100%"
          width="auto"
          padding={20}
          display="flex"
          flexWrap = "wrap"
          justifyContent = "space-around"
          borderRadius={3}
          border="default"
          // background="tint1"
        >
          <Pane
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"  
            padding={20}
            background="orangeTint"

          >
          <Heading is="h2">Select student</Heading>

            <Combobox
              items={studentsProfile.map(s => s.name)}
              height={34}
              onChange={selected => this.handleStudentSelection(selected)}
              placeholder="Students"
              autocompleteProps={{
                title: "Students"
              }}
            />

          </Pane>

        {(student) &&   (
         <Pane
         display="flex"
         marginTop = {10}
         > 
        <Pane 
        elevation={2}
        borderRadius={5}
        height={450} 
        width={500} 
        dislay="flex"
        background="tint1">
        <Avatar
          src={
            student
              ? student.studentPhoto
              : null
          }
          name={
            student
              ? student.name
              : null
          }
          size={85}
          alignSelf= "flex-center"

        />
        <Table.Body>
          <Table.Head>
            <Table.TextCell flexBasis={150} flexShrink={0} flexGrow={0}>
             Name:
            </Table.TextCell>
            
            <Table.TextCell flexBasis={150} flexShrink={0} flexGrow={0}>
              {student &&
                student.name}
            </Table.TextCell>
          </Table.Head>
          <Table.Body>
          <Table.Row>
              <Table.TextCell flexBasis={150} flexShrink={0} flexGrow={0}>
                 Class:
              </Table.TextCell>
              <Table.TextCell>
              {student &&
                  student.class}
              </Table.TextCell>
            </Table.Row>
            <Table.Row>
              <Table.TextCell flexBasis={150} flexShrink={0} flexGrow={0}>
                 Soft Skills:
              </Table.TextCell>
              <Table.TextCell>
              {student &&
                  student.softSkills.join(', ')}
              </Table.TextCell>
            </Table.Row>
             <Table.Row>
              <Table.TextCell flexBasis={150} flexShrink={0} flexGrow={0}>
                Technical Skill:
              </Table.TextCell>
              <Table.TextCell>
                {student &&
                  student.techinalSkills.join(', ')}
              </Table.TextCell>
            </Table.Row>
            
            
            <Table.Row intent="warning">
              <Table.TextCell flexBasis={150} flexShrink={1} flexGrow={0}>
              Evaluation Summary:
              </Table.TextCell >
              </Table.Row>
              <Paragraph>
                {student &&
                  this.state.mentorComments}
                  </Paragraph>
            </Table.Body>
            </Table.Body>

      </Pane>       
      <Pane
          width="auto"
          height="100%"
          marginLeft={20}
          padding={10}
          display="flex"
          // flexDirection= "column"
          justifyContent = "space-around"
          borderRadius={3}
          elevation={2}
          background="tint1"
        >

        <Pane
          display="flex"
          height= {340}
          flexDirection= "column"
          marginLeft={20}
          justifyContent="space-around"          
         >
        <Heading is="h2">Student Evaluation Summary</Heading>

        <Combobox
               openOnFocus
              items={this.state.techSkills.map(s => s.module)}
              height={34}
              onChange={selected => this.handleModuleSelection(selected)}
              placeholder="Select Module"
              autocompleteProps={{
              title: "Select Module"
              }}
            />
            <Heading color="#FF0000">
                    {" "}
                    {this.state.moduleSelectionMsg}
                  </Heading>
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
                marginTop={8}
                alignSelf= "flex-end"
                onClick={this.handleComments}
              >
                Submit
              </Button>
              </Pane >
                </Pane>
                <Pane 
                style={scrolling}
                marginLeft={20} 
                width="28em"
                height = {400}>
                <Heading is="h2">Mentors Comments: </Heading>

              {/* {console.log(this.state.moduleSelected)} */}
          {(this.state.moduleSelected) &&                                      
                      (student.floatingMentorcomments
                        .filter(mentorComments=>mentorComments.module===this.state.moduleSelected).map(floatingMentor=>{
                        return(
                          <Pane 
                          elevation={3}                            
                          marginLeft={2}
                          marginBottom = {10}
                          height="auto" 
                          padding={10}
                          width= "25em"
                          background="tint2" 
                          borderRadius={3}
                          display="flex"
                          flexDirection="column">
                              <Paragraph  marginTop="default">

                            {floatingMentor.comment}
                            </Paragraph>
                            <Text padding={10} alignSelf= "flex-end"> 
                              <Strong> By </Strong> {floatingMentor.floatingMentorName} <Strong>on</Strong> {moment(floatingMentor.date).format("Do MMMM  YYYY")}</Text>
                            </Pane>

                       )} ))}

         </Pane>
         
      
      </Pane> )}                                   
      </Pane>

                          

      </div>
    );
  }
}
export default MainMentor;
