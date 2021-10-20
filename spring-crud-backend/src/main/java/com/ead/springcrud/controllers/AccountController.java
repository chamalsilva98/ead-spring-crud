package com.ead.springcrud.controllers;

import com.ead.springcrud.models.Account;
import com.ead.springcrud.repositories.AccountRepository;

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
@RequestMapping(path = "/account")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping(path = "/add")
    public Integer addAccount(@RequestBody Account account) {
        return accountRepository.save(account).getId();
    }

    @GetMapping(path = "/all")
    public Iterable<Account> getAllAccount() {
        return accountRepository.findAll();
    }

    @PutMapping(path = "/update")
    public Integer updateAccount(@RequestBody Account account) {
        return accountRepository.save(account).getId();
    }

    @DeleteMapping(path = "/delete/{id}")
    public String deleteAccount(@PathVariable Integer id) {
        accountRepository.deleteById(id);
        return "deleted";
    }
}
