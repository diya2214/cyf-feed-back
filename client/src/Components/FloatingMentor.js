import React, { Component } from "react";
import {
  Button,
  Pane,
  Combobox,
  TextInput,
  Table,
  Avatar,
  Heading,
  Paragraph,
  Text,
  Strong
} from "evergreen-ui";
import "../App.css";
// import mockStudentsProfiles from "../mockStudentsProfiles.json";
import {getStudents, getSkills} from "./Api";

const selectedFloatingMentorName = "Maria";

const h3Style = {
  color: "red"
};

const submitStyle = {
  fontSize: "20px"
};

export class FloatingMentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedStudent: null,
      selectedStudentProfile: null,
      FloatingMentorComments: null,
      commentSubmitted: null,
      errormessage: null,
      moduleSelected: null,
      mentorComments: " ",
      studentsProfile: [],
      techSkills: null
    };
  }

  /*
         componentWillMount() {
           fetch(`api/student/Ahmet`)
             .then(res => res.json())
             .then(student => {
               console.log(student);
             });
         }
  
         handyComments = e => {
           console.log("handyComments working");
           {
             this.state.moduleSelected === null
               ? this.handleError()
               : this.setState({
                   FloatingMentorComments: this.state.commentSubmitted
                 });
           }};
         */

  componentDidMount = async () => {
    const studentsProfile = await getStudents();
    const techSkills = await getSkills();
    this.setState({
      studentsProfile: studentsProfile,
      techSkills,
      loading: false
    });
  };

  handyStudent = (selected) => {
    console.log("handystudent working....");
    const selectedStudentProfile = this.state.studentsProfile.find(s => {
      return s.name === selected;
    });
    this.setState({
      clickedStudent: selected,
      errormessage: null,
      selectedStudentProfile: selectedStudentProfile
    });

    //    const selectedStudentProfile = await getStudent(selected);

  //  this.setState({
  //    selectedStudentProfile: await getStudents(selected)
  //  });
    console.log("this.state.selectedStudentProfile:");
    console.log(this.state.selectedStudentProfile);
  };

  handyComments = async e => {
    e.preventDefault();
    console.log("handyComments working");

    /*
    const {
      clickedStudent,
      floatingmentorcomment,
      moduleSelected
    } = this.state;
   */

    {
      this.state.moduleSelected === null
        ? this.handleError()
        : this.setState({
            FloatingMentorComments: this.state.commentSubmitted
          });
    }

    console.log("moduleSelected , name, floatingmentorcomment");
    try {
      const res = await fetch("api/updateComments", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.clickedStudent,
          floatingmentorcomment: this.state.commentSubmitted,
          floatingMentorName: selectedFloatingMentorName,
          selectedmodule: this.state.moduleSelected
        })
      });
      console.log("fetch:", body);
      const json = await res.json();
      if (res.status !== 200) {
        alert(json.msg);
      } else {
        console.log("else working");
      }
      const student = await res;
      console.log("student:", student);
      this.setState({
        studentprofile: student
      });
    } catch (err) {
      console.log(err);
    }
    
  };

  handleError = () => {
    console.log("handleError working");
    this.setState({
      errormessage: "Please Choose A Modul by using below dropdown menu"
    });
  };

  handleModuleSelection = selected => {
    console.log("handle Module working....", selected);
    this.setState({
      moduleSelected: selected,
      mentorComments: null,
      errormessage: null
    });
  };

  render() {
    console.log("this.state.studentprofile:", this.state.studentprofile);
    console.log("render working");

    //  var selectedStudentProfile = mockStudentsProfiles.filter(s => {
    //    return s.name === this.state.clickedStudent;
    //  /});

    // this.setState({
    //  clickedStudent: this.state.selectedStudentProfile
    // });

    console.log(this.state.FloatingMentorComments);
    console.log(
      "this.state.selectedStudentProfile[0]:",
      this.state.selectedStudentProfile
    );

    const studentsProfile = this.state.studentsProfile;
    const selectedStudentProfile = this.state.selectedStudentProfile;
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
          flexWrap="wrap"
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
              // studentsProfile.map(s => s.name)

              items={studentsProfile.map(s => s.name)}
              height={48}
              onChange={selected => this.handyStudent(selected)}
              placeholder="Students"
              autocompleteProps={{
                title: "Students"
              }}
            />
          </Pane>
          {this.state.selectedStudentProfile && (
            <Pane>
              <Pane height="auto" width={500} float="left">
                <Avatar
                  src={
                    this.state.selectedStudentProfile
                      ? this.state.selectedStudentProfile.studentPhoto
                      : null
                  }
                  name={
                    this.state.selectedStudentProfile
                      ? this.state.selectedStudentProfile.name
                      : null
                  }
                  size={80}
                />
                <Table.Body>
                  <Table.Head>
                    <Table.TextCell
                      flexBasis={200}
                      flexShrink={0}
                      flexGrow={0}
                    >
                      Student Name:
                    </Table.TextCell>
                    <Table.TextCell
                      flexBasis={200}
                      flexShrink={0}
                      flexGrow={0}
                    >
                      {this.state.selectedStudentProfile &&
                        this.state.selectedStudentProfile.name}
                    </Table.TextCell>
                  </Table.Head>
                  <Table.Body>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={200}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        Students Soft Skill:
                      </Table.TextCell>
                      <Table.TextCell>
                        {this.state.selectedStudentProfile &&
                          this.state.selectedStudentProfile.softSkills}
                      </Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={200}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        Students Tech Skill:
                      </Table.TextCell>
                      <Table.TextCell>
                        {this.state.selectedStudentProfile &&
                          this.state.selectedStudentProfile.techinalSkills}
                      </Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={200}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        Timeline:
                      </Table.TextCell>
                      <Table.TextCell>
                        {this.state.selectedStudentProfile && (
                          <a
                            target="_blank"
                            href="https://tinyurl.com/CYF-LDN5CALENDAR"
                          >
                            CYF London-5 Class Timeline
                          </a>
                        )}
                      </Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={200}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        Syllabus:
                      </Table.TextCell>
                      <Table.TextCell>
                        {this.state.selectedStudentProfile && (
                          <a
                            target="_blank"
                            href="https://codeyourfuture.github.io/syllabus-master/html-css/week-01/lesson.html"
                          >
                            CYF London-5 Class Syllabus
                          </a>
                        )}
                      </Table.TextCell>
                    </Table.Row>
                  </Table.Body>
                </Table.Body>
              </Pane>

              <Pane height={500} width={500} float="left">
                <Pane
                  width="auto"
                  height="auto"
                  marginLeft={40}
                  padding={10}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  borderRadius={3}
                  background="blueTint"
                >
                  <Heading>Current Session's Comment:</Heading>
                  <br />
                  <Pane
                    elevation={3}
                    marginLeft={36}
                    marginBottom={10}
                    height={100}
                    padding={10}
                    width={400}
                    background="tint2"
                    borderRadius={3}
                  >
                    <strong style={submitStyle}>
                      {this.state.selectedStudentProfile &&
                        this.state.FloatingMentorComments}
                    </strong>
                    {this.state.FloatingMentorComments && (
                      <div>
                        <br /> by {selectedFloatingMentorName} <br />
                      </div>
                    )}
                  </Pane>
                </Pane>

                <Pane
                  width="auto"
                  height="auto"
                  marginLeft={40}
                  padding={10}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  borderRadius={3}
                  background="blueTint"
                >
                  <Heading>
                    Previous Comments about{" "}
                    <strong>
                      {this.state.selectedStudentProfile &&
                        this.state.selectedStudentProfile.name}
                    </strong>{" "}
                    writen by Irregular Mentor (
                    <strong>{selectedFloatingMentorName}</strong>
                    ):
                  </Heading>
                  {console.log(
                    "selectedStudentProfile[0] result=>",
                    this.state.selectedStudentProfile.floatingMentorcomments
                  )}
                  {this.state.selectedStudentProfile
                    ? this.state.selectedStudentProfile.floatingMentorcomments.map(
                        s => {
                          if (
                            s.floatingMentorName ===
                            selectedFloatingMentorName
                          )
                            return (
                              <Pane
                                elevation={3}
                                marginLeft={36}
                                marginBottom={10}
                                height="auto"
                                padding={10}
                                width={400}
                                background="tint2"
                                borderRadius={3}
                              >
                                <Paragraph marginTop="default">
                                  {s.comment}
                                </Paragraph>
                                <Text padding={100}>
                                  <Strong>Feedback by </Strong>
                                  {s.floatingMentorName} on {s.date} <br />
                                  <Text padding={100}>
                                    {" "}
                                    <strong> Module: </strong> {s.module}{" "}
                                  </Text>
                                </Text>
                              </Pane>
                            );
                          else return "";
                        }
                      )
                    : null}
                </Pane>
              </Pane>
              <Pane>
                <Combobox
                  items={this.state.techSkills.map(s => s.module)}
                  height={38}
                  onChange={selected =>
                    this.handleModuleSelection(selected)
                  }
                  placeholder="Select Module"
                  autocompleteProps={{
                    title: "Select Module"
                  }}
                />
                <h3 style={h3Style}> {this.state.errormessage}</h3>
                <TextInput
                  width="100%"
                  height={48}
                  alignItems="right"
                  width={800}
                  placeholder="Irregular Mentor's Comments..."
                  onChange={e =>
                    this.setState({
                      commentSubmitted: e.target.value
                    })
                  }
                />
                <Button
                  height={48}
                  appearance="primary"
                  marginLeft={30}
                  onClick={this.handyComments}
                >
                  Submit
                </Button>
              </Pane>
            </Pane>
          )}
        </Pane>
      </div>
    );
  }
}
export default FloatingMentor;
