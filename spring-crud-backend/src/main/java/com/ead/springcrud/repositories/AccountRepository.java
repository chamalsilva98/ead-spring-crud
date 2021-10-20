package com.ead.springcrud.repositories;

import com.ead.springcrud.models.Account;

import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Integer> {
}
