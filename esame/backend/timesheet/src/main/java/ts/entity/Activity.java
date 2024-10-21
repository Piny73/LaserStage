/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.entity;

import java.time.LocalDateTime;
import javax.json.bind.annotation.JsonbTypeAdapter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import ts.entity.adapter.UserTypeAdapter;
import ts.entity.adapter.LocalDateTimeAdapter;

@Entity
@Table(name = "activity")
public class Activity  extends  BaseEntity{
    
    @NotBlank
    @Column(nullable = false)
    private String description;
    
    @NotNull
    @Column(nullable = false)
    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    private LocalDateTime dtstart;
    
    @NotNull
    @Column(nullable = false)
    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    private LocalDateTime dtend;
    
    
    @ManyToOne(optional = true)
    @JoinColumn(name = "owner_id")
    private User owner;
    
    private boolean enable;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDtstart() {
        return dtstart;
    }

    public void setDtstart(LocalDateTime dtstart) {
        this.dtstart = dtstart;
    }

    public LocalDateTime getDtend() {
        return dtend;
    }

    public void setDtend(LocalDateTime dtend) {
        this.dtend = dtend;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }
    
    
}
