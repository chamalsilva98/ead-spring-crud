package com.ead.springcrud.repositories;

import com.ead.springcrud.models.Customer;

import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {

}
