/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.boundary.mapping;

import java.time.LocalDateTime;
import javax.json.bind.annotation.JsonbTypeAdapter;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import ts.entity.adapter.LocalDateTimeAdapter;


public class TimeSheetDTO {
    
    public Long id;
    
    @NotNull
    public Long activityid;

    @NotNull
    public Long userid;
    
    @NotNull
    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    public LocalDateTime dtstart;

    @NotNull
    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    public LocalDateTime dtend;

    @NotBlank
    public String detail;

    @Override
    public String toString() {
        return "TimeSheetDTO{" + "activityid=" + activityid + ", userid=" + userid + ", dtstart=" + dtstart + ", dtend=" + dtend + ", detail=" + detail + '}';
    }
       
}

