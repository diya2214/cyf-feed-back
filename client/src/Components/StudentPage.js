import React, { Component } from "react";
import { majorScale, Button, Pane, TextInputField, FilePicker, Combobox } from 'evergreen-ui'; 
import {Link} from 'react-router-dom';
import "../App.css";


export class StudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newStudent:{
          name: null,
          photo: null,
          techSkills:null,
          softSkill: null,
          allTechSkills: [],
          allSoftSkills: []
        }
        }
        this.handleSkill = this.handleSkill.bind(this);
        this.updateSoftSkills = this.updateSoftSkills.bind(this);

      }
      handleSkill = (selected) => {
        this.setState(
          prevState => ({
            newStudent: {
              ...prevState.newStudent,
              softSkill: selected
            }
          }),
         this.updateSoftSkills(this.state.newStudent.softSkill)
          );
        }
        updateSoftSkills = (skill) => {
          let newArray = []
          newArray = newArray.push(skill)
          this.setState(
            prevState => ({
              newStudent: {
                ...prevState.newStudent,
                allSoftSkills:[newArray]
              }
            
            }),
            () => console.log(this.state.newStudent)
          );
          }

render() {
 return (
  <div>
  
    <h3>STUDENT PROFILE</h3>
    <Pane
          // key={index}
          elevation={4}
          height="auto"
          width="auto"
          padding={20}
          borderRadius={3}
          border="default"
          background="blueTint"
        >
    <Pane>
        <TextInputField
          height={48}
          width="75%"
          label="Full Name"
          placeholder="Full Name"
          />
         </Pane>
    <Pane>
      <h5>Upload your photo here:</h5>
      <FilePicker
        multiple
        width="75%"
        marginBottom={32}
        label="Upload your photo here"
        onChange={files => console.log(files)}/>
        </Pane>

    <Pane>
      <h5>Select the Technical skills you're working on:</h5>
      <div className="addskill">
      <Combobox
       width="75%"
       items={['Arrays', 'Functions', 'Array Methods', 'Objects','None']}
       // onChange={selected => console.log(selected)}
       placeholder="Tech Skills"
       label="Technical skills"
       autocompleteProps={{
       // Used for the title in the autocomplete.
       title: 'None'
        }}
        />
          {/* <Button appearance="primary"height="auto"width="auto">ADD TECH SKILL</Button> */}
          </div>
       </Pane>
    <Pane>
      <h5>Select the Soft skills you're working on:</h5>
      <div className="addskill">
      <Combobox
      width="75%"
      items={['Participating in my class', 'Supporting my class', 'Solving problems 1', 'Solving problems 2', 'None']}
      onChange={selected=>this.handleSkill(selected)}
      placeholder="Soft Skills"
      label="Soft Skills"
      autocompleteProps={{
        // Used for the title in the autocomplete.
      title: 'None'
      }}
      />
      {/* <Button appearance="primary"height="auto"width="auto">ADD SOFT SKILL</Button> */}
      </div> 
    </Pane>

      <Button appearance="primary"marginTop={20}height="auto"width="auto">SUBMIT </Button>
    </Pane>
  </div>
 );
}}
    

export default StudentPage;