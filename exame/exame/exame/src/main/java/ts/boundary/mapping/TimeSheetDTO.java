/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.boundary.mapping;

import java.time.LocalDateTime;
import javax.json.bind.annotation.JsonbDateFormat;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


public class TimeSheetDTO {
    
    public Long id;
    
    @NotNull
    public Long activityid;

    @NotNull
    public Long userid;
    
    @NotNull
    @JsonbDateFormat("dd/MM/yyyy HH:mm:ss")
    public LocalDateTime dtstart;
    
    @NotNull
    @JsonbDateFormat("dd/MM/yyyy HH:mm:ss")
    public LocalDateTime dtend;

    @NotBlank
    public String detail;

    @Override
    public String toString() {
        return "TimeSheetDTO{" + "activityid=" + activityid + ", userid=" + userid + ", dtstart=" + dtstart + ", dtend=" + dtend + ", detail=" + detail + '}';
    }
       
}
