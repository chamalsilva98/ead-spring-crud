package com.ead.springcrud.repositories;

import java.util.List;

import com.ead.springcrud.models.CustomerAccount;

import org.springframework.data.repository.CrudRepository;

public interface CustomerAccountRepository extends CrudRepository<CustomerAccount, Integer> {

    List<CustomerAccount> findByCustomerId(Integer customerId);

}
