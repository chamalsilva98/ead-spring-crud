package com.ead.springcrud.controllers;

import java.util.List;
import java.util.Optional;

import com.ead.springcrud.models.CustomerAccount;
import com.ead.springcrud.repositories.CustomerAccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/customeraccount")
public class CustomerAccountController {

    @Autowired
    CustomerAccountRepository customerAccountRepository;

    @PostMapping(path = "/add")
    public Integer addCustomerAccount(@RequestBody CustomerAccount customerAccount) {
        return customerAccountRepository.save(customerAccount).getAccountId();
    }

    @GetMapping(path = "/all")
    public Iterable<CustomerAccount> getCustomerAccounts() {
        return customerAccountRepository.findAll();
    }

    @GetMapping(path = "/get/{id}")
    public Optional<CustomerAccount> getCustomerAccount(@PathVariable Integer id) {
        return customerAccountRepository.findById(id);
    }

    @GetMapping(path = "/customerid/{id}")
    public List<CustomerAccount> getByCustomerId(@PathVariable Integer id) {
        return customerAccountRepository.findByCustomerId(id);
    }

    @PutMapping(path = "/update")
    public Integer updateAccount(@RequestBody CustomerAccount customerAccount) {
        CustomerAccount acc = customerAccountRepository.findById(customerAccount.getAccountNumber()).get();
        acc.setBalance(acc.getBalance() + customerAccount.getBalance());
        return customerAccountRepository.save(acc).getAccountNumber();
    }

}
