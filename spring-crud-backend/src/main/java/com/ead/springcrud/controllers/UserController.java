package com.ead.springcrud.controllers;

import com.ead.springcrud.models.User;
import com.ead.springcrud.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/add")
    public Integer addUser(@RequestBody User user) {
        return userRepository.save(user).getId();
    }

    @GetMapping(path = "/all")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping(path = "/update")
    public Integer updateUser(@RequestBody User user) {
        return userRepository.save(user).getId();
    }

    @DeleteMapping(path = "/delete/{id}")
    public String deleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
        return "deleted";
    }

    @PostMapping(path = "/authenticate")
    public String authenticate(@RequestBody User user) {
        User u = userRepository.findByUsername(user.getUsername());
        if (u == null)
            return "user not found";
        if (!u.getPassword().equals(user.getPassword()))
            return "invalid password";
        if (u.getStatus().equals("inactive"))
            return "deactivated";
        return u.getPrivilege();
    }

}
