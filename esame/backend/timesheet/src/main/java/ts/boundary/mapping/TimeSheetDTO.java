package ts.boundary.mapping;

import java.time.LocalDateTime;
import java.util.Map;
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

    // Mappa per le ore per giorno
   // public Map<String, Integer> hoursPerDay;  // Cambia LocalDate in String

    @Override
    public String toString() {
        return "TimeSheetDTO{" + 
               "id=" + id + 
               ", activityid=" + activityid + 
               ", userid=" + userid + 
               ", dtstart=" + dtstart + 
               ", dtend=" + dtend + 
               ", detail='" + detail + '\'' + 
               //", hoursPerDay=" + hoursPerDay + 
               '}';
    }
}

