/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.boundary.mapping;

import java.time.LocalDateTime;
import javax.json.bind.annotation.JsonbDateFormat;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


public class ActivityDTO {
    
    public Long id;
    
    @NotBlank
    public String description;
    
    @NotNull
    @JsonbDateFormat("dd/MM/yyyy HH:mm:ss")
    public LocalDateTime dtstart;
    
    @NotNull
    @JsonbDateFormat("dd/MM/yyyy HH:mm:ss")
    public LocalDateTime dtend;
    
    @NotNull
    public Long ownerid;
    
    public boolean enable;

    @Override
    public String toString() {
        return "ActivityDTO{" + "id=" + id + ", description=" + description + ", dtstart=" + dtstart + ", dtend=" + dtend + ", ownerid=" + ownerid + ", enable=" + enable + '}';
    }   
    
}
