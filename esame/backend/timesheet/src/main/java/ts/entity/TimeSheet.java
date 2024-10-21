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
import ts.entity.adapter.LocalDateTimeAdapter;
import ts.entity.adapter.TimeSheetAdapter;

@Entity
@Table(name = "timesheet")
public class TimeSheet extends BaseEntity {

    
    @ManyToOne(optional = false)
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    @NotNull
    @Column(nullable = false)
    private LocalDateTime dtstart;

    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    @NotNull
    @Column(nullable = false)
    private LocalDateTime dtend;

    @NotBlank
    @Column(nullable = false)
    private String detail;

    @Column(nullable = false)
    private boolean enable;

    // Rimozione dell'ElementCollection per gestire la mappa delle ore per giorno
    // private Map<String, Integer> hoursPerDay = new HashMap<>();

    // Getters e Setters

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    // Rimuovere i metodi get/set per hoursPerDay
    // public Map<String, Integer> getHoursPerDay() {
    //     return hoursPerDay;
    // }

    // public void setHoursPerDay(Map<String, Integer> hoursPerDay) {
    //     this.hoursPerDay = hoursPerDay;
    // }

}
