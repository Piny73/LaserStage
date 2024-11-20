package ts.boundary.mapping;

import ts.entity.adapter.LocalDateTimeAdapter;
import java.time.LocalDateTime;
import javax.json.bind.annotation.JsonbTypeAdapter;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
    public Long ownerid;

    public boolean enable;

    // Aggiunto il campo ownerName per restituire il nome del proprietario
    public String ownerName;

    @Override
    public String toString() {
        return "ActivityDTO{" + "id=" + id + ", description=" + description + ", dtstart=" + dtstart + ", dtend=" + dtend + ", ownerid=" + ownerid + ", enable=" + enable + ", ownerName=" + ownerName + '}';
    }
}