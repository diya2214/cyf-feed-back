import swal from "sweetalert";
import MainMentor from "./MainMentor";
import axios from "axios";



export const getStudents = () => {
  return axios
    .get(`/api/students`)
    .then(response => {
     return response.data
    })
    .catch(function (error) {
      swal("Error", "Could not fetch student data ", "error");
      return [];
    });
};

export const getSkills = () => {
  return axios
    .get(`/api/skills/tech`)
    .then(response => {
     return response.data
    })
    .catch(function (error) {
      swal("Error", "Could not fetch student data ", "error");
      return [];
    });
};

export const getSoftSkills = () => {
  return axios
    .get(`/api/skills/soft`)
    .then(response => {
     return response.data
    })
    .catch(function (error) {
      swal("Error", "Could not fetch student data ", "error");
      return [];
    });
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