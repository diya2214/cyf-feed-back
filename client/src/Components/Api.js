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