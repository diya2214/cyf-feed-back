import React, { Component } from "react";
import { majorScale, Button, Heading, Pane, TextInputField, FilePicker, Combobox } from 'evergreen-ui';
// import { Link } from 'react-router-dom';
import "../App.css";
import {getSkills, getSoftSkills} from "./Api.js"

// export default testPage = () => <div>hi</div>
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
                   // console.log(this.state.getTechSkills)
                   // console.log(this.state.getSoftSkills)
                 };

                 handleFullName = e => {
                   let value = e.target.value;
                   this.setState({ name: value });
                 };

                 handleFile = file => {
                   this.setState({
                     studentPhoto: file[0].name
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
                   const profilemessage =
                     "Your Profile has been submitted!";
                   this.setState({
                     submitMessage: profilemessage
                   });
                   console.log(this.state.submitMessage);
                 };

                 handleClickTech = () => {
                   const {
                     techinalSkills,
                     oneTechSkill
                   } = this.state;
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
                   const {
                     softSkills,
                     oneSoftSkill
                   } = this.state;
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
                   console.log("form cleared");
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
                   //  console.log(softSkills)
                   //  console.log(techinalSkills)
                   //  console.log(name)
                   await fetch("/api/student", {
                     method: "POST",
                     headers: {
                       Accept: "application/json",
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify({
                       name: name,
                       studentPhoto: studentPhoto,
                       class: studentClass,
                       softSkills: softSkills,
                       techinalSkills: techinalSkills,
                       floatingMentorcomments: [],
                       leadMentorcomments: []
                     })
                   }).then(response => {
                     response.json().then(response => {
                       console.log("Successful" + response);
                     });
                   });
                 };

                 render() {
                   return (
                     <div>
                       <div className="stu-profile">
                         <h2>STUDENT PROFILE</h2>
                       </div>
                       <Pane
                         // key={index}
                         marginLeft={157}
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
                           width="75%"
                           size={500}
                           label=""
                           placeholder="Full Name"
                           onChange={e => this.handleFullName(e)}
                         />

                         <Pane>
                           <Heading size={500}>
                             Upload your photo here:
                           </Heading>
                           {/* <h5>Upload your photo here:</h5> */}
                           <FilePicker
                             multiple
                             width="75%"
                             height={40}
                             marginBottom={32}
                             label="Upload photo"
                             onChange={files =>
                               this.handleFile(files)
                             }
                           />

                           <Pane>
                             <Heading size={500}>
                               Select the Technical Skills you're
                               working on
                             </Heading>
                             {/* <h5>Select the Technical skills you're  working on:</h5> */}
                             <div className="addSkills">
                               <Combobox
                                 width="95%"
                                 height={40}
                                 items={this.state.getTechSkills.map(
                                   skills => skills.module
                                 )}
                                 // items={['Arrays', 'Functions', 'Array Methods', 'Objects', 'None']}
                                 onChange={selected =>
                                   this.handleTech(selected)
                                 }
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
                               <p>
                                 {this.state.techinalSkills.toString()}
                               </p>

                               <Heading size={500}>
                                 Select the Soft Skills you're
                                 working on
                               </Heading>

                               {/* <h5>Select the Soft skills you're working on:</h5> */}
                               <div className="addSkills">
                                 <Combobox
                                   width="95%"
                                   height={40}
                                   items={this.state.inputSoftSkills.map(
                                     skills => skills.module
                                   )}
                                   // items={['Participating in my class', 'Supporting my class', 'Solving problems 1', 'Solving problems 2', 'None']}
                                   onChange={selected =>
                                     this.handleSoft(selected)
                                   }
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
                                 <p>
                                   {this.state.softSkills.toString()}
                                 </p>
                               </Pane>
                               <Pane>
                                 <Heading size={500}>
                                   Select your class
                                 </Heading>
                                 <Combobox
                                   width="55%"
                                   height={40}
                                   items={[
                                     "London Class 5",
                                     "Scotland Class 2",
                                     "Manchester Class 2"
                                   ]}
                                   onChange={selected =>
                                     this.handleClass(selected)
                                   }
                                   placeholder="Student's Class"
                                   label="class"
                                   autocompleteProps={{
                                     // Used for the title in the autocomplete.
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
// export default StudentPage;