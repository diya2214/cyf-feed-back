import React, { Component } from "react";
import { majorScale, Button, Pane, TextInputField, FilePicker, Combobox } from 'evergreen-ui';
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

//        handleSubmit = () => {
//   // e.preventDefault();
//          const { name, photo, allTechSkills,allSoftSkills } = this.state
//          const res = fetch("/student", {
//          method: 'POST',
//          headers:{
//          Accept: "application/json",
//          "Content-Type":"application/json"
//   },
//         body:JSON.stringify({
//         name: name,
//         photo: photo,
//         allSoftSkills: allSoftSkills,
//         allTechSkills: allTechSkills
//   })
// })
//        }


  render() {

    return (

      <div>
        <h3>STUDENT PROFILE</h3>
        <Pane
         // key={index}
         elevation={4}
         width={800}
         padding={16}
         borderRadius={3}
         border="default"
         background="blueTint"
       >
          <TextInputField
            height={48}
            width="95%"
            label="Full Name"
            placeholder="Full Name"
            onChange={(e) => this.handleFullName(e)}
          />

          <Pane>
            <h5>Upload your photo here:</h5>
            <FilePicker
              multiple
              width="95%"
              marginBottom={32}
              label="Upload photo"
              onChange={files => this.handleFile(files)}
            />

            <Pane>
              <h5>Select the Technical skills you're working on:</h5>
              <div className = "addSkills">
              <Combobox
                width="95%"
                items={['Arrays', 'Functions', 'Array Methods', 'Objects', 'None']}
                onChange={selected => this.handleTech(selected)}
                placeholder="Tech Skills"
                label="Tech Skills"
                autocompleteProps={{
                  // Used for the title in the autocomplete.
                  title: 'None'
                }}
              />
              <Button onClick={this.handleClickTech} appearance="primary">Add</Button>
              </div>
              
              <Pane>
                <h5>Select the Soft skills you're working on:</h5>
                <div className = "addSkills">
                <Combobox
                  width="95%"
                  items={['Participating in my class', 'Supporting my class', 'Solving problems 1', 'Solving problems 2', 'None']}
                  onChange={selected => this.handleSoft(selected)}
                  placeholder="Soft Skills"
                  label="Soft Skills"
                  autocompleteProps={{
                    // Used for the title in the autocomplete.
                    title: 'None'
                  }}
                />
                <Button  
                // onClick={this.handleClickSoft} 
                appearance="primary">Add</Button>
                </div>
               </Pane>
            </Pane>
          </Pane>
          <Button 
          // type="submit" 
          // onSubmit={handleSubmit} 
          appearance="primary" height={majorScale(5)} 
          marginTop={16}> SUBMIT PROFILE</Button>
        </Pane>
      </div>
    );
  }
}
// export default StudentPage;