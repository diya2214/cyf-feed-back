import React, { Component } from "react";
import moment from "moment";
import {
  Button,
  Pane,
  Combobox,
  Table,
  Avatar,
  Heading,
  Paragraph,
  Text,
  Strong,
  Textarea
} from "evergreen-ui";
import "../App.css";
import { getStudents, getSkills } from "./Api";
import Axios from "axios";

const selectedFloatingMentorName = "Maria";

const scrolling = {
  overflow: "auto"
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
  componentDidMount = async () => {
    const studentsProfile = await getStudents();
    const techSkills = await getSkills();
    this.setState({
      studentsProfile: studentsProfile,
      techSkills,
      loading: false
    });
  };

  handyStudent = selected => {
    const selectedStudentProfile = this.state.studentsProfile.find(s => {
      return s.name === selected;
    });
    this.setState({
      clickedStudent: selected,
      errormessage: null,
      selectedStudentProfile: selectedStudentProfile
    });
  };

  handyComments = async e => {
    e.preventDefault();
    {
      this.state.moduleSelected === null
        ? this.handleError()
        : this.setState({
            FloatingMentorComments: this.state.commentSubmitted
          });
    }

    if (this.state.moduleSelected !== null) {
      try {
        const result = await Axios.put("api/updateComments", {
          name: this.state.clickedStudent,
          floatingmentorcomment: this.state.commentSubmitted,
          floatingMentorName: selectedFloatingMentorName,
          selectedmodule: this.state.moduleSelected
        });
        return result;
      } catch (error) {
        swal("Error", "Could not add your comments", "error");
      }

      this.setState({
        studentprofile: student,
        selectedStudentProfile: selectedStudentProfile
      });
    }
  };

  handleError = () => {
    this.setState({
      errormessage: "Please choose a module by using above dropdown menu."
    });
  };

  handleModuleSelection = selected => {
    this.setState({
      moduleSelected: selected,
      mentorComments: null,
      errormessage: null
    });
  };

  render() {
    const studentsProfile = this.state.studentsProfile;
    return (
      <div>
        <Pane
          elevation={4}
          height="100%"
          width="auto"
          padding={20}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          borderRadius={3}
          border="default"
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
              onChange={selected => this.handyStudent(selected)}
              placeholder="Students"
              autocompleteProps={{
                title: "Students"
              }}
            />
          </Pane>
          {this.state.selectedStudentProfile !== null && (
            <Pane display="flex" marginTop={10}>
              <Pane
                elevation={2}
                borderRadius={5}
                height={400}
                width={500}
                dislay="flex"
                background="tint1"
              >
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
                  size={85}
                />
                <Table.Body>
                  <Table.Head>
                    <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
                      Name:
                    </Table.TextCell>
                    <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
                      {this.state.selectedStudentProfile &&
                        this.state.selectedStudentProfile.name}
                    </Table.TextCell>
                  </Table.Head>
                  <Table.Body>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={100}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        Class:
                      </Table.TextCell>
                      <Table.TextCell>
                        {this.state.selectedStudentProfile &&
                          this.state.selectedStudentProfile.class}
                      </Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={100}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        Soft Skills:
                      </Table.TextCell>
                      <Table.TextCell>
                        {this.state.selectedStudentProfile &&
                          this.state.selectedStudentProfile.softSkills.join(
                            ", "
                          )}
                      </Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={100}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        Tech Skills:
                      </Table.TextCell>
                      <Table.TextCell>
                        {this.state.selectedStudentProfile &&
                          this.state.selectedStudentProfile.techinalSkills.join(
                            ", "
                          )}
                      </Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={100}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        Calender:
                      </Table.TextCell>
                      <Table.TextCell>
                        {this.state.selectedStudentProfile && (
                          <a
                            target="_blank"
                            href="https://tinyurl.com/CYF-LDN5CALENDAR"
                          >
                            CYF London-5 Class Calender
                          </a>
                        )}
                      </Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.TextCell
                        flexBasis={100}
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

              <Pane>
                <Heading marginLeft={20} marginBottom={10}>
                  <strong> Current Comment:</strong>
                </Heading>
                <Pane
                  elevation={3}
                  marginLeft={20}
                  marginBottom={10}
                  height={100}
                  padding={10}
                  width={400}
                  background="tint2"
                  borderRadius={3}
                  display="flex"
                  flexDirection="column"
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

                <Heading marginBottom={10} marginLeft={20} marginTop={20}>
                  {" "}
                  <strong>
                    Previous Comments about{" "}
                    {this.state.selectedStudentProfile.name}:
                  </strong>
                </Heading>
                <Pane
                  style={scrolling}
                  width="auto"
                  height={400}
                  marginLeft={20}
                  marginTop={10}
                >
                  <Pane>
                    {this.state.selectedStudentProfile !== null
                      ? this.state.selectedStudentProfile.floatingMentorcomments.map(
                          s => {
                            if (
                              s.floatingMentorName ===
                              selectedFloatingMentorName
                            )
                              return (
                                <Pane
                                  elevation={3}
                                  marginLeft={2}
                                  marginBottom={12}
                                  height="auto"
                                  padding={5}
                                  width={400}
                                  background="tint2"
                                  display="flex"
                                  flexDirection="column"
                                  borderRadius={3}
                                >
                                  <Paragraph marginTop="default">
                                    {s.comment}
                                  </Paragraph>
                                  <Text padding={8} alignSelf="flex-end">
                                    <Strong>Feedback by </Strong>
                                    {s.floatingMentorName} on{" "}
                                    {moment(s.date).format("Do MMMM  YYYY")}{" "}
                                    <br />
                                    <Text padding={8}>
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
              </Pane>
              <Pane
                width="auto"
                height="75%"
                marginLeft={20}
                padding={10}
                display="flex"
                justifyContent="space-around"
                borderRadius={3}
                elevation={2}
                background="tint1"
              >
                <Pane
                  display="flex"
                  height={350}
                  flexDirection="column"
                  marginLeft={10}
                  justifyContent="space-between"
                >
                  <Heading marginLeft={10} marginBottom={10}>
                    <strong> Leave Feedback:</strong>
                  </Heading>
                  <Combobox
                    items={this.state.techSkills.map(s => s.module)}
                    height={34}
                    onChange={selected => this.handleModuleSelection(selected)}
                    placeholder="Select Module"
                    autocompleteProps={{
                      title: "Select Module"
                    }}
                  />
                  <Heading color="#FF0000"> {this.state.errormessage}</Heading>
                  <Textarea
                    height={200}
                    width={400}
                    placeholder="Irregular Mentor's Comments..."
                    onChange={e =>
                      this.setState({
                        commentSubmitted: e.target.value
                      })
                    }
                  />

                  <Button
                    height={40}
                    width={80}
                    marginBottom={-20}
                    appearance="primary"
                    alignSelf="flex-end"
                    onClick={this.handyComments}
                  >
                    Submit
                  </Button>
                </Pane>
              </Pane>
            </Pane>
          )}
        </Pane>
      </div>
    );
  }
}
export default FloatingMentor;
