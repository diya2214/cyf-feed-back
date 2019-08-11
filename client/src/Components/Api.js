import swal from "sweetalert";
import MainMentor from "./MainMentor";
import axios from "axios";


export const getStudents = async() => {
  try{ 
    const students = await axios.get(`/api/students`)
     return students.data
  }
  catch(error) {
      swal("Error", "Could not fetch student data ", "error");
      return [];
    }
};

export const getSkills = async() => {
  try{
    const skills = await axios.get(`/api/skills/tech`)
     return skills.data
    }
    catch (error) {
      swal("Error", "Could not fetch student data ", "error");
      return [];
    }
};

export const getSoftSkills = async() => {
  try{
      const softSkills = await axios.get(`/api/skills/soft`)
     return softSkills.data
  }
    catch(error) {
      swal("Error", "Could not fetch soft skills ", "error");
      return [];
    }
};



export const insertComments = async (student,commentData) => {
  try {
    const result = await axios.put(`/api/evaluation/${student}`,  
    { commentData }
    )
    return result
  } catch (error) {
    swal("Error", "Could not add your comments", "error");
  }

}

export const handleMentor = () => {
  try {
    <div>
    <MainMentor />
    </div>
      }
     catch (error) {
    swal("Error", "Could not get main mentors", "error");
  }
}