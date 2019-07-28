import React, { Component } from "react";
import { majorScale, Button, Heading, Pane, TextInputField, FilePicker, Combobox } from 'evergreen-ui';
// import { Link } from 'react-router-dom';
import "../App.css";

// export default testPage = () => <div>hi</div>
export default class StudentPage extends Component {

  state = {
    name: null,
    photo: null,
    techSkill: null,
    softSkill: null,
    allTechSkills: [],
    allSoftSkills: []
  }

  handleFullName = (e) => {
    let value = e.target.value;
    this.setState({ name: value })
  }

  handleFile = (file) => {
    this.setState({
    photo: file[0].name
    })

  }

  handleTech = (selected) => {
    if (selected !== "None"){
      this.setState({
        techSkill: selected
       })
    }
   }

   handleSoft = (selected) =>{
    if (selected !== "None"){
    this.setState({
      softSkill: selected
     })
    }
   }

   handleClickTech = () => {
     const { allTechSkills, techSkill} = this.state
     if (techSkill !== "None"){
      allTechSkills.push(techSkill)
      this.setState({
        allTechSkills: allTechSkills
      })
     }else{
      return
     }
   }

   handleClickSoft = () => {
    const { allSoftSkills, softSkill} = this.state
     if (softSkill !== "None"){
      allSoftSkills.push(softSkill)
       this.setState({
        allSoftSkills: allSoftSkills
   })
    } else {
      return
    }
    }

    handleSubmit = async (e) => {
     e.preventDefault();
      const { name, photo, allTechSkills, allSoftSkills } = this.state;
       console.log(allSoftSkills)  
         await fetch("/api/student", {
         method: 'POST',
         headers:{
         Accept: "application/json",
         "Content-Type":"application/json"
  },
         body:JSON.stringify({
         name: name,
         photo: photo,
         allSoftSkills: allSoftSkills,
         allTechSkills: allTechSkills
  })
}).then(response => {
    response.json().then(data => {
      console.log("Successful" + data);
  });
  })
  }

  render() {
    return (
      <div>
        <div className = "stu-profile">
        <h2>STUDENT PROFILE</h2>
        </div>
      <Pane
         // key={index}
         marginLeft={60}
         elevation={4}
         width="75%"
         padding={16}
         borderRadius={3}
         border="default"
         background="blueTint"
       >
       <Heading size={500}>Full Name</Heading>
        <TextInputField
       inputHeight={40}
         marginBottom={32}
        
         width="75%"size={500}
        label=""
         placeholder="Full Name"
         onChange={(e) => this.handleFullName(e)}
          />
      <Pane>
        <Heading size={500}>Upload your photo here:</Heading>
        {/* <h5>Upload your photo here:</h5> */}
        <FilePicker
          multiple
          width="75%"
          height={40}
          marginBottom={32}
          label="Upload photo"
          onChange={files => this.handleFile(files)}/>
           
       <Pane>
         <Heading size={500}>Select the Technical Skills you're working on</Heading>
                   {/* <h5>Select the Technical skills you're  working on:</h5> */}
              <div className = "addSkills">
              <Combobox
                width="95%"
                height={40}
                items={['Arrays', 'Functions', 'Array Methods', 'Objects', 'None']}
                onChange={selected => this.handleTech(selected)}
                placeholder="Tech Skills"
                label="Tech Skills"
                autocompleteProps={{
                  // Used for the title in the autocomplete.
                  title: 'None'
                }}
              />
              <Button height={40} onClick={this.handleClickTech} appearance="primary">Add</Button>
              </div>
              <Pane>
              <p>{this.state.allTechSkills.toString()}</p>
              
              
              <Heading size={500}>Select the Soft Skills you're working on</Heading>
              
                {/* <h5>Select the Soft skills you're working on:</h5> */}
                <div className = "addSkills">
                <Combobox
                  width="95%"
                  height={40}
                  items={['Participating in my class', 'Supporting my class', 'Solving problems 1', 'Solving problems 2', 'None']}
                  onChange={selected => this.handleSoft(selected)}
                  placeholder="Soft Skills"
                  label="Soft Skills"
                  autocompleteProps={{
                    // Used for the title in the autocomplete.
                    title: 'None'
                  }}
                />
                <Button height={40} 
                onClick={this.handleClickSoft} 
                appearance="primary">Add</Button>
                </div>
                <Pane><p>{this.state.allSoftSkills.toString()}</p></Pane>
               </Pane>
            </Pane>
          </Pane>
          <Button 
          type="submit" 
          onClick={this.handleSubmit} 
          appearance="primary" height={majorScale(5)} 
          marginTop={16}> SUBMIT PROFILE</Button>
        </Pane>
      </div>
    );
  }
}
// export default StudentPage;