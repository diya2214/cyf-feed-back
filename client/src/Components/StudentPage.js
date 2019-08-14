import React, { Component } from "react";
import {
  majorScale,
  Button,
  Heading,
  Pane,
  TextInputField,
  Combobox
} from "evergreen-ui";
import "../App.css";
import { getSkills, getSoftSkills } from "./Api.js";
import swal from "sweetalert";
import axios from "axios";

export default class StudentPage extends Component {
  state = {
    name: null,
    studentPhoto: null,
    studentClass: null,
    oneTechSkill: null,
    oneSoftSkill: null,
    softSkills: [],
    techinalSkills: [],
    inputSoftSkills: [],
    getTechSkills: [],
    submitMessage: null
  };

  componentDidMount = async () => {
    const inputSoftSkills = await getSoftSkills();
    const getTechSkills = await getSkills();
    this.setState({
      inputSoftSkills: inputSoftSkills,
      getTechSkills: getTechSkills
    });
  };

  handleFullName = e => {
    let value = e.target.value;
    this.setState({ name: value });
  };

  handleFile = url => {
    let picture = url.target.value;
    this.setState({
      studentPhoto: picture
    });
  };

  handleTech = selected => {
    if (selected !== "None") {
      this.setState({
        oneTechSkill: selected
      });
    }
  };

  handleSoft = selected => {
    if (selected !== "None") {
      this.setState({
        oneSoftSkill: selected
      });
    }
  };

  handleClass = selected => {
    if (selected !== "None") {
      this.setState({
        studentClass: selected
      });
    }
  };

  handleSubmitMessage = e => {
    const profilemessage = "Your Profile has been submitted!";
    this.setState({
      submitMessage: profilemessage
    });
  };

  handleClickTech = () => {
    const { techinalSkills, oneTechSkill } = this.state;
    if (oneTechSkill !== "None") {
      techinalSkills.push(oneTechSkill);
      this.setState({
        techinalSkills: techinalSkills
      });
    } else {
      return;
    }
  };

  handleClickSoft = () => {
    const { softSkills, oneSoftSkill } = this.state;
    if (oneSoftSkill !== "None") {
      softSkills.push(oneSoftSkill);
      this.setState({
        softSkills: softSkills
      });
    } else {
      return;
    }
  };

  handleClearForm = e => {
    this.setState({
      name: null,
      studentPhoto: null,
      oneTechSkill: null,
      oneSoftSkill: null,
      softSkills: [],
      techinalSkills: []
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const {
      name,
      studentPhoto,
      techinalSkills,
      softSkills,
      studentClass
    } = this.state;

    try {
      const result = await axios.post("/api/student", {
        name: name,
        studentPhoto: studentPhoto,
        class: studentClass,
        softSkills: softSkills,
        techinalSkills: techinalSkills,
        floatingMentorcomments: [],
        leadMentorcomments: []
      });
      return result;
    } catch (error) {
      swal("Error", "Could not submit", "error");
    }
  };

  render() {
    return (
      <div>
        <div className="stu-profile">
          <h2>STUDENT PROFILE</h2>
        </div>
        <Pane
          marginLeft={195}
          elevation={4}
          width="75%"
          padding={16}
          borderRadius={3}
          border="default"
          background="tint1"
        >
          <Heading size={500}>Full Name</Heading>
          <TextInputField
            inputHeight={40}
            marginBottom={32}
            width="75%"
            size={500}
            label=""
            placeholder="Full Name"
            onChange={e => this.handleFullName(e)}
          />

          <Pane>
            <Heading size={500}>Copy/Paste your photo's url here:</Heading>
            <TextInputField
              inputHeight={40}
              marginBottom={32}
              width="75%"
              size={500}
              placeholder="Photo's url"
              onChange={files => this.handleFile(files)}
            />

            <Pane>
              <Heading size={500}>
                Select the Technical Skills you're working on
              </Heading>
              <div className="addSkills">
                <Combobox
                  width="95%"
                  height={40}
                  items={this.state.getTechSkills.map(
                    skills => skills.module
                  )}
                  onChange={selected => this.handleTech(selected)}
                  placeholder="Tech Skills"
                  label="Tech Skills"
                  autocompleteProps={{
                    // Used for the title in the autocomplete.
                    title: "None"
                  }}
                />
                <Button
                  height={40}
                  onClick={this.handleClickTech}
                  appearance="primary"
                >
                  Add
                </Button>
              </div>
              <Pane>
                <p>{this.state.techinalSkills.toString()}</p>

                <Heading size={500}>
                  Select the Soft Skills you're working on
                </Heading>

                <div className="addSkills">
                  <Combobox
                    width="95%"
                    height={40}
                    items={this.state.inputSoftSkills.map(
                      skills => skills.module
                    )}
                    onChange={selected => this.handleSoft(selected)}
                    placeholder="Soft Skills"
                    label="Soft Skills"
                    autocompleteProps={{
                      // Used for the title in the autocomplete.
                      title: "None"
                    }}
                  />
                  <Button
                    height={40}
                    onClick={this.handleClickSoft}
                    appearance="primary"
                  >
                    Add
                  </Button>
                </div>
                <Pane>
                  <p>{this.state.softSkills.toString()}</p>
                </Pane>
                <Pane>
                  <Heading size={500}>Select your class</Heading>
                  <Combobox
                    width="55%"
                    height={40}
                    items={[
                      "London Class 5",
                      "Scotland Class 2",
                      "Manchester Class 2"
                    ]}
                    onChange={selected => this.handleClass(selected)}
                    placeholder="Student's Class"
                    label="class"
                    autocompleteProps={{
                      title: "none"
                    }}
                  />
                </Pane>
              </Pane>
            </Pane>
          </Pane>
          <Button
            type="submit"
            onClick={e => {
              this.handleSubmit(e);
              this.handleSubmitMessage(e);
              this.handleClearForm(e);
            }}
            appearance="primary"
            height={majorScale(5)}
            marginTop={16}
          >
            {" "}
            SUBMIT PROFILE
          </Button>
          <Pane>
            <p>{this.state.submitMessage}</p>
          </Pane>
        </Pane>
      </div>
    );
  }
}
