package com.ead.springcrud.controllers;

import java.util.Optional;

import com.ead.springcrud.models.Customer;
import com.ead.springcrud.repositories.CustomerAccountRepository;
import com.ead.springcrud.repositories.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/customer")
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerAccountRepository customerAccountRepository;

    @PostMapping(path = "/add")
    public Integer addCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer).getId();
    }

    @GetMapping(path = "/all")
    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping(path = "/get/{id}")
    public Optional<Customer> getCustomer(@PathVariable Integer id) {
        return customerRepository.findById(id);
    }

}
