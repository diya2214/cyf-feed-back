// import swal from "sweetalert";
import MainMentor from "./MainMentor";
import axios from "axios";



export const getStudent = student => {
  return axios
    .get(`/api/student/${student}`)
    .then(response => {
      console.log(' i am inside fetch ', response.data)
      return response.data
    })
    .catch(function (error) {
      swal("Error", "Could not fetch student data ", "error");
      return [];
    });
};

export const handleMentor = () => {
  try {
    console.log ("this is inside function ")
    <div>
    <MainMentor />
      }
     catch (error) {
    // swal("Error", "Could not get main mentors", "error");
  }
}