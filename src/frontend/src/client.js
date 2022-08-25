import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const addNewStudent = async student => {
    await fetch("api/v1/students/saveStudent", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student)
    }).then(checkStatus)
}

export const removeStudent = async studentId => {
    await fetch(`api/v1/students/deleteStudent/${studentId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    }).then(checkStatus)
}

export const getAllStudents = () => fetch( "api/v1/students/getStudents").then(checkStatus);