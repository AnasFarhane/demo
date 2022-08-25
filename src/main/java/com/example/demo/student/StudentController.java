package com.example.demo.student;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {


    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/getStudents")
    public List<Student> getAllStudents(){
        return studentService.findAllStudents();
    }

    @PostMapping("/saveStudent")
    public void addStudent(@RequestBody @Valid Student student) throws IllegalAccessException {
        studentService.addStudent(student);
    }

    @DeleteMapping("/deleteStudent/{studentId}")
    public void deleteStudent(@PathVariable Long studentId) throws IllegalAccessException {
        studentService.deleteStudent(studentId);
    }

}
