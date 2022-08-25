package com.example.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> findAllStudents(){
        return studentRepository.findAll();
    }

    public void addStudent(Student student) throws IllegalAccessException {
        if(this.checkIfEmailExists(student.getEmail())) throw new IllegalAccessException("Email Already Exists");
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) throws IllegalAccessException {
        if(studentRepository.findById(studentId).isEmpty()) throw new IllegalAccessException("Student Doesn't Exist");
        studentRepository.deleteById(studentId);
    }

    public boolean checkIfEmailExists(String email) {
        return studentRepository.findByEmail(email).size() !=0;
    }
}