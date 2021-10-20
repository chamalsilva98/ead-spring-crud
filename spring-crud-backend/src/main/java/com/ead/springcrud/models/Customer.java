package com.ead.springcrud.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private Date dob;
    private String nic;
    private String phoneNumber;
    private String address;

    // @OneToMany(mappedBy = "employee")
    // private List<CustomerAccount> accounts;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // public List<CustomerAccount> getAccounts() {
    // return accounts;
    // }

    // public void setAccounts(List<CustomerAccount> accounts) {
    // this.accounts = accounts;
    // }

    @Override
    public String toString() {
        return "Customer [address=" + address + ", dob=" + dob + ", firstName=" + firstName + ", id=" + id
                + ", lastName=" + lastName + ", nic=" + nic + ", phoneNumber=" + phoneNumber + "]";
    }

}
