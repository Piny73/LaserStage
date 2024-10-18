package ts.boundary.mapping;


import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.json.bind.annotation.JsonbDateFormat;
import javax.json.bind.annotation.JsonbTypeAdapter;
import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import ts.entity.adapter.LocalDateTimeAdapter;

public class ActivityDTO {

    public Long id;

    @NotBlank
    public String description;

    @NotNull
    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    public LocalDateTime dtstart;

    @NotNull
    @JsonbTypeAdapter(LocalDateTimeAdapter.class)
    public LocalDateTime dtend;
    
        
    @NotNull
    @JsonbDateFormat("dd/MM/yyyy")
    @Column(name = "startedat", nullable = false)
    private LocalDate startedAt;
    
    @JsonbDateFormat("dd/MM/yyyy")
    @Column(name = "endedat")
    private LocalDate endedAt;

    @NotNull
    public Long ownerid;

    public boolean enable;

    @Override
    public String toString() {
        return "ActivityDTO{" + "id=" + id + ", description=" + description + ", dtstart=" + dtstart + ", dtend=" + dtend + ", ownerid=" + ownerid + ", enable=" + enable + '}';
    }
}