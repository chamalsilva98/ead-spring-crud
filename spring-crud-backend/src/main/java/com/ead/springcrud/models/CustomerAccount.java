package com.ead.springcrud.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CustomerAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer accountNumber;
    private Integer customerId;
    private Integer accountId;
    private Integer balance;

    public Integer getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Integer accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "CustomerAccount [accountId=" + accountId + ", accountNumber=" + accountNumber + ", balance=" + balance
                + ", customerId=" + customerId + "]";
    }

}
