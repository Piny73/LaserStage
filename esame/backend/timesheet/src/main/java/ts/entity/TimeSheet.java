/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.entity;

import java.time.LocalDateTime;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.bind.annotation.JsonbDateFormat; // Importa JsonbDateFormat
import javax.json.bind.annotation.JsonbTypeAdapter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import ts.entity.adapter.ActivityTypeAdapter;
import ts.entity.adapter.LocalDateTimeAdapter;
import ts.entity.adapter.UserTypeAdapter;

@Entity
@Table(name = "timesheet")
public class TimeSheet extends BaseEntity {
    
    @JsonbTypeAdapter(ActivityTypeAdapter.class)
    @ManyToOne(optional = false)
    @JoinColumn(name = "activity_id")
    private Activity activity;

    @JsonbTypeAdapter(UserTypeAdapter.class)
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;
    
    @NotNull
    @Column(nullable = false)
    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    private LocalDateTime dtstart;
    
    @NotNull
    @Column(nullable = false)
    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    private LocalDateTime dtend;

    @NotBlank
    @Column(nullable = false)    
    private String detail;

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
    // Aggiungo il metodo toJsonSlice() per serializzare l'oggetto in JSON
    @Override
       public JsonObject toJsonSlice() {
        return Json.createObjectBuilder()
                .add("id", this.getId())  // Assumendo che BaseEntity abbia un metodo getId()
                .add("activityId", this.activity.getId())  // Assicurati che Activity abbia un metodo getId()
                .add("userId", this.user.getId())  // Assicurati che User abbia un metodo getId()
                .add("dtstart", this.dtstart.toString())  // Converte LocalDateTime in String
                .add("dtend", this.dtend.toString())  // Converte LocalDateTime in String
                .add("detail", this.detail)
                .build();
    }
}

