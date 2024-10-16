/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package bs.entity;

import bs.entity.adapter.AreaTypeAdapter;
import bs.entity.adapter.CompanyTypeAdapter;
import bs.entity.adapter.EmployeeTypeAdapter;
import bs.entity.adapter.UserTypeAdapter;
import bs.entity.constant.BaseEntity;
import java.time.LocalDate;
import javax.json.bind.annotation.JsonbDateFormat;
import javax.json.bind.annotation.JsonbTypeAdapter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 *
 * @author andrelima
 */
@Entity
@Table(name = "employee")
public class Employee extends  BaseEntity {
    
    @JsonbTypeAdapter(CompanyTypeAdapter.class)
    @ManyToOne(optional = false)
    @JoinColumn(name = "company_id")
    private Company company;
    
    @NotBlank
    @Column(nullable = true)
    private String name;
    
    @NotBlank
    @Column(name = "employeerole", nullable = false)
    private String employeeRole;
    
    @JsonbTypeAdapter(AreaTypeAdapter.class)
    @ManyToOne(optional = true)
    @JoinColumn(name = "area_id")
    private Area area;
    
    @NotNull
    @Column(nullable = false)
    private Integer quantity;
    
    @NotNull
    @Column(nullable = false)
    private Double salary;
    
    @NotNull
    @JsonbDateFormat("dd/MM/yyyy")
    @Column(name = "startedat", nullable = false)
    private LocalDate startedAt;
    
    @JsonbDateFormat("dd/MM/yyyy")
    @Column(name = "endedat")
    private LocalDate endedAt;
    
    @JsonbTypeAdapter(UserTypeAdapter.class)
    @ManyToOne(optional = true)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonbTypeAdapter(EmployeeTypeAdapter.class)
    @ManyToOne(optional = true)
    @JoinColumn(name = "manager_id")
    private Employee manager;

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmployeeRole() {
        return employeeRole;
    }

    public void setEmployeeRole(String employeeRole) {
        this.employeeRole = employeeRole;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public LocalDate getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDate startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDate getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDate endedAt) {
        this.endedAt = endedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }

    
    
    
}
